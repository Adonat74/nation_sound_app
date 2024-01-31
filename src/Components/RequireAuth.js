import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth () {
    const { auth } = useAuth();
    const location = useLocation();

    // permet 
    return (
         auth?.email
                ? <Outlet />
                : <Navigate to="/mon-compte/connexion" state={{ from: location }} replace />
    );
}
