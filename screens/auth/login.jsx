import { Input } from "@rneui/themed"
import { StyleSheet, Text, View } from "react-native"
import { app } from "../../utils/firebase/initfirebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";


export const Login = () => {
    console.log("Login component rendered");
    const navigation = useNavigation();
    const [credential, setCredential] = useState({});
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const clearErrors = () => {
        setError(null);
    }
    const onLogin = () => {
        const auth = getAuth();
        console.log("Attempting login with email: ", email);
        console.log("Attempting login with password: ", password);
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            console.log("Logged in user: ", user);
            console.log("Logged in userCredential: ", userCredential);
        }).catch((error) => {
            console.log("Login error: ", error);
            setError(error.message);
        })

    }
    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>

            <Input placeholder="Email" inputContainerStyle={styles.input} onChangeText={(email) => { setEmail(email); clearErrors(); }} />
            <Input placeholder="Password" secureTextEntry={true} inputContainerStyle={styles.input} onChangeText={(password) => { setPassword(password); clearErrors() }} />
            <Button title="Login" onPress={onLogin} />
            <Text>Don't u have an acount create one</Text>
            <Button title="SignUp" onPress={() => {
                navigation.navigate("SignUp")
            }} />
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
});
