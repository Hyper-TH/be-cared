import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

console.log(process.env.REACT_APP_TEST);

const app =  initializeApp({
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: "be-cared.fireabaseapp.com",
    projectId: "be-cared",
    storageBucket: "be-cared.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
});

// Initialize Firebase
export default app;

export const auth = getAuth(app);
// const analytics = getAnalytics(app);
export const GoogleProvider = new GoogleAuthProvider();

export const db = getFirestore(app); 