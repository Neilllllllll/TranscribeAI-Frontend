import { useEffect, useRef } from 'react';
import CopyButton from '../../../Shared/components/CopyButton.tsx';
import DeleteButton from '../../../Shared/components/DeleteButton.tsx';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TranscriptionSegment } from '../types/api_data.ts';
import { useTheme } from '@mui/material/styles';
import { fullText } from '../utils/getText.tsx';

interface Props {
  segments: TranscriptionSegment[] | null;
  currentTime: number;
  goToTimestamp?: (time: number) => void;
  onSegmentChange: (id: number, newText: string) => void;
  onDelete: () => void;
}

export default function TextBox({ segments, currentTime, goToTimestamp, onSegmentChange, onDelete }: Props) {
  // 1. On stocke les segments dans un état local pour permettre l'édition
  const activeSegmentRef = useRef<HTMLSpanElement>(null);
  const theme = useTheme();

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
    <Paper elevation={0}       
      sx={{ 
        width: "100%", 
        flex: 1,
        minHeight: 0,
        p: 2, 
        display: "flex", 
        flexDirection: "column"
      }}>
      <Box sx ={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <CopyButton textToCopy={fullText(segments ?? [])}></CopyButton>
        <DeleteButton onDelete={onDelete} />
      </Box>

      <Box sx={{ height: "95%", overflowY: "auto", flexWrap: "wrap"}}>
        {(!segments || segments.length === 0) ? <Typography>Votre transcription s'affichera ici ...</Typography> : null}
        {segments?.map((segment) => {
          const isActive = currentTime >= segment.start && currentTime <= segment.end;

          return (
            <Box
              key={segment.id}
              ref={isActive ? activeSegmentRef : null}
              component="span"
              onClick={() => goToTimestamp?.(segment.start)}
              sx={{
                display: 'inline', 
                backgroundColor: isActive ? theme.palette.secondary.main : 'transparent',
                wordBreak: 'break-word'
              }}
            >
              <span
                spellCheck="false"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onSegmentChange(segment.id, e.currentTarget.innerText)}
              >
                {segment.text + " "}
              </span>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}