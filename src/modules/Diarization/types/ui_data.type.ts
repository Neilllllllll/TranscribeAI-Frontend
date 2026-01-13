// Définitions des types pour les speakers dans la diarization
import { ReactElement } from "react";
// Définition du texte de diarization après traitement
import type { DiarizationSegment } from "./api_data.types";

export interface Speaker {
  id: string;      // Important pour la gestion des listes
  name: string;
  color: string;   // Hexadécimal pour l'associer à la waveform/segments
  icon?: ReactElement; 
}

export const SPEAKER_COLORS = [
  '#1976d2', '#2e7d32', '#ed6c02', '#9c27b0', '#d32f2f', 
  '#0288d1', '#7b1fa2', '#388e3c', '#fbc02d', '#c2185b'
];

export interface BulleTextDiarization {
  segments: DiarizationSegment[];
  speaker: Speaker;
}

export interface DiarizationTemplate {
  textBubbles: BulleTextDiarization[];
}