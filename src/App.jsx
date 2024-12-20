import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
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
    <Router basename="/SideNote-web">  {/* Ensure this matches the base path */}
      <Routes>
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
