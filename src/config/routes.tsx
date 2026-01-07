import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import GroupsIcon from '@mui/icons-material/Groups';
// Pour assurer la cohérence, les id ne doivent pas changer
// La derniere route de fullPath doit être égale à path
export const MODULE_ROUTES = [
  {
    id: 'transcription',
    title: "Transcription Batch",
    description: "Convertissez vos fichiers audio volumineux en texte avec précision.",
    icon: <RecordVoiceOverIcon />,
    path: "transcriptionBatch", // Chemin relatif pour le router
    fullPath: "/app/transcriptionBatch", // Chemin absolu pour la navigation
    color: 'primary.main'
  },
  {
    id: 'diarization',
    title: "Diarization",
    description: "Identifiez automatiquement les différents locuteurs dans une conversation.",
    icon: <GroupsIcon />,
    path: "diarization",
    fullPath: "/app/diarization",
    color: 'secondary.main'
  }
];