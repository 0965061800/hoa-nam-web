import { ISuccesUser } from "@/features/Auth/types/user";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

interface AuthContextType {
    userName: string | null;
    token: string | null;
    roles: string | null;
    login: (user: ISuccesUser) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps { children: ReactNode;}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [userName, setUserName] = useLocalStorage("username", null);
    const [token, setToken] = useLocalStorage("token", null);
    const [roles, setUserRoles] = useLocalStorage("roles", null);

    const navigate = useNavigate();
    const login = async (user: ISuccesUser) => {
        setToken(user.token);
        setUserName(user.username)
        setUserRoles(user.roles);
        navigate("/");
    }

    const logout = async () => {
        setToken(null);
        setUserName(null)
        setUserRoles(null);
        navigate("/");
    }

    const value = useMemo(() => ({
        userName,
        token,
        roles,
        login,
        logout
    }),[userName,token,roles])
    return (
        <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}