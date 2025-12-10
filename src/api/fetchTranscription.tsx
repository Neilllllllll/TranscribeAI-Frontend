import type { Audio } from "../types/audio.types.ts";
const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

// Send an audio file and get the text back
export async function postAudio(
  audio: Audio,
  signal?: AbortSignal
): Promise<string> {
  if (!API_URL) {
    throw new Error("BASE_URL transcription non configurée");
    
  }

  if (!audio?.blob) {
    throw new Error("Aucun fichier audio fourni à la fonction postAudio.");
  }

  if(!API_KEY){
    throw new Error("Aucune key fourni");
  }

  
  const header = new Headers();
  header.append("X-API-KEY", API_KEY);
  
  // Create a File object
  const audioFile = new File([audio.blob], audio.filename, { type: audio.mimeType });

  // Body with the file audio
  const formData = new FormData();
  formData.append("audioFile", audioFile);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: header,
    body: formData,
    signal,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Transcription API error: ${response.status} ${errText}`);
  }

  const transcription = await response.json();
  return transcription.data.text as string;
}
