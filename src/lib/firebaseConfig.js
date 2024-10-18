// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDwPfOA-uIzX_wH9p-7STIWKcI0w6M3iBg",
    authDomain: "drivio-acd9b.firebaseapp.com",
    projectId: "drivio-acd9b",
    storageBucket: "drivio-acd9b.appspot.com",
    messagingSenderId: "670029883435",
    appId: "1:670029883435:web:8f5028c00ffbbf6d69226e",
    measurementId: "G-L9YE1PDXC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set up Google Auth Provider
const provider = new GoogleAuthProvider();

export { auth, provider };
