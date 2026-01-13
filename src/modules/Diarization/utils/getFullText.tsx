import type {DiarizationTemplate} from "../types/ui_data.type.ts";
// Fonction pour obtenir le texte complet à partir de la structure de diarization
export const fullText = (param: DiarizationTemplate): string => {
    let text = '';
    for (const bulle of param.textBubbles) {
        text += `\n[${bulle.speaker.name}]: \n`;
        for (const segment of bulle.segments) {
            text += segment.text + ' ';
        }
    }
    console.log ("Full text generated:", text);
    return text.trim();
};