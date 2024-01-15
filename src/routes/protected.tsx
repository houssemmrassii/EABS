import { Navigate } from "react-router-dom";

import lazyLoad from "@utils/lazyLoad";

import Root from "@layouts/Root";

const Etablissement = lazyLoad(() => import("@pages/Etablissement"), "default");

const GroupEtablissement = lazyLoad(
  () => import("@pages/GroupEtablissement"),
  "default"
);

const ContractEtablissement = lazyLoad(
  () => import("@pages/ContractEtablissement"),
  "default"
);
const TypeChambre = lazyLoad(() => import("@pages/TypeChambre"), "default");

const Dashboard = lazyLoad(() => import("@pages/Dashboard"), "default");

const DetailsContractEtablissement = lazyLoad(
  () => import("@pages/DetailsContractEtablissement"),
  "default"
);
const DetailsEtablissement = lazyLoad(
  () => import("@pages/DetailsEtablissement"),
  "default"
);

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  return token ? <Root /> : <Navigate to="/" />;
};

// Decode Token

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
        path: "etablissement-details/:id",
        element: DetailsEtablissement,
      },
      {
        path: "contract-etablissement-details/:id",
        element: DetailsContractEtablissement,
      },
      {
        path: "group-etablissement",
        element: GroupEtablissement,
      },
      {
        path: "type-chambre",
        element: TypeChambre,
      },
      {
        path: "contract-etablissement",
        element: ContractEtablissement,
      },
    ],
  },
];
