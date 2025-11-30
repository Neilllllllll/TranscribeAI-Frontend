/* Componente for recording audio from microphone, it set the parent audio by calling onRecordEnd callback */
// Import react hooks
import { useState, useRef, useEffect } from "react";
// Import a class that allows to record
import Recorder from '../utils/Recorder';
// Import icons from material UI
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TimerIcon from '@mui/icons-material/Timer';
// Import components from material UI
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
// Import our component Timer
import Timer from './Timer.tsx';
// Import types
import { AlertState } from "../types/alert.types.ts";
import { Audio } from "../types/audio.types.ts";

interface AudioRecorderProps {
    onRecordEnd: (audio: Audio) => void;
    setAlert: (alert: AlertState) => void;
}

export default function AudioRecorder({ onRecordEnd, setAlert } : AudioRecorderProps){
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isPause, setIsPause] = useState<boolean>(false);
    const audioRecorderRef = useRef<Recorder | null>(null);

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

    // stop recording and return the audio to parent component
    const handlerStopRecording = async () => {
        let newAudio: Audio = {blob: null, mimeType: "", filename: ""};
        setIsRecording(false); 
        setIsPause(false);
        const blobResult = await audioRecorderRef.current?.stop();
        if (!blobResult) {
            onRecordEnd(newAudio);
            setAlert({alert: "Une erreur est survenue lors de l'enregistrement audio.", alertType: "error"});
            return;
        }
        newAudio = {blob: blobResult.audioBlob, mimeType: "audio/webm", filename: "recorded-audio.webm"};
        onRecordEnd(newAudio);
    }
    return(
        <>
            {/* Bouton ENREGISTRER */}
            <ListItem disablePadding>
                <ListItemButton disabled={isRecording} onClick={handlerStartRecording}>
                    <ListItemIcon>
                        <FiberManualRecordIcon />
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