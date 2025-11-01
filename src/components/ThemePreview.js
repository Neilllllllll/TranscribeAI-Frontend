// src/components/ThemePreview.jsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Divider,
  IconButton,
} from '@mui/material';
import { CheckCircle, Warning, Error, Info } from '@mui/icons-material';

function ThemePreview() {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100vh',
        p: 4,
      }}
    >
      <Typography variant="h3" gutterBottom>
        🎨 Aperçu du Thème
      </Typography>

      <Typography variant="body1" color="text.secondary" gutterBottom>
        Voici un aperçu du style global basé sur ta palette sombre personnalisée.
      </Typography>

      <Divider sx={{ my: 4, borderColor: 'neutral.light' }} />

      {/* Section Boutons */}
      <Typography variant="h5" gutterBottom>
        Boutons
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Button variant="contained" color="primary">
          Bouton primaire
        </Button>
        <Button variant="outlined" color="primary">
          Bouton outline
        </Button>
        <Button variant="contained" color="secondary">
          Secondaire
        </Button>
        <Button variant="text" color="primary">
          Lien texte
        </Button>
      </Stack>

      {/* Section Typographie */}
      <Typography variant="h5" gutterBottom>
        Typographie
      </Typography>
      <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper', mb: 4 }}>
        <Typography variant="h1">Titre H1</Typography>
        <Typography variant="h2">Titre H2</Typography>
        <Typography variant="h3">Titre H3</Typography>
        <Typography variant="body1" color="text.secondary">
          Texte descriptif (body1) – couleur secondaire (#A6A8AE)
        </Typography>
        <Typography variant="body2">
          Texte normal (body2) – couleur principale (#FFFFFF)
        </Typography>
      </Paper>

      {/* Section Icônes */}
      <Typography variant="h5" gutterBottom>
        Icônes et états
      </Typography>
      <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 4 }}>
        <IconButton color="primary">
          <Info />
        </IconButton>
        <IconButton color="success">
          <CheckCircle />
        </IconButton>
        <IconButton color="warning">
          <Warning />
        </IconButton>
        <IconButton color="error">
          <Error />
        </IconButton>
      </Stack>

      {/* Section Carte / Paper */}
      <Typography variant="h5" gutterBottom>
        Surface / Carte
      </Typography>
      <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper' }}>
        <Typography variant="h6">Carte d’exemple</Typography>
        <Typography variant="body2" color="text.secondary">
          Ceci est une surface utilisant <code>background.paper</code> avec ta
          couleur de fond secondaire (#1A2235).
        </Typography>
      </Paper>
    </Box>
  );
}

export default ThemePreview;
