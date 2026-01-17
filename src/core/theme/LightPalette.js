import { createTheme } from '@mui/material/styles';

const lightPalette = createTheme({
  palette: {
    mode: 'light', // Changez en 'dark' pour le mode sombre
    primary: {
      main: '#04B2D9',      // La couleur de vos boutons principaux
      light: '#049DD9',
      dark: '#010440',
      contrastText: '#fff', // Couleur du texte sur fond primaire
    },
    secondary: {
      main: '#04B2D9',      // Utilisé pour les actions secondaires
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#2e7d32',
    },
    background: {
      default: '#ffffff', // Couleur de fond de vos pages
      paper: '#f4f7f6',     // Couleur de fond des cartes/menus
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 600, color: '#010440' },
    button: { textTransform: 'none' }, // Désactive les majuscules automatiques
  },
  shape: {
    borderRadius: 8, // Arrondi global des boutons et cartes
  },
});

export default lightPalette;
