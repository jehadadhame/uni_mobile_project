// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBqlbqQBmc39QkBILYXWL0q_O55JxCbVxQ",
    authDomain: "smart-community-marketplace.firebaseapp.com",
    projectId: "smart-community-marketplace",
    storageBucket: "smart-community-marketplace.firebasestorage.app",
    messagingSenderId: "293058782",
    appId: "1:293058782:android:9b43ab2b01b65c61a4aa4f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { app, db };
