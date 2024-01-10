import { RouteObject } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

const routes: RouteObject[] = [...protectedRoutes, ...publicRoutes];

export default routes;
