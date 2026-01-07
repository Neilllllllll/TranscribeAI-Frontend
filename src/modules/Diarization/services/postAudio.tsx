
import { Audio } from '../../Shared/types/audio.types.ts'

import {API_KEY} from "../config.ts"
export async function createJob(
  audio: Audio,
  signal?: AbortSignal
): Promise<string> {

  if (!audio?.blob) throw new Error("Aucun fichier audio fourni.");
  if (!API_KEY) throw new Error("Aucune API key fournie.");
    
  const headers = new Headers({ "X-API-KEY": API_KEY });
  const formData = new FormData();
  formData.append("audioFile", new File([audio.blob], audio.filename));

  const response = await fetch("/api/diarizationTranscription/createJob", {
    method: "POST",
    headers: headers,
    body: formData,
    signal,
  });

  if (!response.ok) throw new Error("Erreur lors de l'envoi");
  const payload = await response.json();
  return payload.data.job_uuid;
}