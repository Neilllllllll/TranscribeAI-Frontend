import { useState, useRef, useEffect } from "react";
// Import a class that allows to record
import AudioRecorder from '../utils/AudioRecorder';
// Import icons from material UI
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ListItemIcon from '@mui/material/ListItemIcon';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TimerIcon from '@mui/icons-material/Timer';

// Import components from material UI
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import { useTheme } from '@mui/material/styles';

import Timer from './Timer';

export default function VoiceRecorder({setRecorderURL}){
    const theme = useTheme();
    const [isRecording, setIsRecording] = useState(false);
    const [isPause, setIsPause] = useState(false);

    const audioRecorderRef = useRef(null);
    // Initialize the audio recorder at the first render
    useEffect(() => {
        console.log("init");
        const recorder = new AudioRecorder();
        recorder.init();
        audioRecorderRef.current = recorder;
    }, []);

    // Logique d'enregistrement de la voix utilisateur
    const handlerStartRecording = () => {
        setIsRecording(true);
        audioRecorderRef.current?.start();
    };

    const handlerPauseRecording = () => {
        setIsPause(!isPause);
        if(isPause){
        audioRecorderRef.current?.resume();
        return;
        }
        audioRecorderRef.current?.pause();
    }

    const handlerStopRecording = async () => {
        setIsRecording(false); 
        setIsPause(false);
        const result = await audioRecorderRef.current?.stop();
        if (!result) {
        setRecorderURL(null);
        return;
        }
        setRecorderURL(result.url); 
    }
    return(
        <>
        <List       
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Dictée à temps réel
                </ListSubheader>}
        >
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
        </List>
        </>
    );
}