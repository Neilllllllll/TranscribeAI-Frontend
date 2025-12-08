import CopyButton from './CopyButton.tsx';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { AlertState } from '../types/alert.types.ts';
import { useTheme } from '@mui/material/styles';

type ChildProps = {
  textToDisplay: string | null; 
  onTextChange?: (newText: string) => void;
  setAlert: (alert: AlertState) => void;
};

export default function TranscriptionDisplay({
  textToDisplay,
  onTextChange,
  setAlert,
}: ChildProps) {
  
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

        {/* --- Zone de texte --- */}
        <TextareaAutosize
          value={textToDisplay ?? "Pas de transcription pour le moment"}
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
      </Box>
    </Paper>
  );
}
