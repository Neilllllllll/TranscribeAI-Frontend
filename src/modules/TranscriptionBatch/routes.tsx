import { RouteObject } from "react-router-dom";
import TranscriptionBatchPage from "./TranscriptionBatchPage.tsx"; 
import { MODULE_ROUTES } from "../../config/routes.tsx";

// On récupère la config spécifique à ce module
const transcriptionConfig = MODULE_ROUTES.find(route => route.id === 'transcription');

export const transcriptionRoutes: RouteObject[] = [
  {
    // On utilise le path défini dans la config globale
    path: transcriptionConfig?.path, 
    element: <TranscriptionBatchPage />,
    children: [
        // Les sous-routes éventuels ici
    ]
  }
];