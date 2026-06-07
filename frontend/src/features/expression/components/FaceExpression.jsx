import { useEffect, useRef, useState, useContext } from "react";
import { detect, init } from "../utils/utils";
import { SongContext } from "../../home/song.context";

export default function FaceExpression() {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");
    const { setPlaylist, setCurrentIndex } = useContext(SongContext);

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        // 🔥 detect expression
        const expression = await detect({
            landmarkerRef,
            videoRef,
            setExpression,
        });

        console.log("Detected:", expression);

        if (!expression) return;

        // 🔥 convert expression → mood
        let mood = "neutral";

        if (expression.includes("Happy")) mood = "happy";
        else if (expression.includes("Sad")) mood = "sad";
        else if (expression.includes("Surprised")) mood = "surprised";

        try {
            // 🔥 fetch song from backend
            const res = await fetch(
                `http://localhost:3000/api/songs?mood=${mood}`
            );

            const data = await res.json();
            console.log("Song:", data);

            if (data.songs) {
                setPlaylist(data.songs);
                setCurrentIndex(0);
            } else {
                console.warn("No song found for mood:", mood);
            }
        } catch (err) {
            console.error("Error fetching song:", err);
        }
    }

    return (
        <div style={{ textAlign: "center" }}>
            <video
                ref={videoRef}
                style={{ width: "400px", borderRadius: "12px" }}
                playsInline
            />
            <h2 className="expression">{expression}</h2>
           <button className="detect-btn" onClick={handleClick}>
                🎯 Detect Mood
            </button>
        </div>
    );
}