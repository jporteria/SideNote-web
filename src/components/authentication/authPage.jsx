import AuthForm from "./authForm";
import VerifyEmail from "./verifyEmail";
import PasswordReset from "./passwordReset";
import { Route, Routes, useNavigate } from "react-router-dom";

function AuthPage() {

  return (
    <div className="authPage">
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="verifyEmail" element={<VerifyEmail />} />
        <Route path="passwordReset" element={<PasswordReset />} />
      </Routes>
    </div>
  );
}

export default AuthPage;
