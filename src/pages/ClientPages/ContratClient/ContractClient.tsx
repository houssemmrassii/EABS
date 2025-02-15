import UpdateContractClientForm from "@/components/forms/ContractClient/UpdateContractClientForm";
import {
  deleteContractClient,
  getContractsClient,
} from "@/services/ContractClient";
import { getClientGroupsService } from "@/services/ClientGroup";
import { ContractClientDataType } from "@/types";
import { DeleteOutlined, EditTwoTone, EyeOutlined } from "@ant-design/icons";
import ContractClientForm from "@forms/ContractClient/ContractClientForm";
import { Badge, Popconfirm, Space, Tooltip, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import dayjs from "dayjs";
import { useGlobal } from "@/context/GlobalContext";

const ContactClient = () => {
  const { setSelectedContractRecord } = useGlobal();
  const Navigate = useNavigate();
  const [editing, setEditing] = useState<ContractClientDataType | null>(
    null
  );
  const [data, setData] = useState<ContractClientDataType[]>([]);
  const [refrech, setRefrech] = useState<boolean>(false);
  const [groupClients, setGroupClients] = useState<any>([]);

  const columns: ColumnsType<ContractClientDataType> = [
    {
      title: "Contrat Client.",
      //render: (_, record) => <>N/A</>,
      render: () => <>N/A</>,
    },
    {
      title: "Client.",
      render: (_, record) => <>{record?.etablissement?.name}</>,
    },
    {
      title: "Group Client.",
      filters: groupClients,
      onFilter: (value, record) =>
        record?.etablissement?.group_data?.name === value,

      render: (_, record) => <>{record?.etablissement?.group_data?.name}</>,
    },
    {
      title: "Period",
      sorter: (a, b) =>
        dayjs(a?.end_date).diff(a?.start_date, "day") -
        dayjs(b?.end_date).diff(b?.start_date, "day"),
      render: (_, record) => (
        <Tooltip
          title={`${dayjs(record?.start_date).format("DD/MM/YYYY")} - ${dayjs(
            record?.end_date
          ).format("DD/MM/YYYY")}`}
          style={{ cursor: "pointer" }}
        >
          {dayjs(record?.end_date).diff(record?.start_date, "day")} Nuités
        </Tooltip>
      ),
    },
    {
      title: "Fractionnement",
      render: (_, record) => <>{record?.fractionnement?.name}</>,
    },
    {
      title: "Intermédiare",
      //render: (_, record) => <>N/A</>,
      render: () => <>N/A</>,
    },
    {
      title: "Statut",
      dataIndex: "active",
      key: "status",
      filters: [
        {
          text: "Activé",
          value: true,
        },
        {
          text: "Désactivé",
          value: false,
        },
      ],
      onFilter: (value, record) => record.active === value,
      render: (_, { active }) => (
        <Badge
          status={active ? "success" : "error"}
          text={active ? "Activé" : "Désactivé"}
        />
      ),
    },
    {
      title: "Paramètres",
      render: (_, record) => (
        <Space size="large">
          <EyeOutlined onClick={() => handleDetailsNavigation(record)} />
          <EditTwoTone onClick={() => setEditing(record)} />
          <Popconfirm
            title="Vous êtes sûr de supprimer?"
            onConfirm={() => handleDelete(record?.id)}
            okText="Confirmer"
            cancelText="Annuler"
          >
            <DeleteOutlined style={{color:"red"}} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDetailsNavigation = (record: ContractClientDataType) => {
    setSelectedContractRecord(record);
    Navigate(`/dashboard/contract-etablissement-details/${record?.id}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getContractsClient();
        setData(data);
      } catch (error) {
        //
      }
    }
    fetchData();
  }, [refrech]);

  useEffect(() => {
    async function fetchGroupClient() {
      try {
        const result = await getClientGroupsService();
        const groups = result?.groups?.map((element: any) => {
          return {
            text: element?.name,
            value: element?.name,
          };
        });

        setGroupClients(groups);
      } catch (error) {
        //
      }
    }

    fetchGroupClient();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const deletedCon = await deleteContractClient(id);

      if (deletedCon) {
        message.success("Le contrat a été supprimer avec succès.");
        const temp = data.filter((item) => item?.id !== id);
        setData(temp);
      }
    } catch (error) {
      
    }
  };
  return (
    <>
      <ContractClientForm refrech={refrech} setRefrech={setRefrech} />
      {editing && (
        <UpdateContractClientForm
          refrech={refrech}
          setRefrech={setRefrech}
          setEditing={setEditing}
          recordData={editing}
        />
      )}
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ContactClient;
