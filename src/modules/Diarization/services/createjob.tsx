import { Audio } from '../../../Shared/types/audio.types.ts'
import type {CreateJobAPIResponse} from '../../../Shared/types/createJobResponse.type.ts'
import {API_KEY} from "../config.ts"

export async function createJob(
  audio: Audio,
  signal?: AbortSignal
): Promise<CreateJobAPIResponse> {

  if (!audio?.blob) throw new Error("Aucun fichier audio fourni.");
  if (!API_KEY) throw new Error("Aucune API key fournie.");

  const headers = new Headers({ "X-API-KEY": API_KEY });
  const audioFile = new File([audio.blob], audio.filename, { type: audio.mimeType });
  const formData = new FormData();
  formData.append("audioFile", audioFile);

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