import { Paper, Box, Typography } from "@mui/material";
import type { DiarizationTemplate } from "../types/ui_data.type";
import SpeakerBubble from "./SpeakerBubble.tsx";
import type { Speaker } from "../types/ui_data.type";
import { useEffect, useRef } from "react";

interface TextBoxProps {
  template: DiarizationTemplate;
  onAssignSpeaker: (apiSpeakerId: string, selectedProfile: Speaker) => void;
  availableProfiles: Speaker[];
  currentTime: number;
  gotoTimestamp: (time: number) => void;
  handleManualEdit: (id: number, newText: string) => void;
}

export default function TextBox({ template, onAssignSpeaker, availableProfiles, currentTime, gotoTimestamp, handleManualEdit }: TextBoxProps) {
  const activeSegmentRef = useRef<HTMLSpanElement>(null);

  // 2. Scroll automatique vers le segment actif
  useEffect(() => {
    if (activeSegmentRef.current) {
      activeSegmentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentTime]);

  return (
    <Paper elevation={0} sx={{ width: "100%", height: "70vh", p: 2, 'display': "flex", "flexDirection": "column"}}>
      <Box sx={{ height: "95%", overflowY: "auto" }}>
        {template.textBubbles.length === 0 ? 
        <Typography>Votre transcription s'affichera ici... </Typography> :
        template.textBubbles.map((bubble, index) => (
          // Utiliser une clé unique combinant index et ID speaker pour la stabilité React
          <SpeakerBubble 
            key={`${bubble.speaker.id}-${index}`} 
            bubble={bubble} 
            onAssignSpeaker={onAssignSpeaker}
            availableProfiles={availableProfiles}
            currentTime={currentTime}
            activeSegmentRef={activeSegmentRef}
            goToTimestamp={gotoTimestamp}
            handleManualEdit={handleManualEdit}
          />))
        }
      </Box>
    </Paper>
  );
}