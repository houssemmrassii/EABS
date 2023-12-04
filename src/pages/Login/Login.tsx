import React from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "@/components/Login/LoginForm";
import SignUpForm from "@/components/SignUp/SignUpForm";

const Login: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const SignUPSecretKey = queryParams.get("SignUPSecretKey");
  if (SignUPSecretKey == import.meta.env.VITE_APP_SIGN_UP_SECRET)
    return <SignUpForm />;
  return <LoginForm />;
};

export default Login;
