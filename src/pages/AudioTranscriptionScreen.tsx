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
// Import icons from material UI
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
// import types
import { AlertState } from "../types/alert.types.ts";
import { Audio } from "../types/audio.types.ts";
import { TranscriptionText } from "../types/transcriptionText.types.ts";
// Import API function
import { fetchTranscription } from "../api/fetchTranscription.tsx";

export default function AudioTranscriptionScreen() {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(true);
  const [audio, setAudio] = useState< Audio | null>(null);
  const [{alert, alertType}, setAlert] = useState<AlertState>({alert: "", alertType: "info"});
  const [transcription, setTranscription] = useState<TranscriptionText | null>(null);
  const abortController = useRef<AbortController | null>(null);

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

  // Call the transcription API when audio state change
  useEffect(() => {
    if (!audio) return;

    // annule toute requête en cours
    abortController.current?.abort();
    abortController.current = new AbortController();

    setAlert({ alert: "La transcription est en cours", alertType: "info" });

    (async () => {
      try {
        const data = await fetchTranscription(abortController.current!.signal);
        setTranscription(data);
        setAlert({ alert: "La transcription est terminée", alertType: "success" });
      } catch (err: any) {
        if (err?.name === "AbortError") {
          // requête annulée volontairement
          console.debug("transcription aborted");
          return;
        }
        setAlert({ alert: "Quelque chose s'est mal passé lors de la transcription.", alertType: "error" });
      }
    })();
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
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
        <Box sx ={{
          width : "100%",
          display : 'flex',
          flexDirection :"column",
          alignItems : 'center',
          gap : 2
        }}>
          <TranscriptionDisplay transcription = {transcription}/>
          { alert && <Alert variant="outlined" severity={alertType}>{alert}</Alert> }
          <AudioPlayer audio = {audio}/>
        </Box>
      </Box>
    </Box>
  );
}
