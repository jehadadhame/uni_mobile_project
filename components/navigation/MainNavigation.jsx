import { View } from "react-native-web"
import { useAuth } from "../../context/AppContext"
import { AppNavigator } from "./AppNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";

export const MainNavigation = () => {
    const { user } = useAuth();
    console.log("in Navigator user : ", user?.email)
    return (
        <NavigationContainer>
            {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}