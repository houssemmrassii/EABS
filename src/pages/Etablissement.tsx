import React, { Key } from "react";
import { getEtablissementService } from "@services/Etablissement";
import { Badge, Flex, Popconfirm, Table } from "antd";
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import { deleteEtablissementGroupsService } from "@services/EtablissementGroup";
import { useEtablissementContext } from "@/context/EtablissementContext";

import EtablissementForm from "@forms/Etablissement/EtablissementForm";

import type { ColumnsType } from "antd/es/table";
import TableHeadSearch from "@forms/TableHeadSearch";

interface DataType {
  key: number;
  name: string;
  status: boolean;
}

const Etablissement: React.FC = () => {
  const { tableData, setTableData } = useEtablissementContext();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Key | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getEtablissementService();
        let etablissements = result.etablissements;
        let prepareEtablissements = etablissements.map(
          (etablissement: {
            id: number;
            name: string;
            active: boolean;
            group_data: { name: string };
            fractionnement_data: { name: string };
            num_telephone: string;
            email: string;
            num_fax: string;
          }) => ({
            key: etablissement?.id,
            name: etablissement?.name,
            status: etablissement?.active,
            groupName: etablissement?.group_data.name,
            Fractionnement: etablissement?.fractionnement_data.name,
            NumTel: etablissement?.num_telephone,
            Email: etablissement?.email,
            Fax: etablissement?.num_fax,
          })
        );
        setTableData(prepareEtablissements);
        setTimeout(() => {
          setLoading(false);
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
      title: "Établissement",
    }),
  ] as ColumnsType<DataType>;

  const columns: ColumnsType<DataType> = [
    {
      ...tableHeadSearchColumn[0],
    },
    {
      title: "G. Établissement",
      dataIndex: "groupName",
      key: "groupName",
    },
    {
      title: "Fractionnement",
      dataIndex: "Fractionnement",
      key: "Fractionnement",
    },
    {
      title: "N° Tél",
      dataIndex: "NumTel",
      key: "NumTel",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Fax",
      dataIndex: "Fax",
      key: "Fax",
    },
    {
      title: "Statut",
      dataIndex: "status",
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
      <EtablissementForm />
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

export default Etablissement;
