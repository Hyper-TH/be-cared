import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const app =  initializeApp({
    apiKey: `${process.env.apiKey}`,
    authDomain: "be-cared.fireabaseapp.com",
    projectId: "be-cared",
    storageBucket: "be-cared.appspot.com",
    messagingSenderId: `${process.env.messagingSenderId}`,
    appId: `${process.env.appId}`,
    measurementId: `${process.env.measurementId}`
});

// Initialize Firebase
export default app;

export const auth = getAuth(app);
// const analytics = getAnalytics(app);
export const GoogleProvider = new GoogleAuthProvider();

export const db = getFirestore(app); 