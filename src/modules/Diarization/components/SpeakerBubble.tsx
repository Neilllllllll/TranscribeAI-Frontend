import { 
  Box, 
  Paper, 
  Typography, 
  Avatar,
  Stack,
  Divider,
  useTheme
} from '@mui/material';
import type { Speaker } from '../types/ui_data.type';
import type { DiarizationSegment } from '../types/api_data.types';

interface SpeakerBubbleProps {
  segments: DiarizationSegment[];
  speaker: Speaker;
  goToTimestamp: (time: number) => void;
  currentTime: number;
  activeSegmentRef: React.RefObject<HTMLSpanElement> | null;
  handleManualEdit?: (objectId: number, segmentId: number, newText: string) => void;
  objectId?: number;
}

export default function SpeakerBubble({ segments, speaker, goToTimestamp, currentTime, activeSegmentRef, handleManualEdit, objectId }: SpeakerBubbleProps) {
  const theme = useTheme();

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        mb: 3, 
        p: 2, 
        borderLeft: `6px solid ${speaker.color}`, // Rappel visuel de la couleur du speaker
        borderRadius: '8px'
      }}
    >
      {/* Header : Infos Speaker + Sélecteur */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar sx={{ bgcolor: speaker.color, width: 32, height: 32, fontSize: '0.875rem' }} />
          <Typography variant="subtitle1" fontWeight="bold" sx={{ color: speaker.color }}>
            {speaker.name}
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 2, opacity: 0.6 }} />

      {/* Contenu : Segments de texte */}
      <Box>
        {segments.map((seg, i) => {
        const isActive = currentTime >= seg.start && currentTime <= seg.end;
        return (
          <Box key={i} 
          ref={isActive ? activeSegmentRef : null} 
          sx={{ 
          display: 'inline', 
          backgroundColor: isActive ? theme.palette.secondary.main : 'transparent',
          wordBreak: 'break-word'
          }} 
          onClick={() => goToTimestamp?.(seg.start)} 
          >
          <span
            spellCheck="false"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleManualEdit ? handleManualEdit(objectId!, i, e.currentTarget.innerText) : null}
          >
            {seg.text + " "}
          </span>
          </Box>
        )})}
      </Box>
    </Paper>
  );
}