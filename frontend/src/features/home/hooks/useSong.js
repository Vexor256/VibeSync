import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

export const useSong = () => {
    const context = useContext(SongContext);

    const {
        playlist,
        setPlaylist,
        currentIndex,
        setCurrentIndex,
        song,
        loading,
        setLoading
    } = context;

    async function handleGetSong({ mood }) {
        setLoading(true);

        const data = await getSong({ mood });

        // ✅ FIX: use playlist instead of single song
        if (data.songs) {
            setPlaylist(data.songs);
            setCurrentIndex(0); // first song auto play
        }

        setLoading(false);
    }

    return {
        loading,
        song,
        playlist,
        currentIndex,
        setCurrentIndex,
        handleGetSong
    };
};