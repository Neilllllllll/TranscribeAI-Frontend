import { Box, Typography, Stack, TextField, Checkbox, Divider, FormControlLabel } from '@mui/material';
import type { Speaker } from '../types/ui_data.type';
import SpeakerItem from './SpeakerItem.tsx';
import { useState } from 'react';
import { isHigher } from '../utils/isHigher.tsx';
import {useAlert} from '../../../Shared/contexts/AlertContext.tsx'

interface PropsSpeakerManager {
  speakersList: Speaker[];
  onSpeakersChange: (apiSpeakerId: string, selectedProfile: Speaker) => void;
  onMinSpeakersChange: (minSpeakers: number | undefined) => void;
  onMaxSpeakersChange: (maxSpeakers: number | undefined) => void;
  open: boolean;
}

export default function SpeakerManager({ speakersList, onSpeakersChange, onMinSpeakersChange, onMaxSpeakersChange, open }: PropsSpeakerManager) {
  const nbSpeakers = speakersList.length;
  const [localMinSpeaker, setLocalMinSpeaker] = useState<number>(2);
  const [localMaxSpeaker, setLocalMaxSpeaker] = useState<number>(2);
  const [isSpecified, setIsSpecified] = useState<boolean>(true);
  const { showAlert } = useAlert();

  const handleCheckboxChange = () => {
    setIsSpecified(!isSpecified);
    if (!isSpecified) {
      // Si on décoche, on remet à null les valeurs
      onMinSpeakersChange(undefined);
      onMaxSpeakersChange(undefined);
    }
    else{
      onMinSpeakersChange(localMinSpeaker);
      onMaxSpeakersChange(localMaxSpeaker);
    }
  }

  const handleMinSpeakerChange = (value: number) => {
    if (isHigher(value, localMaxSpeaker)) {
      showAlert("Le nombre minimum de locuteurs ne peut pas être supérieur au nombre maximum.", "error");
      return;
    }
    else if (value < 1){
      showAlert("Le nombre minimum de locuteurs doit être au moins de 1.", "error");
      return;
    }
    setLocalMinSpeaker(value);
    onMinSpeakersChange(value);
  };

  const handleMaxSpeakerChange = (value: number) => {
    if (isHigher(localMinSpeaker, value)) {
      showAlert("Le nombre maximum de locuteurs ne peut pas être inférieur au nombre minimum.", "error");
      return;
    }
    else if (value < 1){
      showAlert("Le nombre maximum de locuteurs doit être au moins de 1.", "error");
      return;
    }
    else{
      setLocalMaxSpeaker(value);
      onMaxSpeakersChange(value);
    }
  };

  if (nbSpeakers === 0 && open) {
    return (
      <Box sx={{p:2}}>
        {/* Selection des speakers minimum */}
        <Stack direction='column' spacing={2}>
          <FormControlLabel control={<Checkbox onChange={() => handleCheckboxChange()} checked={!isSpecified} />} label="Spécifier"/>
          <TextField
            label="Locuteur minimum"
            value={localMinSpeaker}
            type="number"
            onChange={(e) => handleMinSpeakerChange(Number(e.target.value))}
            disabled={isSpecified}
          />
          {/* Selection des speakers maximum */}
          <TextField
            label="Locuteur maximum"
            type="number"
            value={localMaxSpeaker}
            onChange={(e) => handleMaxSpeakerChange(Number(e.target.value))}
            disabled={isSpecified}
          />
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, width: '100%', display: 'flex', flexDirection: 'column'}}>
      {open && <Typography sx={{ mb: 2 }}> Nombre de locuteurs : {nbSpeakers} </Typography>}
      {open && 
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Configuration des voix :
      </Typography>}

      <Stack direction="column"
        spacing={2}>
        {speakersList.map((speaker, index) => (
          <SpeakerItem 
            key={speaker.id}
            speaker={speaker}
            index={index}
            onSpeakersChange={onSpeakersChange}
          />
        ))}
      </Stack>
    </Box>
  );
}