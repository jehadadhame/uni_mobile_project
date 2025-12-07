import { Input } from "@rneui/themed";
import { Text, StyleSheet, View } from "react-native";

export const SignUp = () => {
    console.log("SignUp component rendered");
    return (
        <View style={styles.container}>
            <Text>Sign Up Screen</Text>
            <Input placeholder="Username" inputContainerStyle={styles.input} />
            <Input placeholder="Email" inputContainerStyle={styles.input} />
            <Input placeholder="Role" inputContainerStyle={styles.input} />
            <Input
                placeholder="Password"
                secureTextEntry={true}
                inputContainerStyle={styles.input}
            />
        </View>
    );
};

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
