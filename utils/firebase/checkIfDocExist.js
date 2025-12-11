import { getDoc } from "firebase/firestore"

export const checkIfDocExists = async (documentRef) => {
    const snapshot = await getDoc(documentRef)
    return snapshot.exists()
}