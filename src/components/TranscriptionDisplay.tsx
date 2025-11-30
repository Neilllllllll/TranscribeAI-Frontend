/* Component that display the transcribed text */
/* 
A faire : 
Lorsque la transcription est en cours, afficher le texte qui arrive au fur et à mesure + animation avec le pourcentage de la transcription / barre de progression ?

Mettre un effet de scroll automatique vers le bas quand le texte s'allonge

Pouvoir changer une chaine de caractère dans le texte et cela pour tout le texte (genre corriger une faute de retranscription)

Indiquer en fonction de la position de lecture de l'audio quelle partie du texte est en train d'être lue (genre surligner la phrase en cours de lecture)

Faire d'afficher des timestamps cliquables dans le texte pour aller à un moment précis de l'audio

Gérer le cas où y'a pas de texte retranscrit (genre afficher un message "Rien n'a été retranscrit pour l'instant") ?

Se renseigner pour défiinr une key pour chaque token

*/
import CopyButton from './CopyButton.tsx';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

interface TranscriptionDisplayProps {
  transcription: {body: string}[] | null;
}

export default function TranscriptionDisplay({transcription}: TranscriptionDisplayProps) {
    const [transcriptionText, setTranscriptionText] = useState<string>("");

    useEffect(() => {
        setTranscriptionText(transcription ? transcription.map((token) => token.body).join(" ") : "");
    }, [transcription]);
    return(
        <>
            <Paper
                elevation={4}
                role="region"
                sx ={{
                    width : "100%",
                    height : "70vh",
                    overflow: 'auto',
                    padding: 2,
                }}
                >
                    {/* Scrollable Box */}
                <Box
                    sx={{
                    height: '100%',
                    overflow: 'auto',
                    // Custom scrollbar styles
                    '&::-webkit-scrollbar': {
                        width: '10px',
                        height: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        borderRadius: 6,
                        background: 'rgba(255,255,255,0.12)',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'transparent',
                    },
                    // Firefox
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255,255,255,0.12) transparent',
                    }}
                >
                    <Box
                    sx={{
                        position: 'sticky',
                        top: 0,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        zIndex: 9999,
                    }}
                    >
                        <CopyButton textToCopy={transcriptionText} />
                    </Box>

                    <Typography>
                        {transcriptionText}
                    </Typography>
                </Box>
            </Paper>
        </>
    );
};