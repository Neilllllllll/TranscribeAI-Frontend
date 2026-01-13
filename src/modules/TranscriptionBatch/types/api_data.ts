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

export interface TranscriptionSegment {
  id: number;
  start: number;
  end: number;
  text: string;
}

export interface TranscriptionResult {
  full_text: string;
  language: string;
  segments: TranscriptionSegment[];
}

interface CompletedData extends BaseJobData {
  status: "COMPLETED";
  result: TranscriptionResult; 
  transcription_time: number;
}

interface FailedData extends BaseJobData {
  status: "FAILED";
  error_message?: string;
}

// L'Union Discriminante : Le type final
export type TranscriptionJobData = 
  | PendingData 
  | ProcessingData 
  | CompletedData 
  | FailedData;

export interface getStatusAPIResponse {
  status: "success" | "error";
  data: TranscriptionJobData;
}