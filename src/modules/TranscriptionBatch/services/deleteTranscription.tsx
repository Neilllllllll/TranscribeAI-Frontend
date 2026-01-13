import { API_KEY } from "../config";

// Envoie une requete DELETE pour annuler une transcription
export async function deleteTranscription(
  job_id: string
): Promise<string> {

  // Vérifie les données manquantes
  if (!job_id) throw new Error("Aucun fichier audio fourni.");
  if (!API_KEY) throw new Error("Aucune API key fournie.");

  const response = await fetch("/api/batchTranscription/delete/${job_id}", {
    headers: { "X-API-KEY": API_KEY }
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération de la transcription: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  const transcription = payload.data.message;
  return transcription;
}
