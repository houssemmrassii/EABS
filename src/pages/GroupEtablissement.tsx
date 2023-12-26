import React, { Key } from "react";
import { Badge, Flex, Popconfirm, Table } from "antd";
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";

import { useGroupEtablissementContext } from "@/context/GroupEtablissementContext";
import {
  getEtablissementGroupsService,
  deleteEtablissementGroupsService,
} from "@services/EtablissementGroup";

import UpdateGroupEtablissementForm from "@forms/EtablissementGroup/UpdateGroupEtablissementForm";
import GroupEtablissementForm from "@forms/EtablissementGroup/GroupEtablissementForm";

import TableHeadSearch from "@forms/TableHeadSearch";

import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: number;
  name: string;
  status: boolean;
}

const GroupEtablissement: React.FC = () => {
  const { tableData, setTableData } = useGroupEtablissementContext();
  const [loading, setloading] = useState(true);
  const [editing, setEditing] = useState<Key | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getEtablissementGroupsService();
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
        await deleteEtablissementGroupsService(key as number);
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

  const tableHeadSearchColumn = [
    TableHeadSearch({
      name: "name",
      title: "Groupe d'établissement",
    }),
  ] as ColumnsType<DataType>;

  const columns: ColumnsType<DataType> = [
    {
      ...tableHeadSearchColumn[0],
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
      // sorter: (a, b) => a.name.length - b.name.length,
      onFilter: (value: boolean | Key, record: DataType) =>
        record.status === value,
      render: (_, { status }) => (
        /*  <Tag color={status ? "blue" : "red"}>
          {status ? "Activé" : "Désactivé"}
        </Tag> */
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
                <DeleteOutlined />
              </Popconfirm>
            </Flex>
          ) : null
        ) : null,
    },
  ];
  return (
    <>
      <GroupEtablissementForm />
      {editing && (
        <UpdateGroupEtablissementForm
          idRecord={editing}
          setEditing={setEditing}
        />
      )}
      <Table
        columns={columns}
        loading={loading}
        rowSelection={{}}
        dataSource={tableData}
        pagination={{ pageSize: 15 }}
        footer={() => ""}
      />
    </>
  );
};

export default GroupEtablissement;
