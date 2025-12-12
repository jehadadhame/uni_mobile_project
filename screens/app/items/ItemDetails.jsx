import { useNavigation, useRoute } from "@react-navigation/native";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { Text, View, StyleSheet } from "react-native";
import { db } from "../../../utils/firebase/initfirebase";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useAuth } from "../../../context/AppContext"
import { UserRole } from "../../../data/users/UserRole"
import { AppCollections } from "../../../data/AppCollections";

export const ItemDetails = () => {
    const router = useRoute();
    const { user } = useAuth();
    const item = router.params?.['item']
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [seller, setSeller] = useState(null)
    useEffect(() => {
        const getSeller = async () => {
            if (user.role == UserRole.Buyer) {
                getDoc(doc(db, ))
            }
        }
    }, [])
    const onDelete = async () => {
        try {
            setLoading(true);
            await deleteDoc(doc(db, AppCollections.items, item.id));
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
