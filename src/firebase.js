import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAepMX0OANiAVjAIgsM9MyRnHo_NSjodNE",
  authDomain: "sidenote-d6c88.firebaseapp.com",
  projectId: "sidenote-d6c88",
  storageBucket: "sidenote-d6c88.appspot.com",
  messagingSenderId: "327144965832",
  appId: "1:327144965832:web:4bf9631e40d13055a487fd",
  measurementId: "G-8V0YNKKZH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection = collection(db, 'notes')
// const analytics = getAnalytics(app);