/* Main page for audio transcription */
import { useEffect, useState } from "react";
// Import additional components from material UI
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import ToolBox from '../Shared/components/ToolBox.tsx'
// Import our components
import TranscriptionDisplay from './components/TranscriptionDisplay.tsx';
import AudioUpload from '../Shared/components/AudioUpload.tsx';
import AudioPlayer from '../Shared/components/AudioPlayer.tsx';
import AudioRecorder from '../Shared/components/AudioRecorder.tsx';
import Exporter from './components/Exporter.tsx';
import LoadingBarProgress from '../Shared/components/loadingBarProgress.tsx';
// Import icons from material UI
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListItemIcon from '@mui/material/ListItemIcon';
// import types
import type { AlertState } from "../Shared/types/alert.types.ts";
import type { Audio } from "../Shared/types/audio.types.ts";
// Import API function
import { createJob } from "./services/postAudio.tsx";
import { getTranscriptionByUuid } from "./services/getTranscritpion.tsx";
// Import env
import { MAXTIMEPROCESSING, TIMEBETTWENEACHPOLLING } from "./config.ts"; 

export default function TranscriptionBatchPage() {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(true);
  const [audio, setAudio] = useState< Audio | null>(null);
  const [{alert, alertType}, setAlert] = useState<AlertState>({alert: "", alertType: "info"});
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to handle audio setting from child components
  const handleAudioSetter = (audio: Audio) => {
    setAudio({
      blob: audio.blob,
      mimeType: audio.mimeType,
      filename: audio.filename
    });
    setTranscription(null);
    setAlert({alert: null, alertType: "error"});
  };

  useEffect(() => {
    // En seconde
    const pollInterval = Number(TIMEBETTWENEACHPOLLING) || 3000;
    const maxTime = Number(MAXTIMEPROCESSING) || 300000;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchTranscription = async () => {
      if (!audio) return;

      setIsLoading(true);
      try {
        // Create a new transcription job
        const job_uuid = await createJob(audio, signal);
        // Polling for the transcription result
        let transcriptionResult: string | null = null;
        let attempts = 0;
        const maxAttempts = maxTime/pollInterval;

        while (attempts < maxAttempts && !signal.aborted) {
          transcriptionResult = await getTranscriptionByUuid(job_uuid, signal);
          if (transcriptionResult) {
            break;
          }
          attempts += 1;
          await new Promise(res => setTimeout(res, pollInterval)); // Wait for 3 seconds before next poll
        }

        if (!signal.aborted) {
          if (transcriptionResult) {
            setTranscription(transcriptionResult);
            setAlert({alert: "Transcription réussie!", alertType: "success"});
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
    fetchTranscription();
    return () => {
      controller.abort();
    };
  }, [audio]);

  return (
    <Box sx={{ display: 'flex'}}>
      <ToolBox>
        <Divider/>
        <List
          subheader={
          <ListSubheader component="div" id="nested-list-subheader">
              {open ? "Dictée à temps réel" : " " }
          </ListSubheader>}
        >
          <AudioRecorder onRecordEnd = {handleAudioSetter} setAlert={setAlert}/>
        </List>

        <Divider/>
        <List>
            <AudioUpload onUploadEnd = {handleAudioSetter} setAlert={setAlert} />
            <ListItem disablePadding>
              <ListItemButton disabled={true}>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary="Planifier" />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider/>
        <List
          subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {open ? "Options d'exportation" : " " }
          </ListSubheader>}
        >
          <Exporter textToExport={transcription ? transcription : null} setAlert={setAlert}/>
        </List>
      </ToolBox>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Box sx ={{
          width : "100%",
          height : "85vh",
          display : 'flex',
          flexDirection :"column",
          alignItems : 'center',
          gap : 2
        }}>
          <TranscriptionDisplay textToDisplay = {transcription ? transcription : null} onTextChange={setTranscription}  setAlert={setAlert}/>
          { alert && <Alert variant="outlined" severity={alertType}>{alert}</Alert> }
          { isLoading && <LoadingBarProgress /> }
          <AudioPlayer audio = {audio}/>
        </Box>
      </Box>
    </Box>
  );
}
