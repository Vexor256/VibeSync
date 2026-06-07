import { useRef, useState, useEffect } from "react";
import { useSong } from "../hooks/useSong";
import {
    FaPlay,
    FaPause,
    FaStepForward,
    FaStepBackward,
    FaVolumeUp
} from "react-icons/fa";

export default function Player() {
    const { song, playlist, currentIndex, setCurrentIndex } = useSong();

    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        if (audioRef.current && song?.url) {
            const audio = audioRef.current;

            audio.pause();
            audio.src = song.url;
            audio.load();
            audio.play().catch(() => {});

            setIsPlaying(true);
            setCurrentTime(0);
        }
    }, [song?.url]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (isPlaying) audio.pause();
        else audio.play();
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        if (currentIndex < playlist.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // 🎯 PROGRESS BAR SEEK
    const handleSeek = (e) => {
        const time = e.target.value;
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleVolume = (e) => {
        const vol = e.target.value;
        setVolume(vol);
        audioRef.current.volume = vol;
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60)
            .toString()
            .padStart(2, "0");
        return `${min}:${sec}`;
    };

    if (!song) return null;

    return (
        <div className="player-bar">
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />

            {/* 🎵 LEFT */}
            <div className="player-left">
                <img src={song.posterUrl} alt={song.title} />
                <div>
                    <p>{song.title}</p>
                    <span>{song.mood}</span>
                </div>
            </div>

            {/* 🎯 CENTER */}
            <div className="player-center">

                {/* Controls */}
                <div className="controls">
                    <FaStepBackward onClick={handlePrev} />
                    <button onClick={togglePlay}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <FaStepForward onClick={handleNext} />
                </div>

                {/* 🎵 PROGRESS BAR */}
                <div className="progress">
                    <span>{formatTime(currentTime)}</span>

                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                    />

                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* 🔊 RIGHT */}
            <div className="player-right">
                <FaVolumeUp />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolume}
                />
            </div>
        </div>
    );
}