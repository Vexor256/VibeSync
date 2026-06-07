import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Protected from "./features/auth/components/Protected";
import Home from "./features/home/pages/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" />, // always open login first
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/home",
        element: (
            <Protected>
                <Home />
            </Protected>
        ),
    },
]);