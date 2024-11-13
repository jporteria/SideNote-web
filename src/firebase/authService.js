import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCustomToken
} from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

// Helper to get and store the current ID token
const getIdTokenAndStore = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken(true); // Get a fresh token
    chrome.storage.local.set({ authToken: token }, () => {
      console.log("Token saved to chrome.storage.local", token);
    });
    return token;
  }
  return null;
};

// Sign Up
export const signUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const token = await getIdTokenAndStore();
  return { user: userCredential.user, token };
};

// Sign In
export const signIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await getIdTokenAndStore();
  return { user: userCredential.user, token };
};

// Google Sign In
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const token = await getIdTokenAndStore();
  return { user: result.user, token };
};

// Sign Out
export const logOut = async () => {
  await signOut(auth);
  chrome.storage.local.remove("authToken", () => {
    console.log("Token removed from chrome.storage.local");
  });
};

// Auth Listener
export const onAuthStateChange = (callback) => {
  onAuthStateChanged(auth, callback);
};

