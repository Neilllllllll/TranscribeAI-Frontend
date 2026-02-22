import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  CardActionArea, 
  Stack, 
  Tooltip,
  IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { MODULE_ROUTES } from '../../core/router/routes.tsx';
import HelpIcon from '@mui/icons-material/Help';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Tooltip title="Aide" sx = {{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
        <IconButton onClick={() => navigate("/aide")}>
          <HelpIcon />
        </IconButton>
      </Tooltip>
      {/* SECTION LOGO + TITRE */}
      
      <Stack spacing={2} alignItems="center" sx={{ mb: 8 }}>
        <Box 
          component="img" 
          src={"/assets/logo.svg"}
          alt="Logo" 
          sx={{ width: 120, height: 120 }} 
        />
        <Box sx={{ display : 'flex', gap : 1}}>
          <Typography variant="h3" component="h1" fontWeight="bold" textAlign="center">
            Transcribe AI Suite
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" textAlign="center">
          Une collection d'outils de transcription alimentés par l'IA pour répondre à tous vos besoins de conversion audio-texte.
        </Typography>
      </Stack>

      {/* SECTION GRILLE DE CARTES */}
      <Grid container spacing={4}>
        {MODULE_ROUTES.map((module, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card elevation={module.enable === false ? 0 : 3} sx={{ height: '100%', borderRadius: 4 }}>
              <CardActionArea 
                onClick={() => navigate(module.fullPath)}
                disabled={module.enable === false}
                sx={{ height: '100%', p: 2, "&.Mui-disabled": { cursor: "not-allowed", pointerEvents: "auto"}}}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {module.icon.slice().reverse().map((icon, iconIndex) => (
                      <Box key={iconIndex} component="span" sx={{ mr: 1 }}>
                        {icon}
                      </Box>
                    ))}
                  </Box>
                  <Typography gutterBottom variant="h5" component="div" fontWeight="medium">
                    {module.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {module.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}