import { useContext, useState } from "react";
import { signIn } from "../../firebase/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authPage";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setForm } = useContext(AuthContext);

  const navigate = useNavigate();
  const errorMessage = document.getElementById("error-message");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/home");
    } catch (error) {
      errorMessage.textContent = error.code;
      setTimeout(() => {
        errorMessage.textContent = "";
      }, 3000);
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSignIn}>
          <label id="error-message"></label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Log in</button>
          <p className="register">
            Don't have an account?{" "}
            <span onClick={() => setForm(false)}>Register</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
