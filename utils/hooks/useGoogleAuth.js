import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";

export function useGoogleAuth() {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: "293058782-qr7anvk9l061a7vq7r9scbfk6ls60hfd.apps.googleusercontent.com",
        androidClientId: "293058782-8ua6q1p48tqv8kc5rq6vguoanmvk3tu1.apps.googleusercontent.com",
        iosClientId: "293058782-fhfmb731mohtp66uaou2ttsde8r7ocov.apps.googleusercontent.com",
    });

    const auth = getAuth();

    useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then(() => console.log("Google Sign-In successful"))
                .catch((err) => console.log("Google Sign-In failed", err));
        }
    }, [response]);

    return { promptAsync, request };
}
