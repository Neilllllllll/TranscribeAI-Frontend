import { TranscriptionText } from "../types/transcriptionText.types.ts";

// const BASE_URL = import.meta.env.VITE_TRANSCRIPTION_URL ?? process.env.REACT_APP_TRANSCRIPTION_URL;
const BASE_URL = "https://jsonplaceholder.typicode.com/comments";

export async function fetchTranscription(signal?: AbortSignal): Promise<TranscriptionText> {
  if (!BASE_URL) throw new Error("BASE_URL transcription non configurée");

  const res = await fetch(BASE_URL, { method: "GET", signal });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Transcription API error: ${res.status} ${errText}`);
  }

  const body = await res.json();
  return body as TranscriptionText;
}