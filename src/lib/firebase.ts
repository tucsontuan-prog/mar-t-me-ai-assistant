import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvcXca_FhhF29yOdg_GN0-682ZACbkebM",
  authDomain: "chatbot-lovable.firebaseapp.com",
  projectId: "chatbot-lovable",
  storageBucket: "chatbot-lovable.firebasestorage.app",
  messagingSenderId: "1006618000262",
  appId: "1:1006618000262:web:ee01faa3b2a1db8e0c8a07",
  measurementId: "G-HTK8WMRN2Q",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
