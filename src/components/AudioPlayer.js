/* Componente for playing audio from a blob */
// Import react hooks
import { useEffect, useState } from "react";

export default function AudioPlayer({audioBlob}){
    const [url, setUrl] = useState(null);

    useEffect(() => {
        if (!audioBlob) {
            setUrl(null);
            return;
        }
        const objectUrl = URL.createObjectURL(audioBlob);
        setUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [audioBlob]);
    return(
        <audio style={{ width: '80%' }} controls src = {url}></audio>
    );
}