import { createContext, useState, useEffect } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { signInWithGoogle } from "../../firebase/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthPage() {
  const [form, setForm] = useState(true);
  const navigate = useNavigate();

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await signInWithGoogle();
  //     navigate("/home");
  //     // console.log("User signed in with Google:", user);
  //   } catch (error) {
  //     console.error("Error during Google sign-in:", error.message);
  //   }
  // };

  // window.handleGoogleSignIn = handleGoogleSignIn;
  
  useEffect(() => {
    const signInButton = document.getElementById("signInButton");

    if (signInButton) {
      const handleClick = async () => {
        try {
          const user = await signInWithGoogle();
          console.log("User signed in from extension:", user);
          navigate("/home"); // Navigate to the home page after sign-in
        } catch (error) {
          console.error("Sign-in error in extension:", error);
        }
      };

      // Add the event listener
      signInButton.addEventListener("click", handleClick);

      // Cleanup the event listener on component unmount
      return () => {
        signInButton.removeEventListener("click", handleClick);
      };
    } else {
      console.error("Sign-in button not found in the DOM");
    }
  }, [navigate]);


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
            <button
              className="google--button"
              id="signInButton"
              // onClick={handleGoogleSignIn}
            >
              <img src="/user.png" alt="" width="20px" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default AuthPage;
