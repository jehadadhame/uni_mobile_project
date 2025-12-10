import { deleteDoc } from "firebase/firestore";
import { View, Text, StyleSheet } from "react-native";

export const UserCard = ({ user }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{user.name}</Text>

            <Text style={styles.date}>
                {user.createdAt
                    ? user.createdAt.toDate().toLocaleString()
                    : "No date"}
            </Text>

            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.role}>{user.role}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 4,
    },
    date: {
        fontSize: 14,
        color: "#666",
        marginBottom: 6,
    },
    email: {
        fontSize: 15,
        color: "#333",
        marginBottom: 4,
    },
    role: {
        fontSize: 15,
        fontWeight: "500",
        color: "#1e88e5",
    },
});
