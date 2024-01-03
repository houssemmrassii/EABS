import { getContractsEtablissement } from "@/services/ContractEtablissement";
import { ContractEtablissementDataType } from "@/types";
import ContractEtablissementForm from "@forms/ContractEtablissement/ContractEtablissementForm";
import { message } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";

type Props = {};

const ContactEtablissement = (props: Props) => {
  const [data, setData] = useState<ContractEtablissementDataType[]>([]);
  const columns: ColumnsType<ContractEtablissementDataType> = [
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

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getContractsEtablissement();
        setData(data);
      } catch (error) {
        message.error((error as Error)?.message);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <ContractEtablissementForm />
      <Table columns={columns} />
    </>
  );
};

export default ContactEtablissement;
