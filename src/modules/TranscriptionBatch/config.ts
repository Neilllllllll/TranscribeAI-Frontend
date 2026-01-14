import {BatchTranscriptionEnv} from '../../core/config/env.ts'

export const MAXTIMEPROCESSING = BatchTranscriptionEnv.MAXTIMEPROCESSING || 3000000;
export const TIMEBETTWENEACHPOLLING = BatchTranscriptionEnv.TIMEBETTWENEACHPOLLING || 3000;
export const API_KEY = BatchTranscriptionEnv.API_KEY || "";
export const MAXSIZEAUDIO = Number(BatchTranscriptionEnv.MAXSIZEAUDIO) || 15;