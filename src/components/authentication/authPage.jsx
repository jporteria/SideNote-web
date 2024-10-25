import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function AuthPage() {
  const [form, setForm] = useState(true);

  return (
    <div className="authPage">
      <div className="authForm">
        <div>
          <button onClick={()=>setForm(true)}>Log In</button>
          <button onClick={()=>setForm(false)}>Sign up</button>
        </div>
        {form ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
}

export default AuthPage;
