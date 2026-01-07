import { Box, Paper, Typography, Avatar } from "@mui/material";
import { stringToColor } from "../utils/colorGenerator.tsx";

interface SpeakerBubbleProps {
  text: string;
  speakerName: string;
  startTime?: number; // Optionnel : pour afficher le timestamp
}

export default function SpeakerBubble({ text, speakerName, startTime }: SpeakerBubbleProps) {
  // On détermine si c'est le locuteur principal (ex: SPEAKER_01) pour l'alignement
  const isRight = speakerName.includes("01"); 
  const avatarColor = stringToColor(speakerName);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isRight ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: 1.5,
        mb: 3,
        px: 2,
      }}
    >
      <Avatar 
        sx={{ 
          bgcolor: avatarColor, 
          width: 40, 
          height: 40,
          fontSize: "0.9rem",
          fontWeight: "bold"
        }}
      >
        {speakerName.split('_').pop() || speakerName.charAt(0)}
      </Avatar>

      <Box sx={{ maxWidth: "70%", display: "flex", flexDirection: "column", alignItems: isRight ? "flex-end" : "flex-start" }}>
        {/* Header : Nom + Timestamp */}
        <Typography 
          variant="caption" 
          sx={{ mb: 0.5, color: "text.secondary", fontWeight: 600 }}
        >
          {speakerName} {startTime !== undefined && `• ${startTime}s`}
        </Typography>

        {/* Bulle de texte */}
        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 3,
            borderTopLeftRadius: isRight ? 3 : 0,
            borderTopRightRadius: isRight ? 0 : 3,
            bgcolor: isRight ? "primary.light" : "background.paper",
            color: isRight ? "primary.contrastText" : "text.primary",
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
            {text}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}