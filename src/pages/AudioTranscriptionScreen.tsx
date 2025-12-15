/* Main page for audio transcription */
import { useEffect, useRef, useState } from "react";
// Import logo
// @ts-ignore: SVG module declaration missing in project types
import logo from '../assets/images/logo-ch-vauclaire.svg';
// Import additional components from material UI
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
// Import styles
import { AppBar, Drawer, DrawerHeader } from '../styles/AudioTranscriptionPage.styles.tsx';
// Import our components
import TranscriptionDisplay from '../components/TranscriptionDisplay.tsx';
import AudioUpload from '../components/AudioUpload.tsx';
import AudioPlayer from '../components/AudioPlayer.tsx';
import AudioRecorder from '../components/AudioRecorder.tsx';
import Exporter from '../components/Exporter.tsx';
import LoadingBarProgress from '../components/loadingBarProgress.tsx';
// Import icons from material UI
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
// import types
import type { AlertState } from "../types/alert.types.ts";
import type { Audio } from "../types/audio.types.ts";
// Import API function
import { createJob, getTranscriptionByUuid } from "../api/batchMode.tsx";

export default function AudioTranscriptionScreen() {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(true);
  const [audio, setAudio] = useState< Audio | null>(null);
  const [{alert, alertType}, setAlert] = useState<AlertState>({alert: "", alertType: "info"});
  const [transcription, setTranscription] = useState<string | null>(null);
  const [transcriptionProgress, setTranscriptionProgress] = useState<number>(0);
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
    const fetchTranscription = async () => {
      if (!audio) return;

      setIsLoading(true);
      setTranscriptionProgress(10);
      try {
        // Create a new transcription job
        const job_uuid = await createJob(audio);
        setTranscriptionProgress(50);

        // Polling for the transcription result
        let transcriptionResult: string | null = null;
        let attempts = 0;
        const maxAttempts = 20;

        while (attempts < maxAttempts) {
          transcriptionResult = await getTranscriptionByUuid(job_uuid);
          if (transcriptionResult) {
            break;
          }
          attempts += 1;
          setTranscriptionProgress(50 + (attempts / maxAttempts) * 40);
          await new Promise(res => setTimeout(res, 3000)); // Wait for 3 seconds before next poll
        }

        if (transcriptionResult) {
          setTranscription(transcriptionResult);
          setAlert({alert: "Transcription réussie!", alertType: "success"});
        } else {
          setAlert({alert: "Échec de la récupération de la transcription dans le délai imparti.", alertType: "error"});
        }
      } catch (error: any) {
        setAlert({alert: `Erreur lors de la transcription: ${error.message}`, alertType: "error"});
      } finally {
        setIsLoading(false);
        setTranscriptionProgress(100);
      }
    };

    fetchTranscription();
  }, [audio]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Header */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            sx={{
              height: 40,
              marginRight: 2,
            }}
            alt="Logo CH Vauclaire"
            src={logo}
          />
          <Typography variant="h1">
            Transcribe AI 
          </Typography>
        </Toolbar>
      </AppBar>

       {/* Fin du Header */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant='h2'>Boîte à outils</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
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
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
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
          { isLoading && <LoadingBarProgress progress={transcriptionProgress}/> }
          <AudioPlayer audio = {audio}/>
        </Box>
      </Box>
    </Box>
  );
}
