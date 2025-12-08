/** Thème dark complet MUI v5 */
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',

    background: {
      primary: '#0D0D0D',
      secondary: '#3F3F45',
      default: '#272727',
    },

    texte: {
      primary: '#FFFFFF',
      secondary: '#A1A1A3',
      error: '#F43D50',
      success: '#28FFBB',
      link: '#00d0ffc2',
      highlight: '#007C82',
    },
  },

  typography: {
    h1: { fontWeight: 600, fontSize: 'clamp(2rem, 4vw + 1rem, 2.5rem)', color: '#E5E5E7' },
    h2: { fontWeight: 500, fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2rem)', color: '#E5E5E7' },
    h3: { fontWeight: 500, fontSize: 'clamp(1.5rem, 2.5vw + 0.5rem, 1.75rem)', color: '#E5E5E7' },
    h4: { fontWeight: 500, fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 1.5rem)', color: '#E5E5E7' },
    h5: { fontWeight: 500, fontSize: 'clamp(1.1rem, 1.5vw + 0.4rem, 1.25rem)', color: '#E5E5E7' },
    h6: { fontWeight: 500, fontSize: 'clamp(0.9rem, 1.2vw + 0.3rem, 1rem)', color: '#E5E5E7' },
    body1: { fontWeight: 400, fontSize: 'clamp(0.9rem, 1vw + 0.3rem, 1rem)', lineHeight: 1.6, color: '#A1A1A3' },
    p: { fontWeight: 500, fontSize: 'clamp(0.8rem, 0.8vw + 0.3rem, 0.875rem)', color: '#A1A1A3' },
  },

  components: {
    // ------------------------ BUTTONS ------------------------
    MuiButton: {
      defaultProps: { variant: 'contained', disableElevation: true },
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: theme.spacing(1, 3),
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }),
        contained: ({ theme }) => ({
          backgroundColor: theme.palette.texte.highlight,
          color: theme.palette.texte.primary,
          '&:hover': { backgroundColor: theme.palette.texte.link },
          '&:disabled': {
            backgroundColor: theme.palette.background.secondary,
            color: theme.palette.texte.secondary,
            opacity: 0.6,
          },
        }),
        outlined: ({ theme }) => ({
          borderColor: theme.palette.texte.highlight,
          color: theme.palette.texte.highlight,
          '&:hover': { backgroundColor: 'rgba(0,124,130,0.1)' },
          '&:disabled': { color: theme.palette.texte.secondary, borderColor: theme.palette.texte.secondary, opacity: 0.6 },
        }),
        text: ({ theme }) => ({
          color: theme.palette.texte.highlight,
          '&:hover': { backgroundColor: 'rgba(0,124,130,0.1)' },
          '&:disabled': { color: theme.palette.texte.secondary, opacity: 0.6 },
        }),
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.texte.primary,
          transition: 'color 0.3s ease',
          '&:hover': { color: theme.palette.texte.highlight, backgroundColor: 'rgba(0,124,130,0.1)' },
          '&.Mui-disabled': { color: theme.palette.texte.secondary },
        }),
      },
    },

    // ------------------------ LIST ITEM BUTTON ------------------------
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          transition: 'color 0.3s ease, background-color 0.3s ease',
          '&:hover .MuiListItemText-primary': { color: theme.palette.texte.highlight },
          '&:hover .MuiSvgIcon-root': { color: theme.palette.texte.highlight },
          '&.Mui-disabled .MuiListItemText-primary': { color: theme.palette.texte.secondary },
          '&.Mui-disabled .MuiSvgIcon-root': { color: theme.palette.texte.secondary },
        }),
      },
    },

    // ------------------------ ALERT ------------------------
    MuiAlert: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          fontWeight: 500,
          '&.MuiAlert-standardSuccess': {
            backgroundColor: theme.palette.texte.success,
            color: theme.palette.texte.success,
            '& .MuiAlert-icon': { color: theme.palette.texte.success },
          },
          '&.MuiAlert-standardError': {
            backgroundColor: theme.palette.texte.error,
            color: theme.palette.texte.error,
            '& .MuiAlert-icon': { color: theme.palette.texte.error },
          },
          '&.MuiAlert-standardInfo': {
            backgroundColor: theme.palette.texte.link,
            color: theme.palette.texte.link,
            '& .MuiAlert-icon': { color: theme.palette.texte.link },
          },
          '&.MuiAlert-standardWarning': {
            backgroundColor: theme.palette.background.secondary,
            color: theme.palette.texte.highlight,
            '& .MuiAlert-icon': { color: theme.palette.texte.highlight },
          },
        }),
      },
    },

    // ------------------------ SNACKBAR ------------------------
    MuiSnackbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiSnackbarContent-root': {
            backgroundColor: theme.palette.background.secondary,
            color: theme.palette.texte.primary,
          },
        }),
      },
    },
  },
});

const responsiveDarkTheme = responsiveFontSizes(darkTheme);

export default responsiveDarkTheme;
