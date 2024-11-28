import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function PasswordReset() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black")
  
  const handleReset = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
      setMessageColor("green")
      setEmail("")
      setTimeout(()=>{
        setMessage("")
        setMessageColor("black")
      }, 3000)
    } catch (error) {
      const errorCode = error.code || "unknown-error";
      const formattedError = errorCode.split("/")[1] || errorCode;
      setMessage(formattedError);
      setMessageColor("red")
    }
  };

  return (
    <div className="passwordResetForm">
      <h2>Reset Password</h2>
      <p className="reset-note">
        Enter your email address and we will send you a link to reset your
        password.
      </p>
      <input
        className="reset-email"
        id="reset-email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label style={{ color: messageColor }}>{Message}</label>
      <button className="reset-button" onClick={handleReset}>
        Send password reset link
      </button>
      <button className="cancel-button" onClick={() => navigate("/auth")}>
        Back to log in page
      </button>
    </div>
  );
}

export default PasswordReset;
