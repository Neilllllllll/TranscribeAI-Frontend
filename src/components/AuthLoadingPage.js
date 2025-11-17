// src/AuthLoadingPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";

export default function AuthLoadingPage () {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
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
        bgcolor: theme.palette.background.principale,
        color: theme.palette.texte.principal,
        px: theme.spacing(3),
      }}
    >
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: theme.palette.element.button,
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
          ...theme.typography.p,
          color: theme.palette.texte.secondaire,
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        Merci de patienter une seconde, on check que tout est clean 👀
      </Typography>
    </Box>
  );
}
