import { lazy } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
const Login = lazy(() => import("../pages/Login/Login"));
const Home = lazy(() => import("../pages/Dashboard/Dashboard"));

const loader = async () => {
  const token = await localStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Dashboard",
    element: <Home />,
    loader: loader,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

export default router;
