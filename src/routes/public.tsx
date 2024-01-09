import lazyLoad from "@utils/lazyLoad";

const Login = lazyLoad(() => import("@pages/Login/LoginForm"), "default");
const NotFound = lazyLoad(() => import("@pages/NotFound/NotFound"), "default");
const SignUp = lazyLoad(() => import("@pages/SignUp/SignUpForm"), "default");

const PublicRoutes = () => {
  const token = localStorage.getItem("token");
  return !token ? Login : <Navigate to="/dashboard" />;
};

const PublicSignUpRoute = () => {
  const token = localStorage.getItem("token");
  return !token ? SignUp : <Navigate to="/dashboard" />;
};

export const publicRoutes = [
  {
    path: "/",
    element: <PublicRoutes />,
  },
  {
    path: "/signup",
    element: <PublicSignUpRoute />,
  },
  {
    path: "/*",
    element: NotFound,
  },
];
