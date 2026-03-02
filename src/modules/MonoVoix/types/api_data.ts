export type JobStatus = "PENDING" | "PROCESSING" | "COMPLETED";

/**
 * Réponse "success" commune
 * Elle contient toujours { status: "success", data: { job_id, status } }
 */
interface BaseSuccessResponse {
  status: "success";
  data: {
    status: JobStatus;
    job_id: string;
  };
}

/**
 * Cas PENDING: data.status="PENDING" + position
 */
export interface PendingResponse extends BaseSuccessResponse {
  data: BaseSuccessResponse["data"] & {
    status: "PENDING";
    position: number;
  };
}

/**
 * Cas PROCESSING: data.status="PROCESSING"
 */
export interface ProcessingResponse extends BaseSuccessResponse {
  data: BaseSuccessResponse["data"] & {
    status: "PROCESSING";
  };
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

/**
 * Cas COMPLETED: data.status="COMPLETED" + result + transcription_time
 */
export interface CompletedResponse extends BaseSuccessResponse {
  data: BaseSuccessResponse["data"] & {
    status: "COMPLETED";
    result: TranscriptionResult;
    transcription_time: number;
  };
}

/**
 * Union discriminante : le discriminant est data.status
 */
export type SuccessAPIResponse =
  | PendingResponse
  | ProcessingResponse
  | CompletedResponse;

/**
 * cas d'erreur : { status: "error" | "FAILED", message: string }
 */
export interface ErrorAPIResponse {
  status: "error" | "FAILED";
  message: string;
}

export type APIResponse = SuccessAPIResponse | ErrorAPIResponse;