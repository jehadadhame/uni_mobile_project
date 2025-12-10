import { StyleSheet, Text, View } from "react-native"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";

export const Login = () => {
    const navigation = useNavigation();
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const clearErrors = () => setError(null);

    const onLogin = async () => {
        const auth = getAuth();
        try {
            setLoading(true)
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            console.log("Logged in user: ", userCredential.user.email);
            setLoading(false)
        } catch (err) {
            console.log("Login error: ", err);
            setError(err.message);
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                label="Email"
                mode="outlined"
                style={styles.input}
                outlineColor="#ccc"
                activeOutlineColor="#4A90E2"
                onChangeText={(email) => { setEmail(email); clearErrors(); }}
            />

            <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry
                style={styles.input}
                outlineColor="#ccc"
                activeOutlineColor="#4A90E2"
                onChangeText={(password) => { setPassword(password); clearErrors(); }}
            />


            <Button
                mode="contained"
                onPress={onLogin}
                loading={loading}
                style={styles.loginButton}
                contentStyle={{ paddingVertical: 8 }}
            >
                Login
            </Button>

            <Text style={styles.text}>
                Don't have an account?
            </Text>

            <Button
                mode="text"
                onPress={() => navigation.navigate("SignUp")}
                style={styles.signupButton}
            >
                Sign Up
            </Button>

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 80,
        backgroundColor: "#fff",
        gap: 20,
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 10,
        color: "#333",
    },

    input: {
        backgroundColor: "#fafafa",
        borderRadius: 12,
        fontSize: 16,
        paddingVertical: 4,
        elevation: 2,         // small shadow on Android
        shadowColor: "#000",  // small shadow on iOS
        shadowOpacity: 0.05,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },

    loginButton: {
        marginTop: 10,
        borderRadius: 10,
    },

    text: {
        textAlign: "center",
        fontSize: 14,
        color: "#666",
    },

    signupButton: {
        alignSelf: "center",
    },

    error: {
        color: "red",
        textAlign: "center",
        marginTop: 10,
        fontSize: 14,
    },
});
