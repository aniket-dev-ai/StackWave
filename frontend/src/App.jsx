import React from "react";
import ThemeToggle from "./Component/ThemeToggle";
import Signup from "./Pages/Auth/SignUp";
import Login from "./Pages/Auth/LoginPage";
import OTPVerification from "./Pages/Auth/OTP";
import ResetPassword from "./Pages/Auth/ResetPassword";
import NewPassword from "./Pages/Auth/NewPassword";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Homepage/HomePage";
import QuestionsPage from "./Pages/Homepage/QuestionPage";

function App() {
  return (
    <div>
 <ThemeToggle/>
 {/* <QuestionsPage/> */}
 {/* <Signup/>
 <Login/>
 <OTPVerification/>
 <ResetPassword/>
 <NewPassword/> */}

 <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/questions/:questionId" element={<QuestionsPage />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/otp" element={<OTPVerification />} />
  <Route path="/resetpassword" element={<ResetPassword />} />
  <Route path="/resetpassword/:token" element={<NewPassword />} />
 </Routes>
    </div>
  );
}

export default App;
