import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, SegmentedButtons, Button } from "react-native-paper";
import { db } from "../../../utils/firebase/initfirebase";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../context/AppContext";
import { Item } from "../../../data/items/Item"
import { ItemStatus } from "../../../data/items/ItemStatus";
import { ItemCondition } from "../../../data/items/ItemCondition";
import { ItemCategories } from "../../../data/items/ItemCategories";

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
        <View >
            <Text >Add Item</Text>

            <TextInput
                label="Title"
                value={title}
                onChangeText={setTitle}

            />
            <TextInput
                label="Price"
                value={price.toString()}
                onChangeText={(text) => setPrice(Number(text))}
                keyboardType="numeric"

            />

            <Text>Category</Text>
            <SegmentedButtons
                value={category}
                onValueChange={setCategory}
                buttons={[
                    { value: ItemCategories.cpu, label: ItemCategories.cpu },
                    { value: ItemCategories.gpu, label: ItemCategories.gpu },
                    { value: ItemCategories.ram, label: ItemCategories.ram },
                    { value: ItemCategories.nvmeSsd, label: ItemCategories.nvmeSsd },
                ]}

            />
            <Text>Condition</Text>
            <SegmentedButtons
                value={condition}
                onValueChange={setCondition}
                buttons={[
                    { value: ItemCondition.new, label: ItemCondition.new },
                    { value: ItemCondition.used, label: ItemCondition.used },
                ]}

            />
            <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}

            />
            <Text>Status</Text>
            <SegmentedButtons
                value={status}
                onValueChange={setStatus}
                buttons={[
                    { value: ItemStatus.sold, label: ItemStatus.sold },
                    { value: ItemStatus.reserved, label: ItemStatus.reserved },
                    { value: ItemStatus.available, label: ItemStatus.available },
                ]}

            />
            <Button

                onPress={onCreate}
                loading={loading}

                contentStyle={{ paddingVertical: 8 }}
            >
                Create
            </Button>
        </View>
    );
};
