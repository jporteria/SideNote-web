import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";

// Initialize Google provider
const googleProvider = new GoogleAuthProvider();

// Helper to get the current ID token
export const getIdToken = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    return await currentUser.getIdToken();
  }
  return null;
};

// Sign Up
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    
    // Store the token in chrome.storage.local
    chrome.storage.local.set({ authToken: token }, () => {
      console.log("Token saved in chrome.storage.local");
    });
    return { user: userCredential.user, token };
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Sign In
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    
    // Store the token in chrome.storage.local
    chrome.storage.local.set({ authToken: token }, () => {
      console.log("Token saved in chrome.storage.local");
    });
    return { user: userCredential.user, token };
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// Google Sign In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();
    
    // Store the token in chrome.storage.local
    chrome.storage.local.set({ authToken: token }, () => {
      console.log("Token saved in chrome.storage.local");
    });
    return { user: result.user, token };
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Sign Out
export const logOut = async () => {
  try {
    await signOut(auth);
    
    // Remove token from chrome.storage.local on sign out
    chrome.storage.local.remove("authToken", () => {
      console.log("Token removed from chrome.storage.local");
    });
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// Auth Listener to get user on auth state change
export const onAuthStateChange = (callback) => {
  onAuthStateChanged(auth, callback);
};
