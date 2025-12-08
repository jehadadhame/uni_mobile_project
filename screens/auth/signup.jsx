import { Button } from "@rneui/base";
import { Input } from "@rneui/themed";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useGoogleAuth } from "../../utils/hooks/useGoogleAuth"; // your existing hook
import { FirebaseError } from "firebase/app";
import { ErrorMapping } from "../../utils/firebase/errorMapping";

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
            console.log("User created:", userCredential.user);
        } catch (error) {
            console.log("SignUp error:", error.message);
            console.log("SignUp error:", error.code);
            setError(ErrorMapping(error.code))

        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <Input
                placeholder="Username"
                inputContainerStyle={styles.input}
                onChangeText={setUserName}
            />
            <Input
                placeholder="Email"
                inputContainerStyle={styles.input}
                onChangeText={setEmail}
            />
            <Input
                placeholder="Role"
                inputContainerStyle={styles.input}
                onChangeText={setRole}
            />
            <Input
                placeholder="Password"
                secureTextEntry
                inputContainerStyle={styles.input}
                onChangeText={setPassword}
            />

            <Button title="Sign Up" onPress={onSignUp} loading={loading} />

            <View style={{ height: 20 }} />

            <Button
                title="Sign Up with Google"
                disabled={!request}
                onPress={() => promptAsync()}
            />
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
