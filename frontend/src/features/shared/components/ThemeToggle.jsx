import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(true);

    useEffect(() => {
        document.body.classList.toggle("light", !dark);
    }, [dark]);

    return (
        <button
            className={`theme-toggle ${dark ? "dark" : "light"}`}
            onClick={() => setDark(!dark)}
        >
            <div className="toggle-circle">
                {dark ? "🌙" : "☀️"}
            </div>
        </button>
    );
}