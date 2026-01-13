import {DiarizationEnv} from '../../core/config/env.ts'

export const MAXTIMEPROCESSING = DiarizationEnv.MAXTIMEPROCESSING;
export const TIMEBETTWENEACHPOLLING = DiarizationEnv.TIMEBETTWENEACHPOLLING;
export const API_KEY = DiarizationEnv.API_KEY;
export const MAXSIZEAUDIO = Number(DiarizationEnv.MAXSIZEAUDIO) || 25;
export const MAXSPEAKERS = Number(DiarizationEnv.MAXSPEAKERS) || 10;