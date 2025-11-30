/* Componente for playing audio from an Audio */
// Import react hooks
import { useEffect, useState } from "react";
// Import types
import { Audio } from "../types/audio.types.ts";

export default function AudioPlayer({ audio }: { audio: Audio | null }) {
    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        if (!audio?.blob) {
            setUrl("");
            return;
        }
        const objectUrl = URL.createObjectURL(audio.blob);
        setUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [audio?.blob]);
    return(
        <audio style={{ width: '80%' }} controls src = {url}></audio>
    );
}