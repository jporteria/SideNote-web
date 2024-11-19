import React, { useEffect } from "react";
import { getRedirectResult, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../firebase/firebase.js";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase/authService";

const GoogleSignInPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const provider = new GoogleAuthProvider();
      try {
        // Check if we're returning from a redirect
        const result = await getRedirectResult(auth);
        if (result) {
          // Redirect completed, user signed in
          console.log("Redirect completed, user signed in:", result.user);
          
          // Get and store the token
          const user = result.user;
          const token = await user.getIdToken(true); // Get a fresh token
          console.log("User token:", token);

          // Save token to chrome.storage.local
          chrome.storage.local.set({ authToken: token }, () => {
            console.log("Token saved to chrome.storage.local");
          });

          // Navigate to home or another page after successful login
          navigate("/home");
        } else {
          // If no redirect result, initiate the Google sign-in redirect
          console.log("Starting Google Sign-In redirect");
          await signInWithGoogle();
        }
      } catch (error) {
        console.error("Error during Google sign-in:", error);
      }
    };

    handleRedirect();
  }, [navigate]);

  return <div>Signing you in...</div>;
};

export default GoogleSignInPage;
