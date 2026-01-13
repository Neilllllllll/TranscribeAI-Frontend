/* Componente for uploading audio files, it return the selected file to the parent component */
// Import react hooks
import { useRef } from "react";
// Import components from material UI
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
// Import icon
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { AlertState } from "../types/alert.types.ts";
import { Audio } from "../types/audio.types.ts";
import { isAudioValid } from "../utils/validateAudio.tsx";
import {useAlert} from '../contexts/AlertContext.tsx'

interface AudioUploadProps {
  onUploadEnd: (audio: Audio) => void;
  MAXSIZEBYTES_VAL: number
}

export default function AudioUpload({onUploadEnd, MAXSIZEBYTES_VAL}: AudioUploadProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const {showAlert} = useAlert();

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        const result = isAudioValid(selectedFile, MAXSIZEBYTES_VAL);
        // Cas où l'audio n'est pas valide et n'est pas enregistré
        if(result !== true){
            showAlert(result.message, result.type as AlertState["alertType"]);
        }
        // Cas où l'audio a bien été enregistré
        else{
            showAlert("L'audio a bien été enregistré", "success");
            const newAudio = {blob: selectedFile, mimeType: selectedFile.type, filename: selectedFile.name};
            onUploadEnd(newAudio);
        }
        event.target.value = "";
    };

    return (
    <>
        <input
            type="file"
            accept="audio/*"
            hidden
            ref = {inputRef}
            onChange={handleFileChange}
        />
        <ListItem disablePadding>
            <ListItemButton disabled={false} onClick={handleClick} >
                <ListItemIcon>
                    <UploadFileIcon />
                </ListItemIcon>
                <ListItemText primary={"Téléverser : Max " + MAXSIZEBYTES_VAL + " Mo" }/>
            </ListItemButton>
        </ListItem>
    </>
    );
}
