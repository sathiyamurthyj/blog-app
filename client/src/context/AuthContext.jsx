import { useContext } from "react";
import { useState, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
    }
    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{user, login, logout, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = ()=>useContext(AuthContext);
export default AuthProvider;