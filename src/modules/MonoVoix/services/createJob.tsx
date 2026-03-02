// Envoie un audio et reçois l'id d'un job 
import type { Audio } from "../../../Shared/types/audio.types.ts";
import { API_KEY } from "../config.ts"
import { BASE_URL } from "../config.ts";
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

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}/api/batchTranscription/createJob`, {
      method: "POST",
      headers,
      body: formData,
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("La requête a été annulée.");
    }

    throw new Error("Impossible de contacter le serveur. Vérifiez votre connexion.");
  }

  if (!response.ok) {
    throw new Error("Le serveur est injoignable");
  }

  const payload = await response.json();
  return payload;
}