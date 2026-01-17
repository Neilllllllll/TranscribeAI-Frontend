import { createTheme } from '@mui/material/styles';
// Palette sombre personnalisée inspirée de Google Dark Mode
const darkPalette = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8ab4f8',      
      light: '#aecbfa',
      dark: '#669df6',
      contrastText: '#202124', 
    },
    secondary: {
      main: '#a982f2ff', 
    },
    error: {
      main: '#f28b82', 
    },
    warning: {
      main: '#fdd663', 
    },
    info: {
      main: '#0084ffff',
    },
    success: {
      main: '#81c995',
    },
    background: {
      default: '#202124', 
      paper: '#292a2d',   
    },
    text: {
      primary: '#e8eaed', 
      secondary: '#9aa0a6', 
    },
    divider: '#3c4043', 
  },
  typography: {
    fontFamily: '"Google Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 600, color: '#e8eaed' },
    h2: { fontWeight: 500 },
    button: { 
      textTransform: 'none', 
      fontWeight: 500 
    },
  },
  shape: {
    borderRadius: 12, 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, 
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
export default darkPalette;
