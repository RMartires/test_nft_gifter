import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID
});

const auth = getAuth();
signInAnonymously(auth).then(() => {
    console.log("logged in");
})
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
    });

const db = getFirestore();

export default db;