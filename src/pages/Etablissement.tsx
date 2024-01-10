import React, { Key } from "react";
import { getEtablissementService } from "@services/Etablissement";
import { Badge, Popconfirm, Space, Table, message } from "antd";
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import {
  deleteEtablissementGroupsService,
  getEtablissementGroupsService,
} from "@services/EtablissementGroup";
import { useEtablissementContext } from "@/context/EtablissementContext";

import EtablissementForm from "@forms/Etablissement/EtablissementForm";

import type { ColumnsType } from "antd/es/table";
import { useGlobal } from "@/context/GlobalContext";
import { EtablissementDataType } from "@/types";
import UpdateEtablissementForm from "@/components/forms/Etablissement/UpdateEtablissementForm";

const Etablissement: React.FC = () => {
  const { getColumnSearchProps } = useGlobal();
  const { tableData, setTableData } = useEtablissementContext();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<EtablissementDataType | null>(null);
  const [refrech, setRefrech] = useState(false);
  const [groupEtabs, setGroupEtabs] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getEtablissementService();

        setTableData(result?.etablissements);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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
        message.error((error as Error)?.message);
      }
    }

    fetchGroupEtab();

    fetchData();
  }, [refrech]);

  const handleDelete = async (key: number | undefined) => {
    if (tableData) {
      try {
        await deleteEtablissementGroupsService(key as number);
        setTimeout(() => {}, 500);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error if needed
      }
    }
  };

  const columns: ColumnsType<EtablissementDataType> = [
    {
      title: "Établissement",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", "Établissement"),
    },
    {
      title: "G. Établissement",
      dataIndex: "group_data.name",
      key: "groupName",
      filters: groupEtabs,
      onFilter: (value, record) => record?.group_data?.name === value,
      render: (_, record: EtablissementDataType) => (
        <>{record?.group_data?.name}</>
      ),
    },
    {
      title: "Fractionnement",
      dataIndex: "fractionnement_data.name",
      key: "Fractionnement",

      render: (_, record: EtablissementDataType) => (
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
      onFilter: (value: boolean | Key, record: EtablissementDataType) =>
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
        <Space>
          <EditTwoTone onClick={() => setEditing(record)} />

          <Popconfirm
            title="Vous êtes sûr de supprimer?"
            onConfirm={() => handleDelete(record?.id)}
            okText="Confirmer"
            cancelText="Annuler"
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <EtablissementForm refrech={refrech} setRefrech={setRefrech} />
      {editing && (
        <UpdateEtablissementForm
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

export default Etablissement;
