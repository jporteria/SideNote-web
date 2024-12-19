import { createContext, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { signInWithGoogle } from "../../firebase/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthForm() {
  const [form, setForm] = useState(true);
  const navigate = useNavigate()

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const { user, token } = await signInWithGoogle();
      console.log("Signed in with Google:", user);
      console.log("Token:", token);
      navigate("/home");
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ form, setForm }}>
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
            onClick={handleGoogleSignIn}
          >
            <img src="/images/google.png" alt="Google" width="20px" />
            Continue with Google
          </button>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default AuthForm;
