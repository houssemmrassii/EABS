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

const Client = lazyLoad(
  () => import("@/pages/ClientPages/Client/Client"),
  "default"
);

const Etablissement = lazyLoad(
  () => import("@/pages/EtablissementPages/Etablissement/Etablissement"),
  "default"
);

const User = lazyLoad(
  () => import("@/pages/UserPages/User/User"),
  "default"
);

const GroupEtablissement = lazyLoad(
  () =>
    import("@/pages/EtablissementPages/GroupEtablissement/GroupEtablissement"),
  "default"
);

const GroupClient = lazyLoad(
  () => import("@/pages/ClientPages/GroupeClient/GroupClient"),
  "default"
);

const ContractEtablissement = lazyLoad(
  () =>
    import(
      "@/pages/EtablissementPages/ContratEtablissement/ContractEtablissement"
    ),
  "default"
);

const ContractClient = lazyLoad(
  () =>
    import(
      "@/pages/ClientPages/ContratClient/ContractClient"
    ),
  "default"
);
const TypeChambre = lazyLoad(
  () => import("@/pages/EtablissementPages/TypeChambre/TypeChambre"),
  "default"
);

const Dashboard = lazyLoad(() => import("@pages/Dashboard"), "default");

const DetailsContractEtablissement = lazyLoad(
  () =>
    import(
      "@/pages/EtablissementPages/ContratEtablissement/DetailsContractEtablissement"
    ),
  "default"
);
const DetailsEtablissement = lazyLoad(
  () => import("@/pages/EtablissementPages/Etablissement/DetailsEtablissement"),
  "default"
);

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  return token ? <Root /> : <Navigate to="/" />;
};

const getChildrenRoutes = () => {
  let token = localStorage.getItem("token");
  let children = [];
  try {
    if (token) {
      let decodedToken = jwtDecode<Token>(token);

      if (decodedToken?.sub) {
        let privilges = decodedToken?.sub.privileges;
        if (privilges.includes(import.meta.env.VITE_APP_GET_ETABLISSEMENT)) {
          children.push({
            path: "etablissement",
            element: Etablissement,
          });
          children.push({
            path: "etablissement-details/:id",
            element: DetailsEtablissement,
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
          children.push({
            path: "contract-etablissement-details/:id",
            element: DetailsContractEtablissement,
          });
        }
      }
    }
  } catch (InvalidTokenError) {
    localStorage.clear();
    window.location.reload();
  }

  return [
    {
      index: true,
      element: Dashboard,
    },
    {
      path: "groupe-client",
      element: GroupClient,
    },
    {
      path: "client",
      element: Client,
    },
    {
      path: "contrat-client",
      element: ContractClient,
    },
    {
      path: "utilisateurs",
      element: User,
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
