import { Paper, Box, Typography } from "@mui/material";
import type { DiarizationState } from "../types/ui_data.type";
import SpeakerBubble from "./SpeakerBubble.tsx";
import { useEffect, useRef } from "react";
import DeleteButton from "../../../Shared/components/DeleteButton.tsx";
import CopyButton from "../../../Shared/components/CopyButton.tsx";
import { fullText } from "../utils/getFullText.tsx";

interface TextBoxProps {
  diarizationData: DiarizationState;
  currentTime: number;
  gotoTimestamp: (time: number) => void;
  handleManualEdit: (objectId: number, segmentId: number, newText: string) => void;
  onDelete: () => void;
}

export default function TextBox({ diarizationData, currentTime, gotoTimestamp, handleManualEdit, onDelete }: TextBoxProps) {
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
    <Paper 
      elevation={0} 
      sx={{ 
        width: "100%", 
        flex: 1,
        minHeight: 0,
        p: 2, 
        display: "flex", 
        flexDirection: "column"
      }}>
      <Box sx ={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <CopyButton textToCopy={fullText(diarizationData)}></CopyButton>
        <DeleteButton onDelete={onDelete} />
      </Box>
      <Box sx={{ 
        flex: 1,      // Prend tout l'espace du Paper
        overflowY: "auto",
        pr: 1         // Petit padding pour la scrollbar
      }}>
        {diarizationData.conversationFlow.length === 0 ? 
        <Typography>Votre transcription s'affichera ici... </Typography> :
        diarizationData.conversationFlow.map((bubble, index) => (
          // Utiliser une clé unique combinant index et ID speaker pour la stabilité React
          <SpeakerBubble 
            key={`${bubble.speakerId}-${index}`} 
            segments={bubble.segments} 
            speaker={diarizationData.speakersById[bubble.speakerId]}
            currentTime={currentTime}
            handleManualEdit={handleManualEdit}
            objectId={index}
            activeSegmentRef={activeSegmentRef}
            goToTimestamp={gotoTimestamp}
          />))
        }
      </Box>
    </Paper>
  );
}