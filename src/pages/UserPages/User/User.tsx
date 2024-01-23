import React, { Key } from "react";
import { getUserService, getUsersRolesService } from "@services/User";
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
  const [rolesUsers, setRolesUsers] = useState<any>([]);
  const Navigate = useNavigate();


  useEffect(() => {
    async function fetchGroupEtab() {
      try {
        const result = await getUsersRolesService();
        const groups = result?.roles?.map((element: any) => {
          return {
            text: element?.name,
            value: element?.name,
          };
        });

        setRolesUsers(groups);
      } catch (error) {
        //message.error((error as Error)?.message);
      }
    }

    fetchGroupEtab();
    const fetchData = async () => {
      try {
        const result = await getUserService();

        setTableData(result?.users);
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
      dataIndex: "username",
      key: "username",
      ...getColumnSearchProps("username", "Utilisateur"),
    },
    {
      title: "Groupe Utilisateur",
      dataIndex: "group_data.name",
      key: "groupName",
      filters: rolesUsers,
      onFilter: (value, record) => record?.username === value,
      render: (_, record: UserDataType) => <>{record?.username}</>,
    },
    {
      title: "N° Tél",
      dataIndex: "tel",
      key: "tel",
      ...getColumnSearchProps("tel", "N° Tél"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "Email",
      ...getColumnSearchProps("email", "Email"),
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
        <Space size="large">
          <EditTwoTone onClick={() => setEditing(record)} />
          <Popconfirm
            title="Vous êtes sûr de supprimer?"
            onConfirm={() => handleDelete(record?.id)}
            okText="Confirmer"
            cancelText="Annuler"
          >
            <DeleteOutlined style={{ color: "red" }} />
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
