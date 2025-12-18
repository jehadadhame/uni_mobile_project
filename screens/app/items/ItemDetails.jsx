import { useNavigation, useRoute } from "@react-navigation/native";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { Text, View, StyleSheet } from "react-native";
import { db } from "../../../utils/firebase/initfirebase";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useAuth } from "../../../context/AppContext"
import { UserRole } from "../../../data/users/UserRole"
import { AppCollections } from "../../../data/AppCollections";
import { User } from "../../../data/users/User";

export const ItemDetails = () => {
    const router = useRoute();
    const { user } = useAuth();
    const item = router.params?.['item']
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [seller, setSeller] = useState(null)
    console.log(seller)
    useEffect(() => {
        const getSeller = async () => {
            if (user.role == UserRole.Buyer) {
                const sellectDocument = await getDoc(doc(db, AppCollections.users, item.createdBy))
                const sellerUser = new User({
                    uid: item.createdBy,
                    name: sellectDocument.data().name,
                    email: sellectDocument.data().email,
                    role: sellectDocument.data().role,
                    createdAt: sellectDocument.data().createdAt
                })
                setSeller(sellerUser)
            }
        }
        getSeller()
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

            {seller &&
                <View >
                    <Text >Seller info </Text>
                    <Text >name : </Text>
                    <Text >{seller.name}</Text>
                    <Text >email : </Text>
                    <Text >{seller.email}</Text>
                </View>
            }


            <View >
                {user.role != UserRole.Buyer && <Button
                    mode="contained"
                    onPress={() => navigation.navigate("UpdateItem", { item: item })}
                >
                    Update
                </Button>}

                {user.role != UserRole.Buyer &&
                    <Button
                        mode="contained"
                        onPress={onDelete}
                        loading={loading}
                    >
                        {loading ? "Deleting…" : "Delete"}
                    </Button>
                }
                {user.role == UserRole.Buyer &&
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate("ChatsNavigation", {
                            screen: "ChatScreen",
                            params: {
                                otherUserId: seller.uid,
                                currentUserId: user.uid,
                            },
                        })}
                    >
                        Contact
                    </Button>
                }
            </View>
        </View>
    );
};
