/* Component to display and edit transcription text with copy functionality */
/*
A faire : Lorsque la transcription est en cours, afficher le texte qui arrive au fur et à mesure + 
animation avec le pourcentage de la transcription / barre de progression ?

Mettre un effet de scroll automatique vers le bas quand le texte s'allonge

Pouvoir changer une chaine de caractère dans le texte et cela pour tout le texte (genre corriger une faute de retranscription)

Indiquer en fonction de la position de lecture de l'audio quelle partie du texte est en train d'être lue (genre surligner la phrase en cours de lecture)

Faire d'afficher des timestamps cliquables dans le texte pour aller à un moment précis de l'audio

Se renseigner pour défiinr une key pour chaque token
*/

import CopyButton from '../../Shared/components/CopyButton.tsx';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { AlertState } from '../../Shared/types/alert.types.ts';
import { useTheme } from '@mui/material/styles';

type TranscriptionDisplayProps = {
  textToDisplay: string | null; 
  onTextChange?: (newText: string) => void;
  setAlert: (alert: AlertState) => void;
};

export default function TranscriptionDisplay({
  textToDisplay,
  onTextChange,
  setAlert,
}: TranscriptionDisplayProps) {
  
  const theme = useTheme();
  return (
    <Paper
      elevation={4}
      role="region"
      sx={{
        width: "100%",
        height: "70vh",
        overflow: "hidden",
        padding: 2,
        position: "relative",
      }}
    >
      {/* --- Zone scrollable --- */}
      <Box
        sx={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          paddingRight: "10px",

          // Scrollbar personnalisée
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.25)",
            borderRadius: "4px",
          },
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.25) transparent",
        }}
      >
        {/* Bouton collé en haut */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 15,
            zIndex: 10000,
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: 1,
          }}
        >
          <CopyButton textToCopy={textToDisplay ?? ""} setAlert={setAlert} />
        </Box>
            {
            !textToDisplay ? (
                <p>Votre transcription s'affichera ici ...</p>
            ) : (
                <TextareaAutosize
                value={textToDisplay}
                minRows={20}
                onChange={(e) => onTextChange?.(e.target.value)}
                spellCheck={false}
                style={{
                    width: "100%",
                    fontSize: "16px",
                    color: theme.palette.text.primary,
                    padding: "12px",
                    resize: "none",
                    lineHeight: 1.6,
                    outline: "none",
                    border: "none",
                    backgroundColor: "transparent",
                }}
                />
            )
            }
      </Box>
    </Paper>
  );
}
