import { useState } from "react";
import { signIn } from "../../firebase/authService";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/home')
      // console.log("User signed in:", user.uid);
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSignIn}>
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
        </form>
      </div>
    </div>
  );
};

export default SignIn;
