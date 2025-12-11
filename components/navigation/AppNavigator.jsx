import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, Text, View, Alert } from 'react-native';
import { Home } from '../../screens/app/home';
import { ItemsScreen } from '../../screens/app/items/ItemsScreen';
import { UsersScreen } from '../../screens/app/users/users';
import { ItemNavigation } from './recourse-navigation/ItemNavigation';
import { UpdateItem } from '../../screens/app/items/UpdateItem';
import { getAuth, signOut } from 'firebase/auth';
import { FavoriteItem } from '../../screens/app/items/FavoriteItem';

const Drawer = createDrawerNavigator();
const auth = getAuth();
const onSignOut = () => {
    Alert.alert("LogOut", "are u sure u wanna logout", [
        {
            "text": "Cancel",
            "onPress": () => { console.log("canceld") },
            "style": "cancel"
        },
        {
            "text": "yep",
            "onPress": () => { signOut(auth) },
            "style": "destructive"
        }
    ])
    // signOut(auth);
}
const CustomDrawer = (props) => (
    <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <View style={{ marginVertical: 20, borderTopColor: '#ccc', borderTopWidth: 2 }} />
        <TouchableOpacity onPress={onSignOut} style={{ marginLeft: 20 }}>
            <MaterialCommunityIcons name="logout" size={20} color="#ff4444" />
            <Text>Logout</Text>
        </TouchableOpacity>
    </DrawerContentScrollView>
)

export const AppNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={(navOpts) => {
                return {
                    drawerIcon: () => {
                        let iconName = '';

                        switch (navOpts.route.name) {
                            case "Home":
                                iconName = 'home-outline';
                                break;
                            case "Item":
                                iconName = 'account-box-outline';
                                break;
                            case "TakeImage":
                                iconName = 'camera-outline';
                                break;
                            case "MyLocation":
                                iconName = 'crosshairs-gps';
                                break;
                            case "About":
                                iconName = 'information-box-outline';
                        };
                        return <MaterialCommunityIcons name={iconName} size={24} />
                    },
                    // tabBarActiveTintColor: 'blue',
                    // tabBarInactiveTintColor: 'gray',
                    // animation: 'shift',
                    headerTitle: 'Doctor App'
                }
            }}
        >
            <Drawer.Screen
                name="Home"
                component={Home}
            />

            <Drawer.Screen
                name="ItemsNavigatro"
                component={ItemNavigation}
                options={{
                    title: "Items"
                }}
            />
            <Drawer.Screen
                name='FavoriteItem'
                component={FavoriteItem}
                options={{
                    title: "favorites"
                }}
            />
            <Drawer.Screen
                name="Users"
                component={UsersScreen}
            />
        </Drawer.Navigator >
    )
}
