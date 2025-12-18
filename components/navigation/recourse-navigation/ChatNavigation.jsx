import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatScreen } from "../../screen/chat/ChatScreen";
import { Chats } from "../../screen/chat/Chats";

const Stack = createNativeStackNavigator();

export const ChatNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="Chats"
            creenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Chats" component={Chats} options={{ headerShown: false }} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}