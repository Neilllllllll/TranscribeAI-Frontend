/* Componente for uploading audio files, it return the selected file to the parent component */
import { env } from "../../../config/env.ts";
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

interface AudioUploadProps {
  onUploadEnd: (audio: Audio) => void;
  setAlert: (alert: AlertState) => void;
}

export default function AudioUpload({onUploadEnd, setAlert}: AudioUploadProps) {
    const MAXSIZEBYTES_VAL = env.MAXSIZEBYTES;
    
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Sécurité : si la conversion échoue, on prend 20 par défaut
    console.log(MAXSIZEBYTES_VAL);
    const rawValue = parseInt(MAXSIZEBYTES_VAL || "20", 10);
    const MAXSIZEBYTES = rawValue * 1048576; 

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        if (!selectedFile.type.startsWith("audio/")) {
            setAlert({alert: "Le fichier n'est pas un fichier audio !", alertType: "error"});
            return;
        }

        if (selectedFile.size > MAXSIZEBYTES) {
            setAlert({
                alert: `Le fichier dépasse la taille maximale autorisée (${rawValue} Mo) !`, 
                alertType: "error"
            });
            return;
        }

        const newAudio = {blob: selectedFile, mimeType: selectedFile.type, filename: selectedFile.name};
        setAlert({alert: null, alertType: "info"});
        onUploadEnd(newAudio);
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
            <ListItemButton disabled={false} onClick={handleClick}>
            <ListItemIcon>
                <UploadFileIcon />
            </ListItemIcon>
            <ListItemText primary="Téléverser" />
            </ListItemButton>
        </ListItem>
    </>
    );
}
