import {API_KEY, BASE_URL} from '../config.ts'
import {APIResponse} from '../types/api_data.ts'

// Envoie une requete GET pour récupérer la transcription et/ou l'état du job
export async function getTranscriptionByUuid(
  job_uuid: string,
  signal?: AbortSignal
): Promise<APIResponse> {

  // Vérifie les données manquantes
  if (!job_uuid) throw new Error("Aucun uuid fournit.");
  if (!API_KEY) throw new Error("Aucune API key fournie.");

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}/api/batchTranscription/result?job_uuid=` + job_uuid, {
      headers: { "X-API-KEY": API_KEY },
      signal
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("La requête a été annulée.");
    }

    throw new Error("Impossible de contacter le serveur. Vérifiez votre connexion.");
  }

  if (!response.ok) {
    console.log(response)
    throw new Error(`Erreur lors de la récupération de la transcription`);
  }

  const payload = await response.json();
  return payload;
}