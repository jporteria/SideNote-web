import { useNavigate } from "react-router-dom";

function LandingPage() {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/auth");
  };

  return (
    <div className="landingPage">
      <h1>Welcome to Side Note</h1>
      <button onClick={handleClick}>Get Started</button>
    </div>
  );
}

export default LandingPage;
