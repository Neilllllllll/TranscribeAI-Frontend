/* Componente for recording audio from microphone, it return the recorded audio blob to the parent component */
import { useState, useRef, useEffect } from "react";
// Import a class that allows to record
import Recorder from '../utils/Recorder';
// Import icons from material UI
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ListItemIcon from '@mui/material/ListItemIcon';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TimerIcon from '@mui/icons-material/Timer';

// Import components from material UI
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useTheme } from '@mui/material/styles';

import Timer from './Timer';

export default function AudioRecorder({ onRecordEnd, setAlert }){
    const theme = useTheme();
    const [isRecording, setIsRecording] = useState(false);
    const [isPause, setIsPause] = useState(false);

    const audioRecorderRef = useRef(null);
    // Initialize the audio recorder at the first render
    useEffect(() => {
        const recorder = new Recorder();
        recorder.init();
        audioRecorderRef.current = recorder;
    }, []);

    // start recording
    const handlerStartRecording = () => {
        setIsRecording(true);
        audioRecorderRef.current?.start();
        setAlert({alert: "L'enregistrement a commencé.", alertType: "info"});
    };

    // pause recording
    const handlerPauseRecording = () => {
        setIsPause(!isPause);
        if(isPause){
        audioRecorderRef.current?.resume();
        setAlert({alert: "L'enregistrement a repris.", alertType: "info"});
        return;
        }
        audioRecorderRef.current?.pause();
        setAlert({alert: "L'enregistrement est en pause.", alertType: "info"});
    }

    // stop recording and return blob to parent component
    const handlerStopRecording = async () => {
        setIsRecording(false); 
        setIsPause(false);
        const blob = await audioRecorderRef.current?.stop();
        if (!blob) {
            onRecordEnd(null);
            setAlert({alert: "Une erreur est survenue lors de l'enregistrement audio.", alertType: "error"});
            return;
        }
        onRecordEnd(blob.audioBlob, "audio/webm");
    }
    return(
        <>
            {/* Bouton ENREGISTRER */}
            <ListItem disablePadding>
                <ListItemButton disabled={isRecording} onClick={handlerStartRecording}>
                    <ListItemIcon>
                        <FiberManualRecordIcon sx={isRecording ? { color: theme.palette.element.iconHover } : undefined}/>
                    </ListItemIcon>
                    <ListItemText primary="Enregistrer" />
                </ListItemButton>
            </ListItem>
            {/* Bouton PAUSE */}
            <ListItem disablePadding>
                <ListItemButton disabled={!isRecording} onClick={handlerPauseRecording}>
                    <ListItemIcon>
                        {!isPause ? <PauseIcon /> : <PlayArrowIcon />}
                    </ListItemIcon>
                    <ListItemText primary={!isPause ? "Pause" : "Reprendre"} />
                </ListItemButton>
            </ListItem>
            {/* Bouton STOP */}
            <ListItem disablePadding>
                <ListItemButton disabled={!isRecording} onClick={handlerStopRecording}>
                    <ListItemIcon>
                        <StopIcon />
                    </ListItemIcon>
                    <ListItemText primary="Stop" />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <TimerIcon />
                </ListItemIcon>
                <Timer isRecording={isRecording} isPause = {isPause}/>
            </ListItem>
        </>
    );
}