import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";

/* 
  Loading page were we save the session data and verify the auth
*/

export default function AuthLoadingPage () {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/AudioTranscription");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing(2),
        bgcolor: "background.primary",
        color: "texte.primary",
        px: theme.spacing(3),
      }}
    >
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: " #00B37E",
        }}
      />

      <Typography
        variant="h5"
        sx={{
          ...theme.typography.h5,
          textAlign: "center",
        }}
      >
        Vérification de votre session...
      </Typography>

      <Typography
        variant="body1"
        sx={{
          maxWidth: 400,
        }}
      >
        Merci de patienter une seconde, on check que tout est clean 👀
      </Typography>
    </Box>
  );
}
