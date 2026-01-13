import { 
  Box, 
  Paper, 
  Typography, 
  Avatar, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Stack,
  Divider,
  SelectChangeEvent,
  useTheme
} from '@mui/material';
import type { Speaker, BulleTextDiarization } from '../types/ui_data.type';

interface SpeakerBubbleProps {
  bubble: BulleTextDiarization;
  onAssignSpeaker: (apiId: string, profile: Speaker) => void;
  goToTimestamp: (time: number) => void;
  availableProfiles: Speaker[];
  currentTime: number;
  activeSegmentRef: React.RefObject<HTMLSpanElement> | null;
  handleManualEdit: (id: number, newText: string) => void;
}

export default function SpeakerBubble({ bubble, onAssignSpeaker, availableProfiles, currentTime, activeSegmentRef, goToTimestamp, handleManualEdit }: SpeakerBubbleProps) {
  const { speaker, segments } = bubble;
  const theme = useTheme();
  const handleChange = (event: SelectChangeEvent) => {
    const selectedProfileId = event.target.value;
    const profile = availableProfiles.find(p => p.id === selectedProfileId);
    if (profile) {
      onAssignSpeaker(speaker.id, profile);
    }
  };

  // Helper pour extraire les initiales si pas d'icône
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

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
          <Avatar 
            sx={{ bgcolor: speaker.color, width: 32, height: 32, fontSize: '0.875rem' }}
          >
            {speaker.icon ? speaker.icon : getInitials(speaker.name)}
          </Avatar>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ color: speaker.color }}>
            {speaker.name}
          </Typography>
        </Stack>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id={`select-speaker-${speaker.id}`}>Changer le locuteur</InputLabel>
          <Select
            labelId={`select-speaker-${speaker.id}`}
            value="" // On le laisse vide pour forcer l'action de changement
            label="Changer le locuteur"
            onChange={handleChange}
          >
            {availableProfiles.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                <Stack direction="row" alignItems="center" spacing={1} width={"100%"}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: p.color }} />
                  <Typography variant="body2">{p.name}</Typography>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          backgroundColor: isActive ? theme.palette.text.highlight : 'transparent',
          wordBreak: 'break-word'
          }} 
          onClick={() => goToTimestamp?.(seg.start)} 
          >
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleManualEdit(i, e.currentTarget.innerText)}
          >
            {seg.text + " "}
          </span>
          </Box>
        )})}
      </Box>
    </Paper>
  );
}