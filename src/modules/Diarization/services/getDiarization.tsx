import {API_KEY} from '../config.ts'
import { DiarizationData } from '../types/diarization.types.tsx';

// Envoie une requete GET pour récupérer la transcription
export async function getDiarizationByUuid(
  job_uuid: string,
  signal: AbortSignal
): Promise<DiarizationData> {

  // Vérifie les données manquantes
  if (!job_uuid) throw new Error("Aucun uuid fournit.");
  if (!API_KEY) throw new Error("Aucune API key fournie.");

  const response = await fetch("/api/diarizationTranscription/result?job_uuid=" + job_uuid, {
    headers: { "X-API-KEY": API_KEY }
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération de la transcription: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  return payload.data.result;
}