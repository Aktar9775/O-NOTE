import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyC6xlJM7w4nMPghmpY00GihrkjVs0mMeIk",
  authDomain: "opennote-f34fe.firebaseapp.com",
  projectId: "opennote-f34fe",
  storageBucket: "opennote-f34fe.firebasestorage.app",
  messagingSenderId: "116240466601",
  appId: "1:116240466601:web:00f89c7edd08ffad181fb8",
  measurementId: "G-07KJ57GFJ7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); 
