import { Outlet, useNavigate } from "react-router-dom";
import { 
  Box, 
  BottomNavigation, 
  BottomNavigationAction, 
  Paper,
  Typography,
  Divider
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import {MODULE_ROUTES} from '../routes.tsx'
import logo from '../assets/logo.svg';
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { useAlert } from '../contexts/AlertContext.tsx';

import {useGetCurrentMode} from '../hooks/useCurrentMode.tsx';
import { useColorMode } from '../../core/theme/ThemeContext.tsx';

export default function MainLayout() {
  const navigate = useNavigate();
  const currentMode = useGetCurrentMode();
  const { alertConfig } = useAlert();
  const theme = useTheme();
  const colorMode = useColorMode();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    // 1. Parent : Fais la taille de l'écran
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      width: '100vw',
      overflow: 'hidden'
    }}>
        {/* 2. Header : Reste en haut naturellement (flex item) */}
      <Box component="nav" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <Box 
          component="img" 
          src={logo}
          alt="Logo" 
          sx={{ width: 60, height: 60 }} 
        />

        <Box>
          { alertConfig.alert ? <Alert severity={alertConfig.alertType}>{alertConfig.alert}</Alert> : <Typography variant="h4" >Mode de {currentMode?.title}</Typography> }
        </Box>

        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <LightModeIcon /> : <NightsStayIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ borderBottomWidth: 3 }}/>

      {/* 3. Main */}
        <Box component="main" sx={{ 
          flexGrow : '1',
          display: 'flex',
          overflow: 'hidden',
          minHeight: 0
        }}>
          <Outlet /> 
        </Box>

      <Divider sx={{ borderBottomWidth: 3 }}/>

      {/* 4. Footer */}
      <Paper sx={{ position: 'relative'}} elevation={3}>
        <BottomNavigation
          showLabels
          value={currentMode?.fullPath}
          onChange={handleChange}
        >
          <BottomNavigationAction 
            label="Accueil" 
            value="/home" 
            icon={<HomeIcon />} 
          />

          {MODULE_ROUTES.map((route) => (
            <BottomNavigationAction
              key={route.id}
              label={route.title}
              value={route.fullPath}
              icon={route.icon}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}