import { useTheme } from '@mui/material/styles';
import { useState } from "react";
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

// Import des components dans le dossier src

import Transcriber from '../components/Transcriber';
// Import des Icons
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import VoiceRecorder from '../components/VoiceRecorder';

export default function Home() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const retranscriptionTexte = "test";

  const[recordedURL, setRecorderURL] = useState("");

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
        <VoiceRecorder setRecorderURL= {setRecorderURL}/>
        <Divider/>
        <List>
            {/* Bouton Téléverser un fichier */}
            <ListItem disablePadding>
              <ListItemButton disabled={false}>
                <ListItemIcon>
                  <UploadFileIcon />
                </ListItemIcon>
                <ListItemText primary="Téléverser" />
              </ListItemButton>
            </ListItem>
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
        <Exporter texteToExport = {retranscriptionTexte}/>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
        {/* Créer un composant qui prend en props le fichier audio et affiche la transcription ? */}
        { recordedURL ?  <Transcriber audioSource={recordedURL}/> : <Box/>}
      </Box>
    </Box>
  );
}
