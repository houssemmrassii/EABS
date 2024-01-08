import lazyLoad from "@utils/lazyLoad";

const Login = lazyLoad(() => import("@pages/Login/LoginForm"), "default");
const NotFound = lazyLoad(() => import("@pages/NotFound/NotFound"), "default");

const PublicRoutes = () => {
  const token = localStorage.getItem("token");
  return !token ? Login : <Navigate to="/dashboard" />;
};

export const publicRoutes = [
  {
    path: "/",
    element: <PublicRoutes />,
  },

  {
    path: "/*",
    element: NotFound,
  },
];
