import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
    const [playlist, setPlaylist] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const song = playlist[currentIndex];

    return (
        <SongContext.Provider
            value={{
                playlist,
                setPlaylist,
                currentIndex,
                setCurrentIndex,
                song,
                loading,
                setLoading
            }}
        >
            {children}
        </SongContext.Provider>
    );
};