import { useContext, useState } from "react";
import { signUp } from "../../firebase/authService";
import { AuthContext } from "./authPage";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setForm } = useContext(AuthContext);

  const errorMessage = document.getElementById("error-message");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      setForm(true);
    } catch (error) {
      errorMessage.textContent = error.code;
      setTimeout(() => {
        errorMessage.textContent = "";
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
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
      <button type="submit">Sign Up</button>
      <p className="register">
        Already have an account?{" "}
        <span onClick={() => setForm(true)}>Log in</span>
      </p>
    </form>
  );
};

export default SignUp;
