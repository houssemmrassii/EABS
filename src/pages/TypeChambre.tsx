import React, { Key } from "react";
import { Flex, Popconfirm, Space, Table, message } from "antd";
import { TypeChambreDataType } from "@/types";
import { ColumnsType } from "antd/es/table";
import TypeChambreForm from "@forms/TypeChambreForm";
import { deleteTypeChambre, getTypeChambre } from "@/services/Factory";
import TableHeadSearch from "@/components/forms/TableHeadSearch";
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import UpdateTypeChambreForm from "@/components/forms/UpdateTypeChambreForm";

const TypeChambre: React.FC = () => {
  const [dataSource, setDataSource] = useState<TypeChambreDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setEditing] = useState<TypeChambreDataType | null>(null);

  const tableHeadSearchColumn = [
    TableHeadSearch({
      name: "name",
      title: "Type de chambre",
    }),
  ] as ColumnsType<TypeChambreDataType>;

  const columns: ColumnsType<TypeChambreDataType> = [
    {
      ...tableHeadSearchColumn[0],
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
      onFilter: (value, record) => record.modalite_vente === value,
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
