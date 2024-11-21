import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  // signInWithRedirect,
  // getRedirectResult,
  // GoogleAuthProvider,
  onAuthStateChanged,
  // signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";

// const googleProvider = new GoogleAuthProvider();

// Helper to get and store the current ID token
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

// Google Sign In using Redirect
// export const signInWithGoogle = async () => {
//   console.log("sign in with google called");
//   try {
//     await signInWithPopup(auth, googleProvider);
//   } catch (error) {
//     console.error("Error during Google sign-in:", error);
//     throw error;
//   }
// };

// Handle redirect result
// export const handleRedirectResult = async () => {
//   console.log("Checking redirect result...");
//   try {
//     const result = await getRedirectResult(auth);
//     if (result) {
//       const user = result.user;
//       console.log("User signed in via redirect:", user);
//       await getIdTokenAndStore(); // Store the token
//       return user;
//     }
//     console.log("No redirect result found");
//     return null;
//   } catch (error) {
//     console.error("Error handling redirect result:", error);
//     throw error;
//   }
// };

// Other functions remain the same...

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
