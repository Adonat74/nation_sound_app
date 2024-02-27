import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth () {
    const { auth } = useAuth();
    // garde la trace de l'URL initiale.
    const location = useLocation();

    return (
         auth?.email
                ? <Outlet />// Bloque la navigation à tous les composants nestés dans le composant requireAuth lui même se trouvant dans App.

                // Redirige vers la page connexion si non authentifiés. Et redirige une fois connecté vers la page demandée initiale.
                : <Navigate to="/mon-compte/connexion" state={{ from: location }} replace />
    );
}
