import { createContext, useState, useEffect } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
// import { handleRedirectResult, signInWithGoogle } from "../../firebase/authService"; // Remove `signInWithGoogle` import
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthPage() {
  const [form, setForm] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if there is a redirect result
  //   const checkRedirectResult = async () => {
  //     try {
  //       const user = await handleRedirectResult();
  //       if (user) {
  //         console.log("User signed in via redirect:", user);
  //         navigate("/home"); // Redirect to home page after successful sign-in
  //       }
  //     } catch (error) {
  //       console.error("Error handling redirect result:", error);
  //     }
  //   };
  //   checkRedirectResult();
  // }, [navigate]);

  // const handleGoogleSignIn = () => {
  //   event.preventDefault();
  //   // Send a message to the service worker to open a new tab
  //   chrome.runtime.sendMessage(
  //     { action: "OPEN_GOOGLE_SIGN_IN_TAB" },
  //     (response) => {
  //       if (chrome.runtime.lastError) {
  //         console.error(
  //           "Error sending message to service worker:",
  //           chrome.runtime.lastError.message
  //         );
  //       } else {
  //         console.log("Message sent to service worker:", response);
  //       }
  //     }
  //   );
  // };

  return (
    <AuthContext.Provider value={{ form, setForm }}>
      <div className="authPage">
        <div className="authForm">
          <div className="authButton">
            <button
              className={form ? "authButton--active" : "authButton--inactive"}
              onClick={() => setForm(true)}
            >
              Log In
            </button>
            <button
              className={form ? "authButton--inactive" : "authButton--active"}
              onClick={() => setForm(false)}
            >
              Sign up
            </button>
          </div>
          {form ? <SignIn /> : <SignUp />}
          <div className="divider">
            <span>or</span>
          </div>
          <div>
            <button className="google--button" onClick={''} disabled>
              <img src="/images/google.png" alt="" width="20px" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default AuthPage;
