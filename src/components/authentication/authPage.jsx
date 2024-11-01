import { createContext, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { signInWithGoogle } from "../../firebase/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthPage() {
  const [form, setForm] = useState(true);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/home");
      // console.log("User signed in with Google:", user);
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
    }
  };

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
            <button className="google--button" onClick={handleGoogleSignIn}>
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
