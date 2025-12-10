import { useNavigation } from "@react-navigation/native"
import { collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Button, ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { db } from "../../../utils/firebase/initfirebase"
import { ItemCard } from "../../../components/screen/items/ItemCard"
import { useAuth } from "../../../context/AppContext"
export const ItemsScreen = () => {
    const { user } = useAuth();
    console.log("user : ", user)

    console.log("rendering ItemScreen ")
    const navigation = useNavigation()
    const [items, setItems] = useState(null)

    useEffect(() => {
        if (user.role == "Buyer") {// TODO: use enum value?
            const q = query(collection(db, "items"))
            const unsub = onSnapshot(q, (snap) => {
                const list = []
                snap.forEach((doc) => list.push({ id: doc.id, ...doc.data() }))
                setItems(list)
            }, (err) => console.log(err))//TODO : present the error and map them to a human friendly errors

            return () => unsub()
        } else if (user.role == "Seller" || user.role == "Admin") {
            const q = query(collection(db, "items"))
            const unsub = onSnapshot(q, (snap) => {
                const list = []
                snap.forEach((doc) => {
                    console.log("doc.data().createdBy : ", doc.data().createdBy)
                    console.log("user.uid : ", user.uid)
                    if (doc.data().createdBy == user.uid) {
                        list.push({ id: doc.id, ...doc.data() })
                    }
                })
                setItems(list)
            }, (err) => console.log(err))//TODO : present the error and map them to a human friendly errors

            return () => unsub()
        }

    }, [])

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>items list</Text>

            <View style={styles.listContainer}>
                {items && items.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => navigation.navigate("ItemDetails", { item: item })}>
                        <ItemCard item={item} role={user.role} />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.addButton}>
                <Button
                    title="add"
                    onPress={() => navigation.navigate("AddItem")}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
    },

    listContainer: {
        gap: 12,
        marginBottom: 20,
    },

    addButton: {
        marginTop: 20,
        marginBottom: 40,
        alignSelf: "center",
        width: 120,
    }
})
