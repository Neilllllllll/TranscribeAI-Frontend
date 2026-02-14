// hooks/useTranscription.ts
import { useState, useEffect } from "react";
import { createJob } from '../services/createjob.tsx'
import { getDiarizationByUuid } from "../services/getDiarization.tsx";
import type { Audio } from "../../../Shared/types/audio.types.ts";
import type { getStatusAPIResponse } from "../types/api_data.types.ts";
import { MAXTIMEPROCESSING, TIMEBETTWENEACHPOLLING } from "../config.ts";

interface UseDiarizationReturn {
  diarizationPayload: getStatusAPIResponse | null;
  isLoading: boolean;
  error: string | null;
  statusInfo: string | null;
}

export const usePolling = (audio: Audio | null, minSpeakers?: number, maxSpeakers?: number) : UseDiarizationReturn => {
  const [diarizationPayload, setDiarizationPayload] = useState<getStatusAPIResponse | null>(null);
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
    setDiarizationPayload(null);

    const pollInterval = Number(TIMEBETTWENEACHPOLLING);
    const maxTime = Number(MAXTIMEPROCESSING);

    const fetchProcess = async () => {
      try {
        // 1. Création du Job
        const jobPayload = await createJob(audio, minSpeakers, maxSpeakers, signal);

        const jobId = jobPayload.data.job_uuid;
        let attempts = 0;
        const maxAttempts = maxTime / pollInterval;
        let isComplete = false;

        // Attente initiale avant le premier polling
        await new Promise((r) => setTimeout(r, pollInterval));

        // 2. Polling Loop
        while (attempts < maxAttempts && !signal.aborted && !isComplete) {
          const payload = await getDiarizationByUuid(jobId);
          const status = payload.data.status;

          if (status === "COMPLETED") {
            setDiarizationPayload(payload);
            isComplete = true;
          } else if (status === "FAILED") {
            throw new Error(payload.data.error_message || "Échec de la transcription");
          } else if (status === "PENDING") {
             setStatusInfo(`En file d'attente (Position: ${payload.data.position})`);
          } else if (status === "PROCESSING") {
             setStatusInfo("Traitement audio en cours...");
          }

          if (!isComplete) {
            attempts++;
            await new Promise((r) => setTimeout(r, pollInterval));
          }
        }
        
        if (!isComplete && !signal.aborted) {
            throw new Error("Délai d'attente dépassé");
        }

      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || "Une erreur inconnue est survenue");
        }
      } finally {
        if (!signal.aborted) setIsLoading(false);
      }
    };

    fetchProcess();

    return () => controller.abort();
  }, [audio]); // Se relance uniquement si l'objet audio change

  return { diarizationPayload, isLoading, error, statusInfo };
};