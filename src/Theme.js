/**Component à mettre à la racine pour personnaliser le thèmes du site*/


import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  // On définit la palette de couleurs
  palette: {
    mode: 'dark',

    background: {
      principale: '#0D0D0D',
      secondaire: '#1C1C1E',
    },

    texte: {
      principal: '#E5E5E7',
      secondaire: '#A1A1A3',
      error: '#D72638',
      succed: '00B37E'
    },

    element: {
      link: '#00ADB5',
      button: '#007C82',
      hover: '#00ADB5',
      disabled : '#575759',
      separator: '#2E2E32',
      icon: '#E5E5E7',
      iconHover: '#00ADB5', 
      iconDisabled: '#5A5A5C',
      listItemHover: '#1f1f1f8a', 
      textHover: '#007C82',
      textDisabled: '#8e8e8e',
    },
  },

  // Typographie
  typography: {
    h1: {
      fontWeight: 600,
      fontSize: 'clamp(2rem, 4vw + 1rem, 2.5rem)',
      color: '#E5E5E7',
    },
    h2: {
      fontWeight: 500,
      fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2rem)',
      color: '#E5E5E7',
    },
    h3: {
      fontWeight: 500,
      fontSize: 'clamp(1.5rem, 2.5vw + 0.5rem, 1.75rem)',
      color: '#E5E5E7',
    },
    h4: {
      fontWeight: 500,
      fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 1.5rem)',
      color: '#E5E5E7',
    },
    h5: {
      fontWeight: 500,
      fontSize: 'clamp(1.1rem, 1.5vw + 0.4rem, 1.25rem)',
      color: '#E5E5E7',
    },
    h6: {
      fontWeight: 500,
      fontSize: 'clamp(0.9rem, 1.2vw + 0.3rem, 1rem)',
      color: '#E5E5E7',
    },

    body1: {
      fontWeight: 400,
      fontSize: 'clamp(0.9rem, 1vw + 0.3rem, 1rem)',
      lineHeight: 1.6,
      color: '#A1A1A3',
    },
    p: {
      fontWeight: 500,
      fontSize: 'clamp(0.8rem, 0.8vw + 0.3rem, 0.875rem)',
      color: '#A1A1A3',
    },
  },

  /**Personnalisation des composants MUI**/
  components: {
    // Personnalisation des boutons MUI
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.element.button,
          color: '#FFFFFF',
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: theme.spacing(1, 3),
          transition: 'background-color 0.3s ease',

          '&:hover': {
            backgroundColor: theme.palette.element.hover,
          },
          '&:disabled': {
            opacity: 0.5,
            backgroundColor: theme.palette.element.disabled,
          },
        }),
      },
    },

    // Personnalisation des icons MUI
    MuiSvgIcon: {
      defaultProps: {
        fontSize: 'medium', // taille par défaut
      },
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.element.icon,
          transition: 'color 0.3s ease',

          '&:hover': {
            color: theme.palette.element.iconHover,
          },

          '&.Mui-disabled': {
            color: theme.palette.element.iconDisabled,
          },
        }),
      },
    },
    // Personnalisation des ListItemButton MUI
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          transition: 'color 0.3s ease',

          // Hover sur le texte
          '&:hover .MuiListItemText-primary': {
            color: theme.palette.element.textHover,
          },

          // Hover sur l'icone
          '&:hover .MuiSvgIcon-root': {
            color: theme.palette.element.iconHover,
          },

          // Disabled → texte
          '&.Mui-disabled .MuiListItemText-primary': {
            color: theme.palette.element.textDisabled,
          },

          // Disabled → icon
          '&.Mui-disabled .MuiSvgIcon-root': {
            color: theme.palette.element.iconDisabled,
          },
        }),
      },
    },


  },
});

// Rendre la typographie réactive
theme = responsiveFontSizes(theme);
export default theme;
