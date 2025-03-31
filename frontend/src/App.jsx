import React from "react";
import ThemeToggle from "./Component/ThemeToggle";
import Signup from "./Pages/Auth/SignUp";
import Login from "./Pages/Auth/LoginPage";
import OTPVerification from "./Pages/Auth/OTP";
import ResetPassword from "./Pages/Auth/ResetPassword";
import NewPassword from "./Pages/Auth/NewPassword";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
 <ThemeToggle/>
 {/* <Signup/>
 <Login/>
 <OTPVerification/>
 <ResetPassword/>
 <NewPassword/> */}

 <Routes>
  <Route path="/" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/otp" element={<OTPVerification />} />
  <Route path="/resetpassword" element={<ResetPassword />} />
  <Route path="/resetpassword/:token" element={<NewPassword />} />
 </Routes>
    </div>
  );
}

export default App;
