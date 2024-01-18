import React, { Key } from "react";
import { Badge, Flex, Popconfirm, Table } from "antd";
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";

import { useGroupClientContext } from "@/context/GroupClientContext";
import {
  getClientGroupsService,
  deleteClientGroupsService,
} from "@services/ClientGroup";

import UpdateGroupClientForm from "@forms/ClientGroup/UpdateGroupClientForm";
import GroupClientForm from "@forms/ClientGroup/GroupClientForm";

import type { ColumnsType } from "antd/es/table";
import { useGlobal } from "@/context/GlobalContext";

interface DataType {
  key: number;
  name: string;
  status: boolean;
}

const GroupClient: React.FC = () => {
  const { getColumnSearchProps } = useGlobal();
  const { tableData, setTableData } = useGroupClientContext();
  const [loading, setloading] = useState(true);
  const [editing, setEditing] = useState<Key | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getClientGroupsService();
        let groups = result.groups;
        let prepareGroups = groups.map(
          (group: { id: number; name: string; active: boolean }) => ({
            key: group.id,
            name: group.name,
            status: group.active,
          })
        );
        setTableData(prepareGroups);
        setTimeout(() => {
          setloading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error if needed
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (key: React.Key) => {
    if (tableData) {
      try {
        await deleteClientGroupsService(key as number);
        setTimeout(() => {
          const newData = tableData.filter((item) => item.key !== key);
          setTableData(newData);
        }, 500);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error if needed
      }
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Groupe Client",
      dataIndex: "name",
      ...getColumnSearchProps("name", "Groupe Client"),
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      width: "10%",
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
      onFilter: (value: boolean | Key, record: DataType) =>
        record.status === value,
      render: (_, { status }) => (
        <Badge
          status={status ? "success" : "error"}
          text={status ? "Activé" : "Désactivé"}
        />
      ),
    },
    {
      title: "Paramètres",
      dataIndex: "Paramètres",
      render: (_, record: { key: React.Key }) =>
        tableData ? (
          tableData.length >= 1 ? (
            <Flex justify={"space-around"} align={"center"}>
              <EditTwoTone onClick={() => setEditing(record.key)} />{" "}
              <Popconfirm
                title="Vous êtes sûr de supprimer?"
                onConfirm={() => handleDelete(record.key)}
                okText="Confirmer"
                cancelText="Annuler"
              >
                <DeleteOutlined style={{color:"red"}} />
              </Popconfirm>
            </Flex>
          ) : null
        ) : null,
    },
  ];
  return (
    <>
      <GroupClientForm />
      {editing && (
        <UpdateGroupClientForm
          idRecord={editing}
          setEditing={setEditing}
        />
      )}
      <Table
        columns={columns}
        loading={loading}
        dataSource={tableData}
        pagination={{ pageSize: 15 }}
        footer={() => ""}
      />
    </>
  );
};

export default GroupClient;
