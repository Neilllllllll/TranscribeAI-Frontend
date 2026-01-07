export interface TranscriptionSegment {
  start: number;
  end: number;
  speaker: string;
  text: string;
}

// C'est ce qui se trouve dans job.result
export interface DiarizationData {
  language: string;
  segments: TranscriptionSegment[];
}

// C'est l'objet complet retourné par votre API
export interface DiarizationResponse {
  job_id: string;
  status: string;
  result: DiarizationData | null;
  diarization_time: number;
}