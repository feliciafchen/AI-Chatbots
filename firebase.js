import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCpwnkDnFjgRg4WPE1dQHj4VLR32O5u23I",
  authDomain: "chatbots-f925b.firebaseapp.com",
  projectId: "chatbots-f925b",
  storageBucket: "chatbots-f925b.appspot.com",
  messagingSenderId: "838665714764",
  appId: "1:838665714764:web:443591cb2f7aecd95448e9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
