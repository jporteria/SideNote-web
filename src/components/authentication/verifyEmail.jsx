import { getAuth, sendEmailVerification } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [verificationMessage, setVerificationMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black");

  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser)
          setVerificationMessage("Verification email sent");
          setMessageColor("green");
      } catch (error) {
        setVerificationMessage("Too many request, please try again later.");
        setMessageColor("red");
      }
    } else {
      console.error("No user is currently signed in.");
    }
  };

  const checkEmailVerification = async () => {
    const user = auth.currentUser;
    if (user) {
      await user.reload(); // Refresh the user's state
      if (user.emailVerified) {
        navigate("/home");
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkEmailVerification, 3000);
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="verifyEmailForm">
      <h2>Verify your email address</h2>
      <p className="verify-note">
        Note: you cannot reset your password if your email is not verified. You can verify you email later in the settings
      </p>
      <label style={{ color: messageColor }}>{verificationMessage}</label>
      <button className="verify-button" onClick={sendVerificationEmail}>
        Verify my email
      </button>
      <button className="skip-button" onClick={() => navigate("/home")}>
        Skip
      </button>
    </div>
  );
}

export default VerifyEmail;
