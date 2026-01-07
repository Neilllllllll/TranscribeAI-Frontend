import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  CardActionArea, 
  Stack 
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import logo from "../Shared/assets/logo.svg"
import { MODULE_ROUTES } from '../../config/routes.tsx';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* SECTION LOGO + TITRE */}
      <Stack spacing={2} alignItems="center" sx={{ mb: 8 }}>
        <Box 
          component="img" 
          src={logo}
          alt="Logo" 
          sx={{ width: 80, height: 80 }} 
        />
        <Typography variant="h3" component="h1" fontWeight="bold" textAlign="center">
          Transcribe AI Suite
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center">
          Choisissez un outil pour commencer à traiter vos fichiers audio.
        </Typography>
      </Stack>

      {/* SECTION GRILLE DE CARTES */}
      <Grid container spacing={4}>
        {MODULE_ROUTES.map((module, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card elevation={3} sx={{ height: '100%', borderRadius: 4 }}>
              <CardActionArea 
                onClick={() => navigate(module.fullPath)}
                sx={{ height: '100%', p: 2 }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {module.icon}
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