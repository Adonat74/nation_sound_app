import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// Ce hook permet d'alléger le code en exportant le context: authProvider dans les composant qui en ont besoin: mon compte, connexion, modifier, requireAuth, la programmation et dans les menus.
export default function useAuth() {
    return useContext(AuthContext);
}
