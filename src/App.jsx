import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import LandingPage from "./components/landingPage";
import AuthPage from "./components/authentication/authPage";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Try fetching the token here without wrapping it in any other logic
    chrome.storage.local.get(["authToken"], (result) => {
      if (result.authToken) {
        navigate("/home");
      } else {
        navigate("/");
      }
      // console.log(result.authToken)
    });
  }, []);

  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
  );
}

export default App;
