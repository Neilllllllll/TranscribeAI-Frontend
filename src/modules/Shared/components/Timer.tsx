/* Component that render a timer */
// Import react hooks
import { useState, useEffect } from "react";
// Import components from material UI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface TimerProps {
  isRecording: boolean;
  isPause: boolean;
}

const Timer = ({isRecording, isPause}: TimerProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isRecording || isPause) return;

    // Increase the timer to 1 each second
    let timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => clearTimeout(timer)
    
  }, [count, isRecording, isPause]);

  // Reset the timer when recording stops
  useEffect(() => {
     if (!isRecording) setCount(0);
  }, [isRecording]);

  const hh = Math.floor(count / 3600);
  const mm = Math.floor(count / 60);
  const ss = count % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          fontVariantNumeric: "tabular-nums",
          color: (theme) => theme.palette.text.primary,
          letterSpacing: "0.05em",
        }}
      >
        {pad(hh)} : {pad(mm)} : {pad(ss)}
      </Typography>
    </Box>
  );
};

export default Timer;
