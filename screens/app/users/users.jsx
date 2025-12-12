import { collection, getDoc, onSnapshot, query } from "firebase/firestore"
import { db } from "../../../utils/firebase/initfirebase"
import { useEffect, useState } from "react"
import { Text } from "react-native"
import { getAuth } from "firebase/auth"
import { View } from "react-native"
import { UserCard } from "../../../components/screen/users/userCard"
import { AppCollections } from "../../../data/AppCollections"

export const UsersScreen = () => {
    const [users, setUsers] = useState(null)
    const [error, setError] = useState(null)
    const auth = getAuth()

    useEffect(() => {
        console.log("featching users data")
        const q = query(collection(db, AppCollections.users))
        const unsubscripe = onSnapshot(q, (querySnapshot) => {
            const usersData = [];
            querySnapshot.forEach((doc) => {
                usersData.push({ id: doc.id, ...doc.data() });
            });
            console.log("users data : ", usersData)
            setUsers(usersData);
        }, (error) => {
            console.error('Error fetching users:', error);
            Alert.alert('Error', 'Failed to fetch users');
        });
        return () => {
            console.log("featch done")
            unsubscripe();
        }
    }, [])

    return (
        <View>
            <Text>users</Text>
            {users && users.map(user => (
                <UserCard user={user} />
            ))}
            {/* <Text>{users}</Text> */}

        </View>
    )
}