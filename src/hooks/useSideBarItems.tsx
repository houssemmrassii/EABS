import { MenuItem, getItem } from "@/utils/funcs/getItem";
import { getDecodedToken } from "@/utils/localStorageFuncs";
import { faBuilding, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function useSideBarItems() {
  const [items, setItems] = useState<MenuItem[]>([]);
  useEffect(() => {
    let jwtTokenDecoded = getDecodedToken();
    if (jwtTokenDecoded) {
      let privilges = jwtTokenDecoded?.sub.privileges;
      let etablissement_children = [];
      if (privilges.includes(import.meta.env.VITE_APP_GET_ETABLISSEMENT)) {
        etablissement_children.push(
          getItem(
            <Link to="/dashboard/etablissement">Etablisement</Link>,
            "etab-etab"
          )
        );
      }
      if (
        privilges.includes(import.meta.env.VITE_APP_GET_GROUPE_ETABLISSEMENT)
      ) {
        etablissement_children.push(
          getItem(
            <Link to="/dashboard/group-etablissement">
              Group Etablissement
            </Link>,
            "etab-group-etab"
          )
        );
      }
      if (privilges.includes(import.meta.env.VITE_APP_GET_TYPE_CHAMBRE)) {
        etablissement_children.push(
          getItem(
            <Link to="/dashboard/type-chambre">Type Chambre</Link>,
            "etab-type-chambre"
          )
        );
      }
      if (
        privilges.includes(import.meta.env.VITE_APP_GET_CONTRAT_ETABLISSEMENT)
      ) {
        etablissement_children.push(
          getItem(
            <Link to="/dashboard/contract-etablissement">
              Contract Etablissement
            </Link>,
            "etab-contract-etab"
          )
        );
      }

      setItems([
        getItem(
          "Etablissement",
          "etab",
          <FontAwesomeIcon icon={faBuilding} />,
          [...etablissement_children]
        ),
        getItem("Client", "clients", <FontAwesomeIcon icon={faUser} />, [
          getItem(
            <Link to="/dashboard/groupe-client">Groupe Client</Link>,
            "gc"
          ),
          getItem(
            <Link to="/dashboard/client">Administration Client</Link>,
            "ac"
          ),
          getItem(
            <Link to="/dashboard/contrat-client">Contrat Client</Link>,
            "cc"
          ),
          getItem("Pensionnaires", "fc"),
        ]),
        getItem(
          <Link to="/dashboard/utilisateurs">Utilisateurs</Link>,
          "ut",
          <FontAwesomeIcon icon={faUsers} />
        ),
      ]);
    }
  }, []);

  return items;
}
