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

interface AudioUploadProps {
  onUploadEnd: (audio: Audio) => void;
  setAlert: (alert: AlertState) => void;
}

export default function AudioUpload({onUploadEnd, setAlert}: AudioUploadProps) {
    
    const MAXSIZEBYTES = 10 * 1024 * 1024;
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newAudio: Audio = {blob: null, mimeType: "", filename: ""};
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) {
            onUploadEnd(newAudio);
            return;
        }

        // Check basic MIME type (frontend side, just for UX)
        if (!selectedFile.type.startsWith("audio/")) {
            setAlert({alert: "Le fichier sélectionné n'est pas un fichier audio ou vidéo MP4.", alertType: "error"});
            onUploadEnd(newAudio);
            return;
        }

        // Example: size limit to 100 MB
        if (selectedFile.size > MAXSIZEBYTES) {
            setAlert({alert: "Le fichier audio dépasse la taille maximale autorisée (10 Mo).", alertType: "error"});
            onUploadEnd(newAudio);
            return;
        }
        newAudio = {blob: selectedFile, mimeType: selectedFile.type, filename: selectedFile.name};
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
