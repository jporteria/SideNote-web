import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";

// const googleProvider = new GoogleAuthProvider();

const getIdTokenAndStore = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken(true); // Get a fresh token
    chrome.storage.local.set({ authToken: token }, () => {
      // console.log("Token saved to chrome.storage.local", token);
    });
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

export const logOut = async () => {
  await signOut(auth);
  chrome.storage.local.remove("authToken", () => {
    // console.log("Token removed from chrome.storage.local");
  });
};

export const onAuthStateChange = (callback) => {
  onAuthStateChanged(auth, callback);
};
