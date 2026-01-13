// Composants
import AudioRecorder from '../../Shared/components/AudioRecorder.tsx';
import AudioUpload from '../../Shared/components/AudioUpload.tsx';
import { Box, Divider, Chip } from "@mui/material";
import AudioPlayer from '../../Shared/components/AudioPlayer.tsx';
import ResizableSidebar from '../../Shared/components/ResizableSidebar.tsx'
import TextBox from './components/TextBox.tsx';
import SpeakerManager from './components/SpeakerManager.tsx'
import LoadingBarProgress from '../../Shared/components/loadingBarProgress.tsx';
import Exporter from '../../Shared/components/Exporter.tsx'
// Type
import type { Audio } from "../../Shared/types/audio.types.ts";
import type { Speaker } from './types/ui_data.type.ts';
// Hook
import {useAlert} from '../../Shared/contexts/AlertContext.tsx'
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { usePolling } from './hooks/usePolling.tsx';
// Variable d'env
import { MAXSIZEAUDIO } from "./config.ts"; 
import { DiarizationResult } from './types/api_data.types.ts';
// Utilitaires
import { convertApiToUiData } from './utils/DataConverter.tsx';
import { fullText } from './utils/getFullText.tsx';
import WordReplacement from '../TranscriptionBatch/components/WordReplacement.tsx';

export default function DiarizationPage() {
  const { showAlert } = useAlert();
  
  const [nbSpeakers, setNbSpeakers] = useState<number>(1); // Nombre d'interlocuteurs définis par l'utilisateur
  const [knowSpeakers, setKnowSpeakers] = useState<Speaker[]>([]); // Profils des speakers renvoyés par l'API
  const [availableProfiles, setAvailableProfiles] = useState<Speaker[]>([]); // Profils des speakers définis par l'utilisateur

  // États pour les sidebars
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState<boolean>(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState<boolean>(true);

  // Lié à l'audio
  const [audio, setAudio] = useState<Audio | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  // Récupération de la diarization via le hook
  const { diarizationPayload, isLoading, error, statusInfo } = usePolling(audio);
  const [diarizationResult, setDiarizationResult] = useState<DiarizationResult>();

  // Actualise le template de diarization
  const diarizationTemplate = useMemo(() => {
    if (diarizationResult) {
      return convertApiToUiData(diarizationResult, knowSpeakers);
    }
    return { textBubbles: [] };
  }, [diarizationResult, knowSpeakers]);

  // Actualisation du statuts
  useEffect(() => {
    if (error) showAlert(error, "error");
    if (statusInfo) showAlert(statusInfo, "info");
    if (diarizationPayload?.data.status === "COMPLETED"){
      showAlert(`Succès ! Durée : ${diarizationPayload.data.diarization_time}`, "success");
      setDiarizationResult(diarizationPayload.data.result);
    } 
  }, [error, statusInfo, diarizationPayload, showAlert]);

  // Déplace le curseur de lecture audio
  const goToTimestamp = (seconds: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = seconds;
        }
  };

  // 2. La fonction pour changer un speaker
  const handleAssignSpeaker = useCallback((apiSpeakerId: string, selectedProfile: Speaker) => {
    setKnowSpeakers(prev => {
      // On retire l'ancienne définition pour cet ID API s'il y en avait une
      const others = prev.filter(s => s.id !== apiSpeakerId);
      
      // On crée la nouvelle définition :
      // IMPORTANT : On garde l'ID API (spk_0) comme ID, mais on prend le nom/couleur du profil choisi
      const newMapping: Speaker = {
        ...selectedProfile,
        id: apiSpeakerId 
      };
      
      return [...others, newMapping];
    });
  }, []);

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };
  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  // Affectation de l'audio
  const handleAudioSetter = (newAudio: Audio) => {
    setAudio((prevAudio) => {
      // Si on a déjà un audio et que le blob est le même, on ne change rien
      // (Le re-render ne sera pas déclenché)
      if (prevAudio?.filename === newAudio.filename && prevAudio?.blob.size === newAudio.blob.size) {
        showAlert("Vous venez d'envoyer le même audio", "info");
        return prevAudio;
      }
      return {
        blob: newAudio.blob,
        mimeType: newAudio.mimeType,
        filename: newAudio.filename
      };
    });
  };

  // Change un mot et ses occurrence par un autre
  const handleGlobalReplace = (search: string, replace: string) => {
    const regex = new RegExp(search, 'gi');
    setDiarizationResult(prevResult => {
      if (!prevResult) return prevResult;
      const newSegments = prevResult.segments.map(seg => ({
        ...seg,
        text: seg.text.replace(regex, replace)
      }));
      return {
        ...prevResult,
        segments: newSegments
      };
    });
  };
  // Change un segment précis
  const handleManualEdit = (id: number, newText: string) => {
     setDiarizationResult(prevResult => 
       prevResult ? {
         ...prevResult,
         segments: prevResult.segments.map((s, index) => index === id ? { ...s, text: newText } : s)
       } : prevResult
     );
  };


  return (
    <Box sx={{ display: 'flex', width: '100%', height: "100%"}}>
      {/* Boite à outils de gauche */}
        <ResizableSidebar 
        open={isLeftSidebarOpen}
        onToggle={toggleLeftSidebar}
        side="right"
        title="Boite à outils"
        expandedWidth={280} 
        collapsedWidth={50}
        >
        {/* Section 1 : Entrée Audio */}
        {
          isLeftSidebarOpen && 
          <Divider sx={{ my: 2, width: '90%' }}>
            <Chip label="Entrée Audio" size="small" sx={{ fontSize: '0.65rem' }} />
          </Divider>
        }
        <Box sx={{ p: isLeftSidebarOpen ? 1 : 0, width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <AudioRecorder onRecordEnd={handleAudioSetter} />
          <AudioUpload onUploadEnd={handleAudioSetter} MAXSIZEBYTES_VAL={MAXSIZEAUDIO}/>
        </Box>
        {/* Section 2 : Edition du texte */}
        { isLeftSidebarOpen &&      
        <>
          <Box>
            <WordReplacement onReplace={handleGlobalReplace} />
          </Box>
          <Box>
            <Exporter textToExport={fullText(diarizationTemplate)}/>
          </Box>
        </>  
        }

        </ResizableSidebar>

      {/* Main */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Box sx ={{
          width : "100%",
          height : "100%",
          display : 'flex',
          flexDirection :"column",
          alignItems : 'center',
          gap : 2
        }}>
          {/* Texte box où sera afficher les segments de texte récupérés */}
          <TextBox template={diarizationTemplate} 
          onAssignSpeaker={handleAssignSpeaker} 
          availableProfiles={availableProfiles} 
          currentTime={currentTime} 
          gotoTimestamp={goToTimestamp} 
          handleManualEdit={handleManualEdit} />
          { isLoading && <LoadingBarProgress /> }
          <AudioPlayer ref={audioRef} audio = {audio} setCurrentTime={setCurrentTime} />
        </Box>
      </Box>
      {/* Boite à outils de droite */}
      <Box>
        <ResizableSidebar 
        open={isRightSidebarOpen}
        onToggle={toggleRightSidebar}
        side="right"
        title="Outils de l'éditeur"
        expandedWidth={240} 
        collapsedWidth={50}
        >
          <SpeakerManager setNbSpeakers={setNbSpeakers} setSpeakers={setAvailableProfiles} nbSpeakers={nbSpeakers} speakers={availableProfiles}/>
        </ResizableSidebar>
      </Box>
    </Box>
  );
}