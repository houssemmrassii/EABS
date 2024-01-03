import ContractEtablissementForm from "@forms/ContractEtablissement/ContractEtablissementForm";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";

type Props = {};

const ContactEtablissement = (props: Props) => {
  const columns: ColumnsType<any> = [
    {
      title: "Contract Etab.",
    },
    {
      title: "Etab.",
    },
    {
      title: "Group Etab.",
    },
    {
      title: "Period",
    },
    {
      title: "Fractionnement",
    },
    {
      title: "Intermédiare",
    },
    {
      title: "Statut",
    },
  ];
  return (
    <>
      <ContractEtablissementForm />
      <Table columns={columns} scroll={{ x: "max-content" }} />
    </>
  );
};

export default ContactEtablissement;
