// hooks/useTranscription.ts
import { useState, useEffect } from "react";
import { createJob } from "../services/createJob.tsx";
import { getTranscriptionByUuid } from "../services/getTranscritpion.tsx";
import type { Audio } from "../../../Shared/types/audio.types.ts";
import type { APIResponse } from "../types/api_data.ts";
import { MAXTIMEPROCESSING, TIMEBETTWENEACHPOLLING } from "../config.ts";

interface UseTranscriptionReturn {
  transcriptionPayload: APIResponse | null;
  isLoading: boolean;
  error: string | null;
  statusInfo: string | null;
}

export const useTranscription = (audio: Audio | null) : UseTranscriptionReturn => {
  const [transcriptionPayload, setTranscriptionPayload] = useState<APIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusInfo, setStatusInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!audio) return;

    const controller = new AbortController();
    const signal = controller.signal;
    
    // Reset states
    setIsLoading(true);
    setError(null);
    setTranscriptionPayload(null);
    setStatusInfo(null);

    const pollInterval = Number(TIMEBETTWENEACHPOLLING);
    const maxTime = Number(MAXTIMEPROCESSING);

    const fetchProcess = async () => {
      try {
        // 1. Création du Job
        const jobPayload = await createJob(audio, signal);
        const jobId = jobPayload.data.job_id;
        let attempts = 0;
        const maxAttempts = maxTime / pollInterval;
        let isComplete = false;

        // Attente initiale avant le premier polling
        await new Promise((r) => setTimeout(r, pollInterval));

        // 2. Polling Loop
        while (attempts < maxAttempts-1 && !signal.aborted && !isComplete) {
          const result = await getTranscriptionByUuid(jobId, signal);
          const status = result.status;
          
          if(status === "success") {
            const JobState = result.data.status;
            // Cas où la transcription est terminée
            if (JobState === "COMPLETED") {
              setTranscriptionPayload(result);
              isComplete = true;
            // Cas où la transcription est en échec
            } else if (JobState === "PENDING") {
              setStatusInfo(`En file d'attente (Position: ${result.data.position})`);
            // Cas où la transcription est en cours de traitement
            } else if (JobState === "PROCESSING") {
              setStatusInfo("Traitement audio en cours...");
            } else {
              setStatusInfo("Etat de transcription inconnu");
            }
          }
          else{
            throw new Error("Etat de la tentative de transcription inconnu");
          }

          if (!isComplete) {
            attempts++;
            await new Promise((r) => setTimeout(r, pollInterval));
          }
        }
        
        if (!isComplete && !signal.aborted) {
            setStatusInfo("Délai d'attente dépassé");
        }

      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.log(err.message);
          setError(err.message || "Une erreur inconnue est survenue");
        }
      } finally {
        if (!signal.aborted) setIsLoading(false);
      }
    };

    fetchProcess();

    return () => controller.abort();
  }, [audio]);

  return { transcriptionPayload, isLoading, error, statusInfo };
};