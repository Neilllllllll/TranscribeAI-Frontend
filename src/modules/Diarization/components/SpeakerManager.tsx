import type { Speaker } from "../types/ui_data.type.ts";
import { SPEAKER_COLORS } from "../types/ui_data.type.ts";
import { useEffect } from "react";
import {MAXSPEAKERS} from '../config.ts';
import { Box, TextField, Typography, Stack, Avatar } from '@mui/material';

// Gère la création et la modification du tableau de speakers

interface PropsSpeakerManager{
    nbSpeakers: number,
    setNbSpeakers : (nbSpeakers : number) => void,
    setSpeakers : (speakers : Speaker[] | ((prev: Speaker[]) => Speaker[])) => void,
    speakers: Speaker[]
}

export default function SpeakerManager({nbSpeakers, setNbSpeakers, speakers, setSpeakers}: PropsSpeakerManager) {

  // Gestionnaire du changement du nombre
  const handleNbSpeakerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= MAXSPEAKERS) {
      setNbSpeakers(val);
    } else if (event.target.value === "") {
      setNbSpeakers(1);
    }
  };

  // useEffect pour synchroniser le tableau de speakers
  useEffect(() => {
    setSpeakers((prev : Speaker[]) => {
      // 1. Si on augmente le nombre, on ajoute sans supprimer l'existant
      if (nbSpeakers > prev.length) {
        const newSpeakers = [...prev];
        for (let i = prev.length; i < nbSpeakers; i++) {
          newSpeakers.push({
            id: `speaker-${i}`,
            name: `Interlocuteur ${i + 1}`,
            color: SPEAKER_COLORS[i % SPEAKER_COLORS.length],
          });
        }
        return newSpeakers;
      } 
      // 2. Si on diminue, on tronque la fin du tableau
      else {
        return prev.slice(0, nbSpeakers);
      }
    });
  }, [nbSpeakers]);

  // Fonction pour renommer un speaker
  const handleNameChange = (id: string, newName: string) => {
    setSpeakers(speakers.map(s => s.id === id ? { ...s, name: newName } : s));
  };

  return (
    <Box sx={{ p: 2, width: '100%' }}>
      <TextField
        label="Nombre d'interlocuteurs"
        type="number"
        value={nbSpeakers}
        onChange={handleNbSpeakerChange}
        size="small"
        helperText={nbSpeakers >= MAXSPEAKERS ? "Limite atteinte" : ""}
        error={nbSpeakers >= MAXSPEAKERS}
        slotProps={{
          htmlInput: { min: 1, max: MAXSPEAKERS },
          inputLabel: { shrink: true }
        }}
        sx={{ width: '100%', mb: 3 }}
      />

      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Configuration des voix :
      </Typography>

      <Stack spacing={2}>
        {speakers.map((speaker, index) => (
          <Box key={speaker.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar 
              sx={{ 
                bgcolor: speaker.color, 
                width: 32, 
                height: 32, 
                fontSize: '0.8rem' 
              }}
            >
              {index + 1}
            </Avatar>
            
            <TextField
              variant="standard"
              value={speaker.name}
              onChange={(e) => handleNameChange(speaker.id, e.target.value)}
              fullWidth
              slotProps={{
                input: { sx: { fontSize: '0.85rem' } }
              }}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}