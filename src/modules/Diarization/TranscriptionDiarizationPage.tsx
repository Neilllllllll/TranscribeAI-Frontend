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
import type { DiarizationData } from "./types/diarization.types.ts";

export default function DiarizationPage() {
  const [audio, setAudio] = useState<Audio | null>(null);
  const [{ alert, alertType }, setAlert] = useState<AlertState>({ alert: "", alertType: "info" });
  
  // State pour les résultats et paramètres
  const [diarization, setDiarization] = useState<DiarizationData | null>(null);
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

useEffect(() => {
    // En seconde
    const pollInterval = 3000;
    const maxTime = 300000;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchDiarization = async () => {
      if (!audio) return;

      setIsLoading(true);
      try {
        // Create a new transcription job
        const job_uuid = await createJob(audio, signal);
        // Polling for the transcription result
        let diarizationResult: DiarizationData | null = null;
        let attempts = 0;
        const maxAttempts = maxTime/pollInterval;

        while (attempts < maxAttempts && !signal.aborted) {
          diarizationResult = await getDiarizationByUuid(job_uuid, signal);
          if (diarizationResult) {
            break;
          }
          attempts += 1;
          await new Promise((resolve, reject) => {
            const timer = setTimeout(resolve, pollInterval);
            // Si le signal est avorté pendant le dodo, on rejette pour sortir du try/catch
            signal.addEventListener('abort', () => {
              clearTimeout(timer);
              reject(new DOMException('Aborted', 'AbortError'));
            }, { once: true });
          });
        }

        if (!signal.aborted) {
          if (diarizationResult) {
            setDiarization(diarizationResult);
            setAlert({alert: "Diarization réussie!", alertType: "success"});
          } else {
            setAlert({alert: "Délai dépassé", alertType: "error"});
          }
        }
      } catch (error: any) {
          if (error.name === 'AbortError') {
            console.log('aborted');
          } else {
            setAlert({alert: `Erreur: ${error.message}`, alertType: "error"});
          }
      } finally {
        if (!signal.aborted) setIsLoading(false);
      }
    };
    fetchDiarization();
    return () => {
      controller.abort();
    };
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

        {diarization?.segments && (
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
              {diarization.segments.map((segment, index) => (
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