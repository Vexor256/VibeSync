import FaceExpression from "../../expression/components/FaceExpression";
import Playlist from "../components/Playlist";
import Player from "../components/Player";
import ThemeToggle from "../../shared/components/ThemeToggle";
import "../style/home.scss";

export default function Home() {
    return (
        <div className="home">

            {/* Top bar */}
            <div className="home__top">
                <h1>🎧 VibeSync</h1>
                <ThemeToggle />
            </div>

            {/* Main layout */}
            <div className="home__main">

                {/* Left: Camera */}
                <div className="home__left">
                    <FaceExpression />
                </div>

                {/* Right: Playlist */}
                <div className="home__right">
                    <h2>Playlist</h2>
                    <Playlist />
                </div>

            </div>

            {/* Bottom Player */}
            <Player />

        </div>
    );
}