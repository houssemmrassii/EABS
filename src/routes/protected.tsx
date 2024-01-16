import { Navigate } from "react-router-dom";

import lazyLoad from "@utils/lazyLoad";

import Root from "@layouts/Root";
import { jwtDecode } from "jwt-decode";

interface Token {
  fresh: boolean;
  iat: number;
  jti: string;
  type: string;
  sub: {
    name: string;
    privileges: string[];
    creation_date: string;
    description: string | null;
  };
  nbf: number;
  csrf: string;
  exp: number;
}

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

const getChildrenRoutes = () => {
  let token = localStorage.getItem("token");
  let children = [];
  if (token) {
    let decodedToken = jwtDecode<Token>(token);
    if (decodedToken?.sub) {
      let privilges = decodedToken?.sub.privileges;
      if (privilges.includes(import.meta.env.VITE_APP_GET_ETABLISSEMENT)) {
        children.push({
          path: "etablissement",
          element: Etablissement,
        });
      }
      if (
        privilges.includes(import.meta.env.VITE_APP_GET_GROUPE_ETABLISSEMENT)
      ) {
        children.push({
          path: "group-etablissement",
          element: GroupEtablissement,
        });
      }
      if (privilges.includes(import.meta.env.VITE_APP_GET_TYPE_CHAMBRE)) {
        children.push({
          path: "type-chambre",
          element: TypeChambre,
        });
      }
      if (
        privilges.includes(import.meta.env.VITE_APP_GET_CONTRAT_ETABLISSEMENT)
      ) {
        children.push({
          path: "contract-etablissement",
          element: ContractEtablissement,
        });
      }
    }
  }
  return [
    {
      index: true,
      element: Dashboard,
    },
    {
      path: "etablissement-details/:id",
      element: DetailsEtablissement,
    },
    {
      path: "contract-etablissement-details/:id",
      element: DetailsContractEtablissement,
    },
    ...children,
  ];
};
export const protectedRoutes = [
  {
    path: "/dashboard",
    element: <PrivateRoutes />,
    children: getChildrenRoutes(),
  },
];
