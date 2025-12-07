import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Login } from "../../screens/auth/login";
import { SignUp } from "../../screens/auth/signup";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Tab = createDrawerNavigator();
export const AuthNavigator = () => {
    console.log("Tabs component rendered");
    return (
        <Tab.Navigator
            screenOptions={(navOpts) => {
                return {
                    tabBarIcon: (tabOpts) => {
                        let iconName = "";

                        switch (navOpts.route.name) {
                            case "Dashboard":
                                iconName = tabOpts.focused ? 'view-dashboard-variant' : 'view-dashboard-variant-outline';
                                break;
                            case "Todos":
                                iconName = tabOpts.focused ? 'invoice-list' : 'invoice-list-outline';
                                break;
                            case "AddPatient":
                                iconName = tabOpts.focused ? 'account-plus' : 'account-plus-outline';
                                break;
                            case "ManagePatients":
                                iconName = tabOpts.focused ? 'account-box-multiple' : 'account-box-multiple-outline';
                                break;
                        };
                        return <MaterialCommunityIcons name={iconName} size={24} />
                    },
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: 'gray',
                    animation: 'shift',
                    headerShown: false
                }
            }}
        >
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="SignUp" component={SignUp} />
        </Tab.Navigator>
    )
}