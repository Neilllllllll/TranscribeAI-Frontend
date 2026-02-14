import { Audio } from '../../../Shared/types/audio.types.ts'
import type {CreateJobAPIResponse} from '../../../Shared/types/createJobResponse.type.ts'
import {API_KEY} from "../config.ts"

export async function createJob(
  audio: Audio,
  minSpeakers?: number,
  maxSpeakers?: number,
  signal?: AbortSignal
): Promise<CreateJobAPIResponse> {

  if (!audio?.blob) throw new Error("Aucun fichier audio fourni.");
  if (!API_KEY) throw new Error("Aucune API key fournie.");
  // Création des headers
  const headers = new Headers({ "X-API-KEY": API_KEY });
  const audioFile = new File([audio.blob], audio.filename, { type: audio.mimeType });
  // Création du form data
  const formData = new FormData();
  formData.append("audioFile", audioFile);

  if(minSpeakers !== null && minSpeakers !== undefined){
    formData.append("min_speakers", minSpeakers.toString());
  }
  if(maxSpeakers !== null && maxSpeakers !== undefined){
    formData.append("max_speakers", maxSpeakers.toString());
  }

  // Envoi de la requête
  const response = await fetch("/api/diarizationTranscription/createJob", {
    method: "POST",
    headers: headers,
    body: formData,
    signal,
  });

  if (!response.ok) throw new Error("Erreur lors de l'envoi");
  const payload = await response.json();
  return payload;
}