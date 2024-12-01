import { initializeApp } from "./firebase-sdk/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence } from "./firebase-sdk/firebase-auth.js"; 
import { getFirestore } from "./firebase-sdk/firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAepMX0OANiAVjAIgsM9MyRnHo_NSjodNE",
  authDomain: "sidenote-d6c88.firebaseapp.com",
  projectId: "sidenote-d6c88",
  storageBucket: "sidenote-d6c88.firebasestorage.app",
  messagingSenderId: "327144965832",
  appId: "1:327144965832:web:4bf9631e40d13055a487fd",
  measurementId: "G-8V0YNKKZH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence to local
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { auth, db };
