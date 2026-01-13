import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import GroupsIcon from '@mui/icons-material/Groups';
import { Module } from './types/module.type.ts';

// Pour assurer la cohérence, les id ne doivent pas changer
// La derniere route de fullPath doit être égale à path
export const MODULE_ROUTES: Module[] = [
  {
    id: 'transcription',
    title: "Mono-voix",
    description: "Convertissez vos fichiers audio volumineux en texte avec précision.",
    icon: <RecordVoiceOverIcon />,
    path: "transcriptionBatch",
    fullPath: "/app/transcriptionBatch",
    color: 'primary.main'
  },
  {
    id: 'diarization',
    title: "Multi-voix",
    description: "Identifiez automatiquement les différents locuteurs dans une conversation.",
    icon: <GroupsIcon />,
    path: "diarization",
    fullPath: "/app/diarization",
    color: 'secondary.main'
  }
];