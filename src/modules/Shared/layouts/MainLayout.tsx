import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  Box, 
  BottomNavigation, 
  BottomNavigationAction, 
  Paper,
  Typography
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { MODULE_ROUTES } from '../../../config/routes.tsx';
import logo from '../assets/logo.svg'

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // On détermine quelle action est active en fonction de l'URL actuelle
  // Si on est sur /app, la valeur est 0 (Accueil)
  const [value, setValue] = useState(location.pathname);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 1. Header fixe en haut */}
      <Box component="nav" sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex'}}>
        <Box 
          component="img" 
          src={logo}
          alt="Logo" 
          sx={{ width: 60, height: 60 }} 
        />
        <Typography variant="h6">Transcribe AI</Typography>
      </Box>

      {/* 2. Zone de contenu principale (flexible pour pousser le footer en bas) */}
      <Box component="main" sx={{ flexGrow: 1, pb: 7 }}> 
        {/* pb: 7 pour éviter que le contenu soit caché derrière le footer fixe */}
        <Outlet /> 
      </Box>

      {/* 3. Footer Navigation fixe en bas */}
      <Paper 
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} 
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
        >
          {/* On ajoute manuellement le bouton Home */}
          <BottomNavigationAction 
            label="Accueil" 
            value="/home" 
            icon={<HomeIcon />} 
          />

          {/* On génère dynamiquement les autres boutons depuis ta config */}
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