import { authContext } from "@/context"
import { useContext } from "react"


const useAuth = () => {
    const { isLogin, onLogin, onLogout } = useContext(authContext)

    return (
        { isLogin, onLogin, onLogout }
    )
}

export default useAuth