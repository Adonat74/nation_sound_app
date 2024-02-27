import { createContext, useState } from "react";

// permet de créer un global state pour toute l'application
const AuthContext = createContext({});

// déstructure children, children représente les composants dans authProvider
export const AuthProvider = ({ children }) => {
    
    // state contenant les informations de l'utilisateur ainsi que le token
    const [auth, setAuth] = useState({});

    return (
        // -------------------valeurs passées au composants children
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;