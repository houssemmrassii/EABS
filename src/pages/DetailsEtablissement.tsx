import UpdateEtablissementForm from "@/components/forms/Etablissement/UpdateEtablissementForm";
import { useGlobal } from "@/context/GlobalContext";
import { Descriptions, Divider } from "antd";
import type { DescriptionsProps } from "antd";

const DetailsEtablissement = () => {
  const { selectedEtabRecord } = useGlobal();
  const [items, setItems] = useState<DescriptionsProps["items"]>([]);
  const [itemsContact, setItemsContact] = useState<DescriptionsProps["items"]>(
    []
  );
  const [itemsInfo, setItemsInfo] = useState<DescriptionsProps["items"]>([]);
  const [itemsBank, setItemsBank] = useState<DescriptionsProps["items"]>([]);
  useEffect(() => {
    const itemsTemp: DescriptionsProps["items"] = [
      {
        key: "1",
        label: "Nom",
        children: selectedEtabRecord?.name || "N/A",
      },
      {
        key: "2",
        label: "Group établissement",
        children: selectedEtabRecord?.group_data?.name || "N/A",
      },
      {
        key: "3",
        label: "Régions",
        children: selectedEtabRecord?.region || "N/A",
      },
      {
        key: "4",
        label: "Départements",
        children: selectedEtabRecord?.departements || "N/A",
      },
      {
        key: "5",
        label: "Ville",
        children: selectedEtabRecord?.ville || "N/A",
      },
      {
        key: "6",
        label: "Code Postal",
        children: selectedEtabRecord?.code_postal || "N/A",
      },
      {
        key: "7",
        label: "Adresse",
        children: selectedEtabRecord?.adress || "N/A",
      },
    ];
    const itemsContactTemp: DescriptionsProps["items"] = [
      {
        key: "8",
        label: "E-mail",
        children: selectedEtabRecord?.email || "N/A",
      },
      {
        key: "9",
        label: "Fax",
        children: selectedEtabRecord?.num_fax || "N/A",
      },
      {
        key: "10",
        label: "Num. de tél.",
        children: selectedEtabRecord?.num_telephone || "N/A",
      },
      {
        key: "11",
        label: "Portable",
        children: selectedEtabRecord?.num_portable || "N/A",
      },
    ];

    const itemsInfoTemp: DescriptionsProps["items"] = [
      {
        key: "12",
        label: "Siret",
        children: selectedEtabRecord?.siret || "N/A",
      },
      {
        key: "13",
        label: "Immatriculation",
        children: selectedEtabRecord?.immatriculation || "N/A",
      },
      {
        key: "14",
        label: "Code NAF",
        children: selectedEtabRecord?.code_naf || "N/A",
      },
      {
        key: "15",
        label: "TVA intra-communautaire",
        children: selectedEtabRecord?.tva_instra_communautaire || "N/A",
      },
      {
        key: "16",
        label: "Facture calculée",
        children: selectedEtabRecord?.fractionnement_data?.name || "N/A",
      },
    ];

    const infoBankTemp: DescriptionsProps["items"] = [
      {
        key: "17",
        label: "Banque",
        children: selectedEtabRecord?.banque || "N/A",
      },
      {
        key: "18",
        label: "Adresse de la banque",
        children: selectedEtabRecord?.adresse_banque || "N/A",
      },
      {
        key: "19",
        label: "Code Banque",
        children: selectedEtabRecord?.code_banque || "N/A",
      },
      {
        key: "20",
        label: "Code Guichet",
        children: selectedEtabRecord?.code_guichet || "N/A",
      },
      {
        key: "21",
        label: "Compte",
        children: selectedEtabRecord?.compte_banque || "N/A",
      },
      {
        key: "22",
        label: "Code IBAN",
        children: selectedEtabRecord?.iban || "N/A",
      },
      {
        key: "23",
        label: "Code BIC",
        children: selectedEtabRecord?.bic || "N/A",
      },
    ];
    setItems(itemsTemp);
    setItemsContact(itemsContactTemp);
    setItemsInfo(itemsInfoTemp);
    setItemsBank(infoBankTemp);
  }, [selectedEtabRecord]);

  return (
    <div>
      <UpdateEtablissementForm
        recordData={selectedEtabRecord}
        external={true}
      />
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 13,
          padding: "1rem 1rem",
        }}
      >
        <Descriptions title={selectedEtabRecord?.name} items={items} />
        <Divider orientation="left">Contacts</Divider>
        <Descriptions title={""} items={itemsContact} />
        <Divider orientation="left">
          Informations d'établissement et de facturation
        </Divider>
        <Descriptions title={""} items={itemsInfo} />

        <Divider orientation="left">Coordonnées bancaires</Divider>
        <Descriptions title={""} items={itemsBank} />
      </div>
    </div>
  );
};

export default DetailsEtablissement;
