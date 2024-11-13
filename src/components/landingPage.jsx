import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LandingPage() {
  // useEffect(() => {
  //   chrome.storage.local.get(["authToken"], (result) => {
  //     if (result.authToken) {
  //       navigate("/home"); // Redirect to landing page if no token is found
  //     }
  //   });
  // }, [navigate]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/auth");
    // chrome.runtime.sendMessage({ action: "openTab" });
  };

  return (
    <div className="landingPage">
      <h1>Welcome to Side Note</h1>
      <button onClick={handleClick}>Get Started</button>
    </div>
  );
}

export default LandingPage;
