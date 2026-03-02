/* Page de Transcription mono-voix */

import { useEffect, useState, useRef } from "react";

// Composants material UI et composants personnalisés
import Box from '@mui/material/Box';
import ResizableSidebar from '../../Shared/components/ResizableSidebar.tsx'
import TextBox from './components/TextBox.tsx';
import AudioUpload from '../../Shared/components/AudioUpload.tsx';
import AudioPlayer from '../../Shared/components/AudioPlayer.tsx';
import LoadingBarProgress from '../../Shared/components/loadingBarProgress.tsx';
import WordReplacement from './components/WordReplacement.tsx'
import Exporter from '../../Shared/components/Exporter.tsx'
import Chip from '@mui/material/Chip';
import { Divider } from "@mui/material";

// Types
import type { Audio } from "../../Shared/types/audio.types.ts";
import {TranscriptionSegment} from './types/api_data.ts'

// Contexte d'alerte
import {useAlert} from '../../Shared/contexts/AlertContext.tsx'

// Hook pour gérer le processus de pooling et de son état ( on affiche son état dans une barre d'alerte et on affiche la transcription une fois qu'elle est prête)
import { useTranscription } from "./hooks/useTranscription.tsx";

// Variable d'environnement
import { MAXSIZEAUDIO } from "./config.ts"; 

// Utilitaires
import { formatTime } from '../../Shared/utils/formatTime.tsx';
import { fullText } from "./utils/getText.tsx";

export default function TranscriptionBatchPage() {

  const { showAlert } = useAlert();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Lié à l'audio
  const [audio, setAudio] = useState<Audio | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  // Lié à la transcription et à son état
  const { transcriptionPayload, isLoading, error, statusInfo } = useTranscription(audio);
  const [segments, setSegments] = useState<TranscriptionSegment[]>([]);

  // Fonction pour basculer l'état de la sidebar (ouverte/fermée)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Setter pour l'audio qui vérifie si le même audio est renvoyé et affiche une alerte dans ce cas (pour éviter de relancer un processus de transcription inutilement)
  const handleAudioSetter = (newAudio: Audio) => {
    setAudio((prevAudio) => {
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

  // Déplace le curseur de lecture audio à une position donnée (en secondes)
  const handleSeek = (seconds: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = seconds;
        }
  };

  // Récupère la transcription et affiche son état dans la barre d'alerte
  useEffect(() => {
    // Cas d'erreur 
    if (error) showAlert(error, "error");
    // Cas d'information
    if (statusInfo) showAlert(statusInfo, "info");
    // Cas d'échec de la transcription
    if(transcriptionPayload?.status === "FAILED"){
      showAlert(transcriptionPayload.message, "error");
    } 
    // Cas de succès de la transcription
    if (transcriptionPayload?.status === "success" && transcriptionPayload.data.status === "COMPLETED"){
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

  // Supprime tous les segments de la transcription
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
        <Box sx={{ p: isSidebarOpen ? 1 : 0, width: '100%', display: 'flex', flexDirection: 'column' }}>
          <AudioUpload onUploadEnd={handleAudioSetter} MAXSIZEBYTES_VAL={MAXSIZEAUDIO}/>
        </Box>

        {/* Section 2 : Edition du texte */}
        { isSidebarOpen && 
        <>
          <Divider sx={{ my: 2, width: '90%' }}>
            <Chip label="Édition" size="small" sx={{ fontSize: '0.65rem' }} />
          </Divider>

          <Box sx={{ paddingRight: 1, paddingLeft : 1, width: '100%' }}>
            <WordReplacement onReplace={handleGlobalReplace} />
          </Box>
        </>}
        {/* Section 3 : Options d'exportation */}
        { 
          <>
            {isSidebarOpen && 
            <Divider sx={{ my: 2, width: '90%' }}>
              <Chip label="Options d'exportation" size="small" sx={{ fontSize: '0.65rem' }} />
            </Divider>}
            <Box sx={{ width: '100%' }}>
              <Exporter textToExport={fullText(segments ?? [])}/>
            </Box>
          </>
        }
        </ResizableSidebar>
      {/* Main */}
      <Box sx={{ 
        width: "100%",
        height: "100%",
        display: "flex", 
        flexDirection: "column",
        p: 3,
        boxSizing: "border-box" }}>
        <Box sx ={{
          flex: 1,
          display : 'flex',
          flexDirection :"column",
          alignItems : 'center',
          gap : 2,
          minHeight: 0,
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
