import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();  // Create a new GoogleAuthProvider

const getIdTokenAndStore = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken(true); // Get a fresh token
    localStorage.setItem("authToken", token); // Store token in localStorage
    return token;
  }
  return null;
};

export const signUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const token = await getIdTokenAndStore();
  return { user: userCredential.user, token };
};

export const signIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await getIdTokenAndStore();
  return { user: userCredential.user, token };
};

// Google sign-in
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const token = await getIdTokenAndStore();
    return { user, token }; // Return user and token after successful login
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw error; // Throw error if sign-in fails
  }
};

export const logOut = async () => {
  await signOut(auth);
  localStorage.removeItem("authToken");  // Remove token from localStorage
};

export const onAuthStateChange = (callback) => {
  onAuthStateChanged(auth, callback);
};
