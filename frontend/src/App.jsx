import React from "react";
import ThemeToggle from "./Component/ThemeToggle";
import Signup from "./Pages/Auth/SignUp";
import Login from "./Pages/Auth/LoginPage";
import OTPVerification from "./Pages/Auth/OTP";
import ResetPassword from "./Pages/Auth/ResetPassword";
import NewPassword from "./Pages/Auth/NewPassword";

function App() {
  return (
    <div>
 <ThemeToggle/>
 <Signup/>
 <Login/>
 <OTPVerification/>
 <ResetPassword/>
 <NewPassword/>
    </div>
  );
}

export default App;
