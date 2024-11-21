import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Home";
// import LandingPage from "./components/landingPage";
import AuthPage from "./components/authentication/authPage";
// import GoogleSignInPage from "./components/google-signin";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    try{
      chrome.storage.local.get(["authToken"], (result) => {
        if (result.authToken) {
          navigate("/home");
        } else {
          navigate("/auth");
        }
      });
    }catch(err){
      console.log(err)
    }
  }, []);

  return (
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/google-signin" element={<GoogleSignInPage />} /> */}
      </Routes>
  );
}

export default App;
