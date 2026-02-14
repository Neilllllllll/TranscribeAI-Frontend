/* Main page for audio transcription */
import { useEffect, useState, useRef } from "react";
import Box from '@mui/material/Box';
import ResizableSidebar from '../../Shared/components/ResizableSidebar.tsx'
// Import our components
import TextBox from './components/TextBox.tsx';
import AudioUpload from '../../Shared/components/AudioUpload.tsx';
import AudioPlayer from '../../Shared/components/AudioPlayer.tsx';
import AudioRecorder from '../../Shared/components/AudioRecorder.tsx';
import LoadingBarProgress from '../../Shared/components/loadingBarProgress.tsx';
import {useAlert} from '../../Shared/contexts/AlertContext.tsx'
import type { Audio } from "../../Shared/types/audio.types.ts";
import WordReplacement from './components/WordReplacement.tsx'
import Exporter from '../../Shared/components/Exporter.tsx'
import Chip from '@mui/material/Chip';
// Import API function
import {TranscriptionSegment} from './types/api_data.ts'
import { useTranscription } from "./hooks/useTranscription.tsx";
import { fullText } from "./utils/getText.tsx";
// Import env
import { MAXSIZEAUDIO } from "./config.ts"; 
import { Divider } from "@mui/material";
// Utilitaires
import { formatTime } from '../../Shared/utils/formatTime.tsx';

export default function TranscriptionBatchPage() {
  const { showAlert } = useAlert();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Lié à l'audio
  const [audio, setAudio] = useState<Audio | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const { transcriptionPayload, isLoading, error, statusInfo } = useTranscription(audio); // Hook permettant le polling 
  const [segments, setSegments] = useState<TranscriptionSegment[]>([]); // Segments de texte récupérer par l'API

  // Fonction pour basculer l'état du panneau
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

  // Déplace le curseur de lecture audio
  const handleSeek = (seconds: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = seconds;
        }
  };

  // Actualisation du statuts
  useEffect(() => {
    if (error) showAlert(error, "error");
    if (statusInfo) showAlert(statusInfo, "info");
    if (transcriptionPayload?.data.status === "COMPLETED"){
      showAlert(`La transcription est un succès ! Durée : ${formatTime(transcriptionPayload.data.transcription_time)}`, "success");
      setSegments(transcriptionPayload.data.result.segments); // Actualise les segments reçues 
    } 
  }, [error, statusInfo, transcriptionPayload, showAlert]);

  // Change un mot et ses occurrence par un autre
  const handleGlobalReplace = (search: string, replace: string) => {
    const regex = new RegExp(search, 'gi'); 
    setSegments(prevSegments => 
      prevSegments.map(seg => ({
        ...seg,
        text: seg.text.replace(regex, replace)
      }))
    );
  };

  // Change un segment précis
  const handleManualEdit = (id: number, newText: string) => {
     setSegments(prevSegments => 
       prevSegments.map(s => s.id === id ? { ...s, text: newText } : s)
     );
  };

  const handleDelete = () => {
    setSegments([]);
    showAlert("Transcription supprimée", "success");
  }

  return (
    <Box sx={{ display: 'flex', width: '100%', height: "100%"}}>
      {/* Barre d'outil */}
      <ResizableSidebar 
        open={isSidebarOpen}
        onToggle={toggleSidebar}
        side="left"
        title="Boite à outils"
        expandedWidth={300}
        collapsedWidth={50}
      >
        {/* Section 1 : Entrée Audio */}
        {
          isSidebarOpen && 
          <Divider sx={{ my: 2, width: '90%' }}>
            <Chip label="Entrée Audio" size="small" sx={{ fontSize: '0.65rem' }} />
          </Divider>
        }
        <Box sx={{ p: isSidebarOpen ? 1 : 0, width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <AudioRecorder onRecordEnd={handleAudioSetter} />
          <AudioUpload onUploadEnd={handleAudioSetter} MAXSIZEBYTES_VAL={MAXSIZEAUDIO}/>
        </Box>

        {/* Section 2 : Edition du texte */}
        { isSidebarOpen && 
        <>
          <Divider sx={{ my: 2, width: '90%' }}>
            <Chip label="Édition" size="small" sx={{ fontSize: '0.65rem' }} />
          </Divider>

          <Box sx={{ p: 1, width: '100%' }}>
            <WordReplacement onReplace={handleGlobalReplace} />
          </Box>
          <Box>
            <Exporter textToExport={fullText(segments ?? [])}/>
          </Box>
        </>
        }
        </ResizableSidebar>
      {/* Main */}
      <Box sx={{ 
        width: "100%",
        height: "100%", // Obligatoire pour définir une limite physique
        display: "flex", 
        flexDirection: "column",
        p: 3,
        boxSizing: "border-box" }}>
        <Box sx ={{
          flex: 1, // Prend tout l'espace disponible
          display : 'flex',
          flexDirection :"column",
          alignItems : 'center',
          gap : 2,
          minHeight: 0, // Permet aux enfants de ne pas déborder
          overflow: 'hidden'
        }}>
          {/* Texte box où sera afficher les segments de texte récupérés */}
          <TextBox
          segments={segments} 
          currentTime={currentTime}
          goToTimestamp={handleSeek} 
          onSegmentChange={handleManualEdit}
          onDelete={handleDelete}/>
          { isLoading && <LoadingBarProgress /> }
          <AudioPlayer ref={audioRef} audio = {audio} setCurrentTime={setCurrentTime} />
        </Box>
      </Box>
    </Box>
  );
}
