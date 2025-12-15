import type { Audio } from "../types/audio.types.ts";
import {API_BASE_URL, API_KEY} from "../config.ts"

// Envoie une requete POST et return un identifiant
export async function createJob(
  audio: Audio,
  signal?: AbortSignal
): Promise<string> {

  // Vérifie si des données sont manquantes
  if (!API_BASE_URL) throw new Error("BASE_URL transcription non configurée");
  if (!audio?.blob) throw new Error("Aucun fichier audio fourni.");
  if (!API_KEY) throw new Error("Aucune API key fournie.");

  // Construction du body et du header de la requete
  const headers = new Headers({ "X-API-KEY": API_KEY });
  const audioFile = new File([audio.blob], audio.filename, { type: audio.mimeType });
  const formData = new FormData();
  formData.append("audioFile", audioFile);

  // Envoie de la requete
  const response = await fetch(`${API_BASE_URL}/api/batchTranscription/createJob`, {
    method: "POST",
    headers: headers,
    body: formData,
    signal,
  });

  if (!response.ok) {
    throw new Error(`Erreur transcription: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  const job_uuid = payload.data.job_uuid;
  
  return job_uuid;
}

// Envoie une requete GET pour récupérer la transcription
export async function getTranscriptionByUuid(
  job_uuid: string
): Promise<string> {

  // Vérifie les données manquantes
  if (!API_BASE_URL) throw new Error("BASE_URL transcription non configurée");
  if (!job_uuid) throw new Error("Aucun uuid fournit.");
  if (!API_KEY) throw new Error("Aucune API key fournie.");

  const response = await fetch(`${API_BASE_URL}/api/batchTranscription/result?job_uuid=${job_uuid}`, {
    headers: { "X-API-KEY": API_KEY }
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération de la transcription: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  const transcription = payload.data.transcription;
  return transcription;
}

// Envoie une requete DELETE pour annuler une transcription
export async function deleteTranscription(
  job_id: string
): Promise<string> {

  // Vérifie les données manquantes
  if (!API_BASE_URL) throw new Error("BASE_URL transcription non configurée");
  if (!job_id) throw new Error("Aucun fichier audio fourni.");
  if (!API_KEY) throw new Error("Aucune API key fournie.");

  const response = await fetch(`${API_BASE_URL}/api/batchTranscription/delete/${job_id}`, {
    headers: { "X-API-KEY": API_KEY }
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération de la transcription: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  const transcription = payload.data.message;
  return transcription;
}
