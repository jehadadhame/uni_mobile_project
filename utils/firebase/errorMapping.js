export const ErrorMapping = (errorCode) => {
    console.log("error maping");
    switch (errorCode) {
        case "auth/network-request-failed":
            return "netwrok Error, check your internet connection.";
        case "auth/weak-password":
            return "weak-passwordr, your password should be at least 6 character.";
    }
}