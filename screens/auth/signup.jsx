import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useGoogleAuth } from "../../utils/hooks/useGoogleAuth"; // your existing hook
import { FirebaseError } from "firebase/app";
import { AuthErrorMapping } from "../../utils/firebase/errorMapping";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/initfirebase";
import { Button } from "react-native";
import { TextInput } from "react-native-paper";

export const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { promptAsync, request } = useGoogleAuth();

    const auth = getAuth();

    const onSignUp = async () => {
        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User created:", userCredential.user);

            await setDoc(doc(db, "users", user.uid), {
                name: userName,
                email: email,
                createdAt: new Date(),
                role: role
            })

        } catch (error) {
            console.log("SignUp error:", error.message);
            console.log("SignUp error:", error.code);
            setError(AuthErrorMapping(error.code))

        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
                label="Username"
                inputContainerStyle={styles.input}
                onChangeText={setUserName}
            />
            <TextInput
                label="Email"
                inputContainerStyle={styles.input}
                onChangeText={setEmail}
            />
            <TextInput
                label="Role"
                inputContainerStyle={styles.input}
                onChangeText={setRole}
            />
            <TextInput
                label="Password"
                secureTextEntry
                inputContainerStyle={styles.input}
                onChangeText={setPassword}
            />

            <Button title="Sign Up" onPress={onSignUp} loading={loading} >
                Sign Up
            </Button>
            <View style={{ height: 20 }} />

            <Button
                title="Sign Up with Google"
                disabled={!request}
                onPress={() => promptAsync()}
            >
                Sign Up with Google
            </Button>
            {error && <Text style={{ color: 'red' }}>{error}</Text>}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
});
