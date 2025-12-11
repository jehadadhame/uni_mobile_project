import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../utils/firebase/initfirebase"
import { User } from "../data/users/User"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const auth = getAuth()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid))
            const userToCache = new User({
                uid: currentUser.uid,
                name: userDoc.data().name,
                email: userDoc.data().email,
                role: userDoc.data().role,
                createdAt: userDoc.data().createdAt
            })
            setUser(userToCache)
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
