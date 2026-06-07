import { login, register, getMe, logout } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";


export const useAuth = ()  => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    async function handleRegister({ username, email, password }) {
    setLoading(true);
    const data = await register({ username, email, password });
    // ✅ save token
    localStorage.setItem("token", data.token);
    setUser(data.user);
    setLoading(false);

    return true; // useful for navigation
}

    async function handleLogin({ username, email, password }) {
    setLoading(true);
    const data = await login({ username, email, password });
    // ✅ save token
    localStorage.setItem("token", data.token);
    setUser(data.user);
    setLoading(false);

    return true;
}

    async function handleGetMe() {
        setLoading(true);
        const data = await getMe();
        setUser(data.user);
        setLoading(false);
    }

    async function handleLogout() {
    setLoading(true);
    await logout();
    // ✅ remove token
    localStorage.removeItem("token");
    setUser(null);
    setLoading(false);
}

    useEffect(() => {
        handleGetMe();
    }, []);

    return ({
        user, loading, handleRegister, handleLogin, handleLogout, handleGetMe
    })
} 