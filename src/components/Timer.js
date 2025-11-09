import { useState, useEffect } from "react";

const Timer = ({isRecording, isPause}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isRecording || isPause) return;

    let timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => clearTimeout(timer) // Evite les fuites mémoires en supprimant les instances fantomes
    
  }, [count, isRecording, isPause]);

  useEffect(() => {
     if (!isRecording) setCount(0);
  }, [isRecording]);

  const hh = Math.floor(count / 3600);
  const mm = Math.floor(count / 60);
  const ss = count % 60;
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div>
      <h1>{pad(hh)} : {pad(mm)} : {pad(ss)}</h1>
    </div>
  );
};

export default Timer;
