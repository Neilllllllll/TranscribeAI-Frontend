import type {TranscriptionSegment} from '../types/api_data.ts'

export const fullText = (segments : TranscriptionSegment[]) => {
    return segments.map(s => s.text).join('');
}