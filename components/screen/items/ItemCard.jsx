import { useNavigation } from "@react-navigation/native";
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { Text, View, StyleSheet } from "react-native";
import { db } from "../../../utils/firebase/initfirebase";
import { useState } from "react";
import { Button } from "react-native-paper";
import { UserRole } from "../../../data/users/UserRole";
import { getAuth } from "firebase/auth";
import { checkIfDocExists } from "../../../utils/firebase/checkIfDocExist";

export const ItemCard = ({ item, uid, role, isFavoriteItemScreen }) => {
    console.log("reandering ItemCard")

    const navigation = useNavigation();
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);

    const onDelete = async () => {
        try {
            setDeleteLoading(true);
            await deleteDoc(doc(db, "items", item.id));
        } catch (error) {
            console.log(error);
        } finally {
            setDeleteLoading(false);
        }
    };

    const onAddOrRemoveFromFavorite = async () => {
        try {
            setFavoriteLoading(true)
            if (isFavoriteItemScreen) await removeFromFavorite()
            else await addToFavorite()
        } catch (e) {
            console.log(e)
        } finally {
            setFavoriteLoading(false)
        }

    }

    const removeFromFavorite = async () => {
        const document = doc(db, "favorites", uid)
        await updateDoc(document, {
            regions: arrayRemove(item.id)
        })
    }

    const addToFavorite = async () => {
        const document = doc(db, "favorites", uid)

        if (await checkIfDocExists(document)) {
            await updateDoc(document, {
                regions: arrayUnion(item.id)
            })
        } else {
            await setDoc(document, {
                regions: [item.id]
            })
        }
    }

    return (
        <View style={styles.card}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>Category: {item.category}</Text>
                <Text style={styles.text}>Condition: {item.condition}</Text>
                <Text style={styles.text}>Description: {item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={styles.status}>{item.status}</Text>
            </View>

            <View style={styles.buttonContainer}>


                {(role == UserRole.Admin || role == UserRole.Seller) &&
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate("UpdateItem", { item: item })}
                        style={styles.updateButton}
                        labelStyle={styles.buttonLabel}
                    >
                        Update
                    </Button>
                }
                {(role === UserRole.Admin || role === UserRole.Seller) && <Button
                    mode="contained"
                    onPress={onDelete}
                    loading={deleteLoading}
                    style={styles.deleteButton}
                    labelStyle={styles.buttonLabel}
                >
                    {deleteLoading ? "Deleting…" : "Delete"}
                </Button>}

                {(role == UserRole.Buyer) && <Button
                    mode="contained"
                    onPress={onAddOrRemoveFromFavorite}
                    loading={favoriteLoading}
                    style={styles.deleteButton}
                    labelStyle={styles.buttonLabel}
                >
                    {isFavoriteItemScreen ?
                        favoriteLoading ? "Removing..." : "remove from favorites"
                        : favoriteLoading ? "Adding..." : "Add To favorites"
                    }
                </Button>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 4,
        borderWidth: 1,
        borderColor: "#f0f0f0",
    },

    infoContainer: {
        marginBottom: 16,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#222",
        marginBottom: 6,
    },

    text: {
        fontSize: 14,
        color: "#555",
        marginBottom: 4,
    },

    price: {
        fontSize: 18,
        fontWeight: "600",
        color: "#0d6efd",
        marginTop: 10,
    },

    status: {
        marginTop: 6,
        fontSize: 14,
        fontWeight: "600",
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: "#e8f1ff",
        color: "#0d6efd",
        borderRadius: 6,
        alignSelf: "flex-start",
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },

    updateButton: {
        flex: 1,
        borderRadius: 8,
        backgroundColor: "#0d6efd",
    },

    deleteButton: {
        flex: 1,
        borderRadius: 8,
        backgroundColor: "#dc3545",
    },

    buttonLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#fff",
    },
});
