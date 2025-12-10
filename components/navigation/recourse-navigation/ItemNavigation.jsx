import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ItemsScreen } from "../../../screens/app/items/ItemsScreen";
import { UpdateItem } from "../../../screens/app/items/UpdateItem";
import { AddItem } from "../../../screens/app/items/AddItemScreen";
import { ItemDetails } from "../../../screens/app/items/ItemDetails";

const Stack = createNativeStackNavigator();

export const ItemNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="Items"
            creenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Items" component={ItemsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddItem" component={AddItem} options={{ headerShown: false }} />
            <Stack.Screen name="UpdateItem" component={UpdateItem} options={{ headerShown: false }} />
            <Stack.Screen name="ItemDetails" component={ItemDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}