import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import AuthPage from "./components/authentication/authPage";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        navigate("/home");
      } else {
        navigate("/auth");
      }
    } catch (err) {
      console.log("Error checking authToken:", err);
    }
  }, [navigate]); 

  return (
    <Routes>
      <Route path="/auth/*" element={<AuthPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
