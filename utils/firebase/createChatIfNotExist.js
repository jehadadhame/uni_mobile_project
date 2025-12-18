import { doc, setDoc } from "firebase/firestore";
import { db } from "./initfirebase";
import { getChatId } from "./getChatId";
import { AppCollections } from "../../data/AppCollections";

export const createChatIfNotExist = async (currentUserId, otherUserId) => {
    const chatId = getChatId(currentUserId, otherUserId);
    console.log("create chat with id : ", chatId);
    try {
        await setDoc(doc(db, AppCollections.chats, chatId), {
            updatedAt: new Date(),
            participants: [currentUserId, otherUserId],
        }, {
            merge: true
        })
    } catch (e) {
        console.log(e);
    }
};