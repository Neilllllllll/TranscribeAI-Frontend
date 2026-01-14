import {DiarizationEnv} from '../../core/config/env.ts'

export const MAXTIMEPROCESSING = DiarizationEnv.MAXTIMEPROCESSING || 3000000; // En millisecondes
export const TIMEBETTWENEACHPOLLING = DiarizationEnv.TIMEBETTWENEACHPOLLING || 3000; // En millisecondes
export const API_KEY = DiarizationEnv.API_KEY || "";
export const MAXSIZEAUDIO = Number(DiarizationEnv.MAXSIZEAUDIO) || 25;
export const MAXSPEAKERS = Number(DiarizationEnv.MAXSPEAKERS) || 10;