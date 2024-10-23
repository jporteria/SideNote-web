import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
  };
  return (
      <form action="submit" className="loginForm">
        <input type="email" />
        <input type="password" />
        <button onClick={handleClick}>Login</button>
      </form>
  );
}
