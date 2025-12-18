import { useEffect, useState, useRef } from "react";
import { View, FlatList, StyleSheet, KeyboardAvoidingView } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { getChatId } from "../../../utils/firebase/getChatId";
import { sendMessage } from "../../../utils/firebase/sendMessage";
import { markMessagesAsRead } from "../../../utils/firebase/markMessagesAsRead";
import { createChatIfNotExist } from "../../../utils/firebase/createChatIfNotExist";
import { useRoute } from "@react-navigation/native";
import { db } from "../../../utils/firebase/initfirebase";

export const ChatScreen = () => {
    const router = useRoute()
    const currentUserId = router.params?.["currentUserId"];
    const otherUserId = router.params?.["otherUserId"]

    const chatId = getChatId(currentUserId, otherUserId);

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const flatListRef = useRef(null);

    useEffect(() => {


        const q = query(
            collection(db, "chats", chatId, "messages"),
            orderBy("sentAt", "asc")
        );

        const unsub = onSnapshot(q, (snap) => {
            const msgs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setMessages(msgs);

            // Scroll
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 50);

            // Mark unread messages as read
            markMessagesAsRead(chatId, currentUserId);
        });

        return () => unsub();
    }, []);

    const handleSend = async () => {
        await createChatIfNotExist(currentUserId, otherUserId);
        if (!text.trim()) return;
        await sendMessage(currentUserId, otherUserId, text);
        setText("");
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 15, paddingBottom: 80 }}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.message,
                            item.uid === currentUserId ? styles.sent : styles.received,
                        ]}
                    >
                        <Text>{item.message}</Text>
                        {item.readAt && item.uid === currentUserId && (
                            <Text style={styles.read}>Read</Text>
                        )}
                    </View>
                )}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    style={{ flex: 1, marginRight: 10 }}
                />
                <Button mode="contained" onPress={handleSend}>Send</Button>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    message: {
        padding: 10,
        borderRadius: 8,
        marginVertical: 6,
        maxWidth: "80%",
    },
    sent: {
        backgroundColor: "#DCF8C6",
        alignSelf: "flex-end",
    },
    received: {
        backgroundColor: "#EEE",
        alignSelf: "flex-start",
    },
    read: {
        fontSize: 10,
        marginTop: 4,
        textAlign: "right",
    },
    inputContainer: {
        flexDirection: "row",
        padding: 10,
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "white",
    },
});
