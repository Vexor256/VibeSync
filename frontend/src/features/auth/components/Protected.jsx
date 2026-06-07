import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    const { user, loading } = useAuth();

    // ⏳ Loading state
    if (loading) {
        return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
    }

    // 🔐 Not logged in → go to login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // ✅ Authorized
    return children;
};

export default Protected;