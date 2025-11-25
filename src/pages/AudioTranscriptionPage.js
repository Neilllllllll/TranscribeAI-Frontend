/* Main page for audio transcription */
import { useState } from "react";
// Import logo
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
import { AppBar, Drawer, DrawerHeader } from '../styles/Home.styles';
// Import our components
import TranscriptionDisplay from '../components/TranscriptionDisplay';
import AudioUpload from '../components/AudioUpload';
import AudioPlayer from '../components/AudioPlayer';
import AudioRecorder from '../components/AudioRecorder';
import Exporter from '../components/Exporter';
// Import icons from material UI
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';

export default function AudioTranscriptionPage() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [audio, setAudio] = useState(null);
  const [{alert, alertType}, setAlert] = useState({alert: null, alertType: "error"});
  const [transcription, setTranscription] = useState("null");

  const handleRecordEnd = (blob, mimeType) => {
    setAudio({
      blob: blob,
      mimeType: mimeType,
      filename: "recorded-audio.webm"
    });
    setTranscription("");
    setAlert({alert: null, alertType: "error"});
  };

  const handleUploadEnd = (file) => {
    setAudio({
      blob: file,
      mimeType: file.type,
      filename: file.name
    });
    setTranscription("");
    setAlert({alert: null, alertType: "error"});
  };

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
          <AudioRecorder onRecordEnd = {handleRecordEnd} setAlert={setAlert}/>
        </List>

        <Divider/>
        <List>
            {/* Bouton Téléverser un fichier */}
            <AudioUpload onUploadEnd = {handleUploadEnd} setAlert={setAlert} />
            {/* Bouton programmer une retranscription */}
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
          <Exporter texteToExport = {transcription} setAlert={setAlert}/>
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
        {/* Créer un composant qui prend en props le fichier audio et affiche la transcription ? */}
        <Box sx ={{
          width : "100%",
          display : 'flex',
          flexDirection :"column",
          alignItems : 'center',
          gap : 2
        }}>
          <TranscriptionDisplay transcription = {transcription}/>
          { alert && <Alert variant="outlined" severity={alertType}>{alert}</Alert> }
          <AudioPlayer audioBlob = {audio?.blob}/>
        </Box>
      </Box>
    </Box>
  );
}
