import { useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import logo from '../assets/images/logo-ch-vauclaire.svg';
import { AppBar, Drawer, DrawerHeader } from '../styles/Home.styles';
import Exporter from '../components/Exporter';



import AudioRecorder from '../utils/AudioRecorder';

// Import des components dans le dossier src
import Timer from '../components/Timer';
import Transcriber from '../components/Transcriber';
// Import des Icons
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AudioFileIcon from '@mui/icons-material/AudioFile';



export default function Home() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPause, setIsPause] = useState(false);

  const[recordedURL, setRecorderURL] = useState("");

  const audioRecorderRef = useRef(null);
  // Initialize the audio recorder at the first render
  useEffect(() => {
    console.log("init");
    const recorder = new AudioRecorder();
    recorder.init();
    audioRecorderRef.current = recorder;
  }, []);

  // Logique d'enregistrement de la voix utilisateur
  const handlerStartRecording = () => {
    setIsRecording(true);
    audioRecorderRef.current?.start();
  };

  const handlerPauseRecording = () => {
    setIsPause(!isPause);
    if(isPause){
      audioRecorderRef.current?.resume();
      return;
    }
    audioRecorderRef.current?.pause();
  }

  const handlerStopRecording = async () => {
    setIsRecording(false); 
    setIsPause(false);
    const result = await audioRecorderRef.current?.stop();
    if (!result) {
      setRecorderURL(null);
      return;
    }
    setRecorderURL(result.url); 
  }

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
        { open ? <Divider>Dictée à temps réel</Divider> : <Divider/>}
        {/* Liste des fonctionalités*/}
        <List>
          {/* Bouton ENREGISTRER */}
          <ListItem disablePadding>
            <ListItemButton disabled={isRecording} onClick={handlerStartRecording}>
              <ListItemIcon>
                <GraphicEqIcon />
              </ListItemIcon>
              <ListItemText primary="Enregistrer" />
            </ListItemButton>
          </ListItem>
         {/* Bouton PAUSE */}
          <ListItem disablePadding>
            <ListItemButton disabled={!isRecording} onClick={handlerPauseRecording}>
              <ListItemIcon>
              {!isPause ? <PauseIcon /> : <PlayArrowIcon />}
              </ListItemIcon>
              <ListItemText primary={!isPause ? "Pause" : "Reprendre"} />
            </ListItemButton>
          </ListItem>
        {/* Bouton STOP */}
        <ListItem disablePadding>
          <ListItemButton disabled={!isRecording} onClick={handlerStopRecording}>
            <ListItemIcon>
              <StopIcon />
            </ListItemIcon>
            <ListItemText primary="Stop" />
          </ListItemButton>
        </ListItem>
      </List>
      { open ? <Divider>Retranscription</Divider> : <Divider/>}
      <List>
          {/* Bouton Téléverser un fichier */}
          <ListItem disablePadding>
            <ListItemButton disabled={true}>
              <ListItemIcon>
                <UploadFileIcon />
              </ListItemIcon>
              <ListItemText primary="Téléverser" />
            </ListItemButton>
          </ListItem>
          {/* Bouton programmer une retranscription */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="Planifier" />
            </ListItemButton>
          </ListItem>
      </List>
            { open ? <Divider>Exporter</Divider> : <Divider/>}
      <List>
          {/* Bouton copier le texte */}
          <ListItem disablePadding>
            <ListItemButton disabled={true}>
              <ListItemIcon>
                <ContentCopyIcon />
              </ListItemIcon>
              <ListItemText primary="Copier le texte" />
            </ListItemButton>
          </ListItem>
          {/* Bouton copier le texte */}
          <ListItem disablePadding>
            <ListItemButton disabled={true}>
              <ListItemIcon>
                <AudioFileIcon />
              </ListItemIcon>
              <ListItemText primary="Télécharger l'audio" />
            </ListItemButton>
          </ListItem>
          <Exporter></Exporter>
      </List>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
          {/* Créer un composant qui prend en props le fichier audio et affiche la transcription ? */}
          { recordedURL ?  <Transcriber audioSource={recordedURL}/> : <Timer isRecording = {isRecording} isPause={isPause}/>}
      </Box>
    </Box>
  );
}
