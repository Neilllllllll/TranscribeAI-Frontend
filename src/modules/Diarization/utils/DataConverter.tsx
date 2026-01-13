import { BulleTextDiarization } from '../types/ui_data.type';
import { DiarizationResult } from '../types/api_data.types';
import {DiarizationTemplate, Speaker as SpeakerType} from '../types/ui_data.type';

/**
 * Fonction utilitaire pour trouver ou générer un Speaker par défaut
 */
const getSpeakerDetails = (speakerId: string, knownSpeakers: SpeakerType[]): SpeakerType => {
  const found = knownSpeakers.find(s => s.id === speakerId);
  if (found) return found;

  // Fallback si le speaker n'est pas connu (génération dynamique ou placeholder)
  return {
    id: speakerId,
    name: `Interlocuteur ${speakerId}`,
    color: '#ccc', // Gris par défaut
  };
};
// Convertit les données de l'API en format utilisable par l'UI
export const convertApiToUiData = (
  apiResult: DiarizationResult, 
  knownSpeakers: SpeakerType[]
): DiarizationTemplate => {
  const bubbles: BulleTextDiarization[] = [];
  let currentBubble: BulleTextDiarization | null = null;

  apiResult.segments.forEach((segment) => {
    // Cas 1 : C'est le tout premier segment ou le speaker change
    if (!currentBubble || currentBubble.speaker.id !== segment.speaker) {
      // Si une bulle était en cours, on la sauvegarde
      if (currentBubble) {
        bubbles.push(currentBubble);
      }

      // On initie une nouvelle bulle
      currentBubble = {
        speaker: getSpeakerDetails(segment.speaker, knownSpeakers),
        segments: [segment]
      };
    } 
    // Cas 2 : C'est toujours le même speaker
    else {
      currentBubble.segments.push(segment);
    }
  });

  // Ne pas oublier de pousser la dernière bulle
  if (currentBubble) {
    bubbles.push(currentBubble);
  }

  return { textBubbles: bubbles };
};