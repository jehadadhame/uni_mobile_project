import { getAuth, onAuthStateChanged } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)
export const AuthProvider = ({ childern }) => {
    const [user, setUser] = useState(null)
    const auth = getAuth()

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        console.log("in AutheProvoider unsub return : ", unsub())
        return () => unsub();
    }, [])

    return (
        <AuthContext.Provider value={user}>
            {{ children }}
        </AuthContext.Provider>
    )

}

export const useAuth = useContext(AuthContext); 