import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../utils/firebase/initfirebase"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const auth = getAuth()
    
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid))
            const userToCache = {
                uid: currentUser.uid,
                ...userDoc.data()
            }
            setUser(userToCache)
            console.log("in AuthProvider user : ", user)
        });

        return () => unsub();
    }, []);


    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};
