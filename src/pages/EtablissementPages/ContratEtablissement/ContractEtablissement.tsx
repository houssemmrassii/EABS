import UpdateContractEtablissementForm from "@/components/forms/ContractEtablissement/UpdateContractEtablissementForm";
import {
  deleteContractEtablissement,
  getContractsEtablissement,
} from "@/services/ContractEtablissement";
import { getEtablissementGroupsService } from "@/services/EtablissementGroup";
import { ContractEtablissementDataType } from "@/types";
import { DeleteOutlined, EditTwoTone, EyeOutlined } from "@ant-design/icons";
import ContractEtablissementForm from "@forms/ContractEtablissement/ContractEtablissementForm";
import { Badge, Popconfirm, Space, Tooltip, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import dayjs from "dayjs";
import { useGlobal } from "@/context/GlobalContext";

const ContactEtablissement = () => {
  const { setSelectedContractRecord } = useGlobal();
  const Navigate = useNavigate();
  const [editing, setEditing] = useState<ContractEtablissementDataType | null>(
    null
  );
  const [data, setData] = useState<ContractEtablissementDataType[]>([]);
  const [refrech, setRefrech] = useState<boolean>(false);
  const [groupEtabs, setGroupEtabs] = useState<any>([]);

  const columns: ColumnsType<ContractEtablissementDataType> = [
    {
      title: "Contract Etab.",
      //render: (_, record) => <>N/A</>,
      render: () => <>N/A</>,
    },
    {
      title: "Etab.",
      render: (_, record) => <>{record?.etablissement?.name}</>,
    },
    {
      title: "Group Etab.",
      filters: groupEtabs,
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

  const handleDetailsNavigation = (record: ContractEtablissementDataType) => {
    setSelectedContractRecord(record);
    Navigate(`/dashboard/contract-etablissement-details/${record?.id}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getContractsEtablissement();
        setData(data);
      } catch (error) {
        //
      }
    }
    fetchData();
  }, [refrech]);

  useEffect(() => {
    async function fetchGroupEtab() {
      try {
        const result = await getEtablissementGroupsService();
        const groups = result?.groups?.map((element: any) => {
          return {
            text: element?.name,
            value: element?.name,
          };
        });

        setGroupEtabs(groups);
      } catch (error) {
        //
      }
    }

    fetchGroupEtab();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const deletedCon = await deleteContractEtablissement(id);

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
      <ContractEtablissementForm refrech={refrech} setRefrech={setRefrech} />
      {editing && (
        <UpdateContractEtablissementForm
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

export default ContactEtablissement;
