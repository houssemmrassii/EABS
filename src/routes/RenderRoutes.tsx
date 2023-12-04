import { lazy } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
const Login = lazy(() => import("../pages/Login/Login"));
const Home = lazy(() => import("../pages/Dashboard/Dashboard"));

const homeLoader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }
  return null;
};
const loginLoader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return redirect("/Dashboard");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    loader: loginLoader,
  },
  {
    path: "/Dashboard",
    element: <Home />,
    loader: homeLoader,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

export default router;
