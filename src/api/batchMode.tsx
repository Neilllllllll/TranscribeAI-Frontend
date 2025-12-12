import type { Audio } from "../types/audio.types.ts";
import {API_BASE_URL, API_KEY} from "../config.ts"

type PostAudioResult = {
  ws: WebSocket;
  job_id: string;
};

// Envoie une requete POST et return une connection web socket + un identifiant
export async function postAudio(
  audio: Audio,
  signal?: AbortSignal
): Promise<PostAudioResult> {

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
  const response = await fetch(`${API_BASE_URL}/batchTranscription/connexion`, {
    method: "POST",
    headers: headers,
    body: formData,
    signal,
  });

  if (!response.ok) {
    throw new Error(`Erreur transcription: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  const token = payload.data.token;
  const job_id = payload.data.job_id;

  // Créer une connection websocket
  const wsUrl = API_BASE_URL.replace(/^http/, "ws") + `/?token=${token}`;
  const ws = new WebSocket(wsUrl);
  return { ws, job_id };
}

// Envoie une requete GET pour récupérer la transcription
export async function getTranscription(
  job_id: string
): Promise<string | null> {

  // Vérifie les données manquantes
  if (!API_BASE_URL) throw new Error("BASE_URL transcription non configurée");
  if (!job_id) throw new Error("Aucun fichier audio fourni.");
  if (!API_KEY) throw new Error("Aucune API key fournie.");

  const response = await fetch(`${API_BASE_URL}/batchTranscription/delete/${job_id}`, {
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

  const response = await fetch(`${API_BASE_URL}/batchTranscription/delete/${job_id}`, {
    headers: { "X-API-KEY": API_KEY }
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération de la transcription: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  const transcription = payload.data.message;
  return transcription;
}
