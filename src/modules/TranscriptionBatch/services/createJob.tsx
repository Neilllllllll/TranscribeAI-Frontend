// Envoie un audio et reçois l'id d'un job 
import type { Audio } from "../../../Shared/types/audio.types.ts";
import { API_KEY } from "../config.ts"
import { CreateJobAPIResponse } from '../../../Shared/types/createJobResponse.type.ts'

export async function createJob(
  audio: Audio,
  signal?: AbortSignal
): Promise<CreateJobAPIResponse> {

  // Vérifie si des données sont manquantes
  if (!audio?.blob) throw new Error("Aucun fichier audio fourni.");
  if (!API_KEY) throw new Error("Aucune API key fournie.");

  // Construction du body et du header de la requete
  const headers = new Headers({ "X-API-KEY": API_KEY });
  const audioFile = new File([audio.blob], audio.filename, { type: audio.mimeType });
  const formData = new FormData();
  formData.append("audioFile", audioFile);

  // Envoie de la requete
  const response = await fetch("/api/batchTranscription/createJob", {
    method: "POST",
    headers: headers,
    body: formData,
    signal,
  });

  if (!response.ok) {
    throw new Error("Le serveur est injoignable");
  }

  const payload = await response.json();
  return payload;
}