import { useNavigation, useRoute } from "@react-navigation/native";
import { deleteDoc, doc } from "firebase/firestore";
import { Text, View, StyleSheet } from "react-native";
import { db } from "../../../utils/firebase/initfirebase";
import { useState } from "react";
import { Button } from "react-native-paper";

export const ItemDetails = () => {
    const router = useRoute();
    const item = router.params?.['item']
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const onDelete = async () => {
        try {
            setLoading(true);
            await deleteDoc(doc(db, "items", item.id));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View >
            {/* item info */}
            <View >
                <Text >{item.title}</Text>
                <Text >Category: {item.category}</Text>
                <Text >Condition: {item.condition}</Text>
                <Text >Description: {item.description}</Text>
                <Text >${item.price}</Text>
                <Text >{item.status}</Text>
            </View>


            <View >
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate("UpdateItem", { item: item })}

                    label
                >
                    Update
                </Button>

                <Button
                    mode="contained"
                    onPress={onDelete}
                    loading={loading}

                    label
                >
                    {loading ? "Deleting…" : "Delete"}
                </Button>
            </View>
        </View>
    );
};
