import { useSong } from "../hooks/useSong";

export default function Playlist() {
    const { playlist = [], setCurrentIndex, currentIndex } = useSong();

    if (!playlist || playlist.length === 0) {
        return <p>No songs yet. Detect mood 🎯</p>;
    }

    return (
        <div className="playlist">
            {playlist.map((song, index) => (
                <div
                    key={index}
                    className={`playlist__item ${index === currentIndex ? "active" : ""}`}
                    onClick={() => setCurrentIndex(index)}
                >
                    <img src={song.posterUrl} alt={song.title} />
                    <div>
                        <p>{song.title}</p>
                        <span>{song.mood}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}