import { AppNavigator } from "./AppNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../../context/AppContext";

export const MainNavigation = () => {
    const { user } = useAuth();

    console.log("in Main Navigator user : ", user?.email)
    return (
        <NavigationContainer>
            {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}