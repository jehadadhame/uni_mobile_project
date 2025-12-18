import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getChatId } from "./getChatId";
import { db } from "./initfirebase";

export const sendMessage = async (currentUserId, otherUserId, text) => {
    try {
        const chatId = getChatId(currentUserId, otherUserId);
        const res = await addDoc(collection(db, "chats", chatId, "messages"), {
            uid: currentUserId,
            message: text,
            sentAt: serverTimestamp(),
            readAt: null,
            status: "sent",
        });
        console.log(res.id)
    } catch (e) {
        console.log(e)
    }
};
