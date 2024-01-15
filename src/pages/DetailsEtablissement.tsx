import { useGlobal } from "@/context/GlobalContext";
import { Col, Descriptions, Row } from "antd";
import type { DescriptionsProps } from "antd";
import React from "react";

type Props = {};

const DetailsEtablissement = (props: Props) => {
  const { selectedEtabRecord } = useGlobal();
  const [items, setItems] = useState<DescriptionsProps["items"]>([]);

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
  }, [selectedEtabRecord]);

  return (
    <Row>
      <Col lg={7}></Col>
      <Col
        lg={17}
        style={{
          backgroundColor: "white",
          borderRadius: 13,
          padding: "1rem 1rem",
        }}
      >
        <Descriptions
          title={selectedEtabRecord?.name}
          layout="vertical"
          items={items}
        />
      </Col>
    </Row>
  );
};

export default DetailsEtablissement;
