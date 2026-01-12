import type {TranscriptionSegment} from '../types/getterSchema.ts'

export const fullText = (segments : TranscriptionSegment[]) => {
    return segments.map(s => s.text).join(' ');
}