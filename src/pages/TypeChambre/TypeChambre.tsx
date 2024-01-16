import React from "react";
import { TypeChambreDataType } from "@/types";
import type { ColumnsType } from "antd/es/table";
import { useGlobal } from "@/context/GlobalContext";
import TypeChambreForm from "@/components/forms/TypeChambre/TypeChambreForm";
import { Popconfirm, Space, Table, message } from "antd";
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import { deleteTypeChambre, getTypeChambre } from "@/services/Factory";
import UpdateTypeChambreForm from "@/components/forms/TypeChambre/UpdateTypeChambreForm";

const TypeChambre: React.FC = () => {
  const { getColumnSearchProps } = useGlobal();
  const [dataSource, setDataSource] = useState<TypeChambreDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setEditing] = useState<TypeChambreDataType | null>(null);

  const columns: ColumnsType<TypeChambreDataType> = [
    {
      title: "Type de chambre",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", "type de chambre"),
    },
    {
      title: "Type de pension",
      dataIndex: "type_pension",
      key: "type_pension",
      filters: [
        {
          text: "Demi-pension",
          value: "Demi-pension",
        },
        {
          text: "Pension complète",
          value: "Pension complète",
        },
      ],
      onFilter: (value, record) => record.type_pension === value,
    },
    {
      title: "Achat",
      dataIndex: "modalite_achat",
      key: "modalite_achat",
      filters: [
        {
          text: "Standard",
          value: "Standard",
        },
        {
          text: "Par Pax",
          value: "Par Pax",
        },
        {
          text: "Forfaitaire",
          value: "Forfaitaire",
        },
        {
          text: "Par mois",
          value: "Par mois",
        },
      ],
      onFilter: (value, record) => record.modalite_achat === value,
    },
    {
      title: "Vente",
      dataIndex: "modalite_vente",
      key: "modalite_vente",
      filters: [
        {
          text: "Standard",
          value: "Standard",
        },
        {
          text: "Par Pax",
          value: "Par Pax",
        },
        {
          text: "Forfaitaire",
          value: "Forfaitaire",
        },
        {
          text: "Par mois",
          value: "Par mois",
        },
      ],
      onFilter: (value, record) =>
        record.modalite_vente.includes(value.toString()),
    },
    {
      title: "Min",
      dataIndex: "num_min_occupants",
      key: "num_min_occupants",
      sorter: (a: TypeChambreDataType, b: TypeChambreDataType) =>
        a.num_min_occupants - b.num_min_occupants,
    },
    {
      title: "Max",
      dataIndex: "num_max_occupants",
      key: "num_max_occupants",
      sorter: (a: TypeChambreDataType, b: TypeChambreDataType) =>
        a.num_max_occupants - b.num_max_occupants,
    },
    {
      title: "Par déf.",
      dataIndex: "num_defaut_occupants",
      key: "num_defaut_occupants",

      sorter: (a: TypeChambreDataType, b: TypeChambreDataType) =>
        a.num_min_occupants - b.num_min_occupants,
    },
    {
      title: "Paramètres",
      render: (record: TypeChambreDataType) => (
        <Space>
          <EditTwoTone onClick={() => setEditing(record)} />{" "}
          <Popconfirm
            title="Vous êtes sûr de supprimer?"
            onConfirm={() => handleDelete(record?.id as number)}
            okText="Confirmer"
            cancelText="Annuler"
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = async (id: number) => {
    try {
      await deleteTypeChambre(id);
      setDataSource([...dataSource.filter((item) => item?.id !== id)]);
      message.success("Le type chambre a été supprimer avec succès.");
    } catch (error) {
      message.error(error as string);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getTypeChambre();
        setDataSource(data);
        setLoading(false);
      } catch (error) {
        message.error(error as string);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <TypeChambreForm setDataSource={setDataSource} dataSource={dataSource} />
      {editing && (
        <UpdateTypeChambreForm
          recordData={editing}
          setEditing={setEditing}
          dataSource={dataSource}
          setDataSource={setDataSource}
        />
      )}
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: "max-content",
        }}
      />
    </div>
  );
};

export default TypeChambre;
