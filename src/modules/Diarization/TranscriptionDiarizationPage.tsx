import { useState, useEffect } from "react";
import Toolbox from "../Shared/components/ToolBox.tsx";
import AudioPlayer from "../Shared/components/AudioPlayer.tsx";
import AudioRecorder from "../Shared/components/AudioRecorder.tsx";
import AudioUpload from "../Shared/components/AudioUpload.tsx";
import LoadingBarProgress from "../Shared/components/loadingBarProgress.tsx";
import SpeakerBubble from './components/SpeakerBubble.tsx';

// UI Material
import { Box, TextField, Typography, Divider, Paper } from "@mui/material";
import ListSubheader from '@mui/material/ListSubheader';
import Alert from '@mui/material/Alert';

// Services & Types
import { createJob } from "./services/postAudio.tsx";
import { getDiarizationByUuid } from "./services/getDiarization.tsx";
import type { Audio } from "../Shared/types/audio.types.ts";
import type { AlertState } from "../Shared/types/alert.types.ts";
import type { DiarizationResponse } from "./types/diarization.types.ts";

export default function DiarizationPage() {
  const [audio, setAudio] = useState<Audio | null>(null);
  const [{ alert, alertType }, setAlert] = useState<AlertState>({ alert: "", alertType: "info" });
  
  // State pour les résultats et paramètres
  const [diarization, setDiarization] = useState<DiarizationResponse | null>(null);
  const [numSpeakers, setNumSpeakers] = useState<number>(2);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queuePos, setQueuePos] = useState<number | null>(null);

  // Fonction appelée par l'upload ou le record
  const handleAudioSetter = (newAudio: Audio) => {
    setAudio({
      blob: newAudio.blob,
      mimeType: newAudio.mimeType,
      filename: newAudio.filename
    });
    // On reset l'affichage précédent
    setDiarization(null);
    setAlert({ alert: null, alertType: "info" });
  };

  // Logique principale de traitement (Polling)
  useEffect(() => {
    const pollInterval = 3000;
    const maxTime = 300000; // 5 minutes timeout

    const fetchDiarization = async () => {
      if (!audio) return;

      setIsLoading(true);
      setAlert({ alert: "Envoi du fichier...", alertType: "info" });

      try {
        // 1. Création du Job avec le nombre de locuteurs
        const job_uuid = await createJob(audio);
        setAlert({ alert: "Traitement en cours... Veuillez patienter.", alertType: "warning" });

        // 2. Polling
        let diarizationResult: DiarizationResponse | null = null;
        let attempts = 0;
        const maxAttempts = maxTime / pollInterval;

        while (attempts < maxAttempts) {
          diarizationResult = await getDiarizationByUuid(job_uuid);

          if (diarizationResult.status === "completed") {
            break;
          } 
          
          if (diarizationResult.status === "failed") {
            throw new Error("Le traitement a échoué côté serveur.");
          }

          attempts += 1;
          await new Promise(res => setTimeout(res, pollInterval));
        }

        // 3. Résultat final
        if (diarizationResult && diarizationResult.status === "completed") {
          setDiarization(diarizationResult);
          setAlert({ alert: "Diarisation terminée avec succès !", alertType: "success" });
        } else {
          setAlert({ alert: "Délai d'attente dépassé.", alertType: "error" });
        }

      } catch (error: any) {
        setAlert({ alert: `Erreur : ${error.message}`, alertType: "error" });
      } finally {
        setIsLoading(false);
        setQueuePos(null);
      }
    };

    fetchDiarization();
  }, [audio]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      
      {/* --- SIDEBAR / TOOLBOX --- */}
      <Toolbox>
        <ListSubheader sx={{ bgcolor: 'transparent', fontWeight: 'bold' }}>Configuration</ListSubheader>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nombre de locuteurs"
            type="number"
            size="small"
            value={numSpeakers}
            onChange={(e) => setNumSpeakers(parseInt(e.target.value) || 2)}
            helperText="Définir avant d'enregistrer"
            disabled={isLoading || !!audio}
          />
          <Divider />
          <AudioRecorder onRecordEnd={handleAudioSetter} setAlert={setAlert} />
          <AudioUpload onUploadEnd={handleAudioSetter} setAlert={setAlert} />
        </Box>
      </Toolbox>

      {/* --- MAIN CONTENT --- */}
      <Box sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          {alert && <Alert variant="outlined" severity={alertType} sx={{ mb: 2 }}>{alert}</Alert>}
          {isLoading && (
            <Box sx={{ width: '100%', mb: 2 }}>
               <LoadingBarProgress />
               <Typography variant="caption" align="center" display="block">
                 Traitement en cours... {queuePos && `Position file : ${queuePos}`}
               </Typography>
            </Box>
          )}
          <AudioPlayer audio={audio} />
        </Box>

        {diarization?.result && (
          <Paper 
            elevation={3} 
            sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              overflow: 'hidden',
              borderRadius: 2
            }}
          >
            {/* Liste scrollable des bulles */}
            <Box sx={{ 
              p: 3, 
              flexGrow: 1, 
              overflowY: 'auto',
              bgcolor: '#fafafa'
            }}>
              {diarization.result.segments.map((segment, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <SpeakerBubble 
                    text={segment.text}
                    speakerName={segment.speaker}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
}