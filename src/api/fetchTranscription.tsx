// const BASE_URL = import.meta.env.VITE_TRANSCRIPTION_URL ?? process.env.REACT_APP_TRANSCRIPTION_URL;
const BASE_URL = "https://jsonplaceholder.typicode.com/comments";

export async function fetchTranscription(signal?: AbortSignal): Promise<string> {
  if (!BASE_URL) throw new Error("BASE_URL transcription non configurée");

  const res = await fetch(BASE_URL, { method: "GET", signal });
  console.log(res);

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Transcription API error: ${res.status} ${errText}`);
  }

  const body = "bonjour ceci est une transcription d'essai";
  return body as string;
}