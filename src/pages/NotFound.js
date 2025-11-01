import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80 }}/>
      <Typography variant="h1" gutterBottom>404</Typography>
      <Typography variant="h3" gutterBottom>Page introuvable</Typography>
      <Typography variant="body1" sx={{ mb: 4, maxWidth: 400 }}>
        Oups ! La page que vous cherchez n'existe pas ou a été déplacée. 
        Vérifiez l'URL ou revenez à l'accueil.
      </Typography>
      
      <Button onClick={() => navigate('/')}>
        Retour à l'accueil
      </Button>
    </Box>
  );
};

export default NotFound;
