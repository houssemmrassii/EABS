import React, { Key } from "react";
import { getUserService } from "@services/User";
import { Badge, Popconfirm, Space, Table, message } from "antd";
import { DeleteOutlined, EditTwoTone, EyeOutlined } from "@ant-design/icons";

import { useUserContext } from "@/context/UserContext";

import UserForm from "@forms/User/UserForm";

import type { ColumnsType } from "antd/es/table";
import { useGlobal } from "@/context/GlobalContext";
import { UserDataType } from "@/types";
import UpdateUserForm from "@/components/forms/User/UpdateUserForm";

const User: React.FC = () => {
  const { getColumnSearchProps, setSelectedEtabRecord } = useGlobal();
  const { tableData, setTableData } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<UserDataType | null>(null);
  const [refrech, setRefrech] = useState(false);
  const [groupEtabs, setGroupEtabs] = useState<any>([]);
  const Navigate = useNavigate();

  const handleDetailsNavigation = (record: UserDataType) => {
    setSelectedEtabRecord(record);
    Navigate(`/dashboard/etablissement-details/${record?.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserService();

        setTableData(result?.etablissements);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    

    fetchData();
  }, [refrech]);

  const handleDelete = async (key: number | undefined) => {
    if (tableData) {
      try {
        setTimeout(() => {}, 500);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error if needed
      }
    }
  };

  const columns: ColumnsType<UserDataType> = [
    {
      title: "Utilisateur",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", "Utilisateur"),
    },
    {
      title: "G. Utilisateur",
      dataIndex: "group_data.name",
      key: "groupName",
      filters: groupEtabs,
      onFilter: (value, record) => record?.group_data?.name === value,
      render: (_, record: UserDataType) => (
        <>{record?.group_data?.name}</>
      ),
    },
    {
      title: "Fractionnement",
      dataIndex: "fractionnement_data.name",
      key: "Fractionnement",

      render: (_, record: UserDataType) => (
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
      onFilter: (value: boolean | Key, record: UserDataType) =>
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
      <UserForm refrech={refrech} setRefrech={setRefrech} />
      {editing && (
        <UpdateUserForm
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

export default User;
