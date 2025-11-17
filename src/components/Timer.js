import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Timer = ({isRecording, isPause}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isRecording || isPause) return;

    // incrémente le timer de 1 secondes
    let timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => clearTimeout(timer)
    
  }, [count, isRecording, isPause]);

  useEffect(() => {
     if (!isRecording) setCount(0);
  }, [isRecording]);

  const hh = Math.floor(count / 3600);
  const mm = Math.floor(count / 60);
  const ss = count % 60;
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1.5,
        borderRadius: 2,
        backgroundColor: (theme) => theme.palette.background.secondaire,
        border: (theme) => `1px solid ${theme.palette.element.separator}`,
        width: "fit-content",
        mx: "auto",
        userSelect: "none",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontVariantNumeric: "tabular-nums",
          color: (theme) => theme.palette.texte.principal,
          letterSpacing: "0.05em",
        }}
      >
        {pad(hh)} : {pad(mm)} : {pad(ss)}
      </Typography>
    </Box>
  );
};

export default Timer;
