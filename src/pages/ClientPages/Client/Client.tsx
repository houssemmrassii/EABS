import React, { Key } from "react";
import { getClientService } from "@services/Client";
import { Badge, Popconfirm, Space, Table, message } from "antd";
import { DeleteOutlined, EditTwoTone, EyeOutlined } from "@ant-design/icons";
import {
  deleteClientGroupsService,
  getClientGroupsService,
} from "@services/ClientGroup";
import { useClientContext } from "@/context/ClientContext";

import ClientForm from "@forms/Client/ClientForm";

import type { ColumnsType } from "antd/es/table";
import { useGlobal } from "@/context/GlobalContext";
import { ClientDataType } from "@/types";
import UpdateClientForm from "@/components/forms/Client/UpdateClientForm";

const Client: React.FC = () => {
  const { getColumnSearchProps, setSelectedEtabRecord } = useGlobal();
  const { tableData, setTableData } = useClientContext();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<ClientDataType | null>(null);
  const [refrech, setRefrech] = useState(false);
  const [groupEtabs, setGroupEtabs] = useState<any>([]);
  const Navigate = useNavigate();

  const handleDetailsNavigation = (record: ClientDataType) => {
    setSelectedEtabRecord(record);
    Navigate(`/dashboard/client-details/${record?.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getClientService();

        setTableData(result?.clients);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    async function fetchGroupEtab() {
      try {
        const result = await getClientGroupsService();
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

    fetchData();
  }, [refrech]);

  const handleDelete = async (key: number | undefined) => {
    if (tableData) {
      try {
        await deleteClientGroupsService(key as number);
        setTimeout(() => {}, 500);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error if needed
      }
    }
  };

  const columns: ColumnsType<ClientDataType> = [
    {
      title: "Client",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", "Client"),
    },
    {
      title: "G. Client",
      dataIndex: "group_data.name",
      key: "groupName",
      filters: groupEtabs,
      onFilter: (value, record) => record?.group_data?.name === value,
      render: (_, record: ClientDataType) => (
        <>{record?.group_data?.name}</>
      ),
    },
    {
      title: "Fractionnement",
      dataIndex: "fractionnement_data.name",
      key: "Fractionnement",

      render: (_, record: ClientDataType) => (
        <>{record?.fractionnement_data?.name}</>
      ),
    },
    {
      title: "N° Tél",
      dataIndex: "num_telephone",
      key: "NumTel",
      ...getColumnSearchProps("num_telephone", "N° Tél"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "Email",
      ...getColumnSearchProps("email", "Email"),
    },
    {
      title: "Fax",
      dataIndex: "num_fax",
      key: "Fax",

      ...getColumnSearchProps("num_fax", "Fax"),
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
      onFilter: (value: boolean | Key, record: ClientDataType) =>
        record.active === value,
      render: (_, { active }) => (
        <Badge
          status={active ? "success" : "error"}
          text={active ? "Activé" : "Désactivé"}
        />
      ),
    },
    {
      title: "Paramètres",
      dataIndex: "Paramètres",
      render: (_, record) => (
        <Space size="large" >
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
  return (
    <>
      <ClientForm refrech={refrech} setRefrech={setRefrech} />
      {editing && (
        <UpdateClientForm
          recordData={editing}
          setEditing={setEditing}
          setRefrech={setRefrech}
          refrech={refrech}
        />
      )}
      <Table
        columns={columns}
        loading={loading}
        dataSource={tableData}
        pagination={{ pageSize: 15 }}
        footer={() => ""}
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default Client;
