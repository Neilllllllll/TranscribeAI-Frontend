import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import GroupsIcon from '@mui/icons-material/Groups';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Module } from './types/module.type.ts';

// Pour assurer la cohérence, les id ne doivent pas changer
// La derniere route de fullPath doit être égale à path
export const MODULE_ROUTES: Module[] = [
  {
    id: 'transcription',
    title: "Mono-voix",
    description: "Convertissez vos fichiers audio volumineux en texte avec précision.",
    icon: <FileDownloadIcon />,
    path: "transcriptionBatch",
    fullPath: "/app/transcriptionBatch",
  },
  {
    id: 'diarization',
    title: "Réunions",
    description: "Identifiez automatiquement les différents locuteurs dans une conversation.",
    icon: <GroupsIcon />,
    path: "diarization",
    fullPath: "/app/diarization",
  },
  {
    id: 'streaming',
    title: "Temps réel",
    description: "Transcrivez l'audio en direct avec une latence minimale pour une expérience fluide.",
    icon: <RecordVoiceOverIcon />,
    path: "streaming",
    fullPath: "/app/streaming",
    enable: false,
  }
];