import { authContext } from "@/context";
import { useEffect, useState } from "react";

const AuthPrivider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if(window !== undefined) {
            const auth = localStorage.getItem("auth");
            if(auth) {
                setIsLogin(true);
            }
        }
    }
    , []);

    const onLogin = () => {
        setIsLogin(true);
        localStorage.setItem("auth", true);
    };

    const onLogout = () => {
        setIsLogin(false);
        localStorage.removeItem("auth");
    };

    return (
        <authContext.Provider value={{ isLogin, onLogin, onLogout }}>
            {children}
        </authContext.Provider>
    );
}

export default AuthPrivider;