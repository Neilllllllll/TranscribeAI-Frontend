/* Componente for playing audio from an Audio */
// Import react hooks
import { useEffect, useState, forwardRef } from "react";
// Import types
import { Audio } from "../types/audio.types.ts";

interface Props {
    audio: Audio | null,
    setCurrentTime: (currentTime: number) => void,
}

const AudioPlayer = forwardRef<HTMLAudioElement, Props>(({ audio, setCurrentTime }, ref) => {
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!audio?.blob) {
            setUrl(null);
            return;
        }
        const objectUrl = URL.createObjectURL(audio.blob);
        setUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [audio?.blob]);

    return (
        <audio 
            style={{ width: '80%' }} 
            ref={ref} // On passe un ref défini par le parent
            controls 
            src={url ?? undefined} 
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        />
    );
});

export default AudioPlayer;