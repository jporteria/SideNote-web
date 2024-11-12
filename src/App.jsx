import { HashRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import LandingPage from "./components/landingPage";
import AuthPage from "./components/authentication/authPage";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if the token exists in chrome.storage.local
  //   chrome.storage.local.get(["authToken"], (result) => {
  //     if (result.authToken) {
  //       setIsAuthenticated(true);
  //       navigate("/home");
  //     } else {
  //       setIsAuthenticated(false);
  //       navigate("/");
  //     }
  //   });
  // }, [navigate]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
