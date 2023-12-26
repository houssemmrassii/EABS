import { Navigate } from "react-router-dom";

import lazyLoad from "@utils/lazyLoad";

import Root from "@layouts/Root";

const Etablissement = lazyLoad(() => import("@pages/Etablissement"), "default");

const GroupEtablissement = lazyLoad(
  () => import("@pages/GroupEtablissement"),
  "default"
);

const TypeChambre = lazyLoad(() => import("@pages/TypeChambre"), "default");

const Dashboard = lazyLoad(() => import("@pages/Dashboard"), "default");

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  return token ? <Root /> : <Navigate to="/" />;
};

export const protectedRoutes = [
  {
    path: "/dashboard",
    element: <PrivateRoutes />,
    children: [
      {
        index: true,
        element: Dashboard,
      },
      {
        path: "etablissement",
        element: Etablissement,
      },
      {
        path: "group-etablissement",
        element: GroupEtablissement,
      },
      {
        path: "type-chambre",
        element: TypeChambre,
      },
    ],
  },
];
