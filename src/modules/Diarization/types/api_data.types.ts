// Définitions des types pour la réponse de l'API de diarization
export type JobStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

// Base commune à toutes les réponses
interface BaseJobData {
  data:{
    status: JobStatus,
    job_id: string
  }
}

// Cas spécifiques
interface PendingData extends BaseJobData {
  status: "PENDING";
  position: number;
}

interface ProcessingData extends BaseJobData {
  status: "PROCESSING";
}

export interface DiarizationSegment {
  start: number;
  end: number;
  speaker: string;
  text: string;
}

// C'est ce qui se trouve dans job.result
export interface DiarizationResult {
  language: string;
  segments: DiarizationSegment[];
}

interface CompletedData extends BaseJobData {
  status: "COMPLETED";
  result: DiarizationResult; 
  diarization_time: number;
}

interface FailedData extends BaseJobData {
  status: "FAILED";
  error_message?: string;
}

// L'Union Discriminante : Le type final
export type DiarizationJobData = 
  | PendingData 
  | ProcessingData 
  | CompletedData 
  | FailedData;

// C'est l'objet complet retourné par votre API
export interface getStatusAPIResponse {
  status: "succes" | "error";
  data: DiarizationJobData;
}