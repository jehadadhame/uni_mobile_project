import { updateDoc, doc, getDocs, collection, where } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { db } from "./initfirebase";

export const markMessagesAsRead = async (chatId, currentUserId) => {
    const q = collection(db, "chats", chatId, "messages");
    const snapshot = await getDocs(q);

    snapshot.forEach((docSnap) => {
        const msg = docSnap.data();
        if (msg.uid !== currentUserId && !msg.readAt) {
            updateDoc(docSnap.ref, {
                readAt: serverTimestamp(),
                status: "read"
            });
        }
    });
};
