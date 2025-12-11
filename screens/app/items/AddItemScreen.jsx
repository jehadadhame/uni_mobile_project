import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, SegmentedButtons, Button } from "react-native-paper";
import { db } from "../../../utils/firebase/initfirebase";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../context/AppContext";
import { Item } from "../../../data/items/Item"

export const AddItem = () => {
    const navigation = useNavigation()
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("reserved");
    const [loading, setLoading] = useState(false)
    const auth = getAuth()
    console.log("created by : ", auth.currentUser.uid)
    const { user } = useAuth();

    const onCreate = async () => {
        try {
            const item = new Item({
                title: title,
                price: price,
                category: category,
                condition: condition,
                description: description,
                status: status,
                createdAt: new Date(),
                createdBy: auth.currentUser.uid
            })
            console.log("new item object : ", item)
            setLoading(true);
            const res = await addDoc(collection(db, "items"), item.toFirestore())
            console.log("Created item with ID:", res.id);
            navigation.goBack();
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }

        console.log(res.toJSON().toString())
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Add Item</Text>

            <TextInput
                label="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                label="Price"
                value={price.toString()}
                onChangeText={(text) => setPrice(Number(text))}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                label="Category"
                value={category}
                onChangeText={setCategory}
                style={styles.input}
            />
            <TextInput
                label="Condition"
                value={condition}
                onChangeText={setCondition}
                style={styles.input}
            />
            <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                style={styles.input}
            />

            <SegmentedButtons
                value={status}
                onValueChange={setStatus}
                buttons={[
                    { value: "sold", label: "Sold" },
                    { value: "reserved", label: "Reserved" },
                    { value: "available", label: "Available" },
                ]}
                style={styles.segmentedContainer}
            />
            <Button
                mode="contained"
                onPress={onCreate}
                loading={loading}
                style={styles.buttonContainer}
                contentStyle={{ paddingVertical: 8 }}
            >
                Create
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    titleText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
        textAlign: "center",
    },
    input: {
        marginBottom: 15,
        backgroundColor: "white",
        borderRadius: 5,
    },
    segmentedContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 10,
        borderRadius: 10,
    },
});
