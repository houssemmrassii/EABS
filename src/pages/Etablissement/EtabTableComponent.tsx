import { SearchOutlined, DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import React, { Key, useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Badge, Button, Flex, Input, Popconfirm, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { deleteEtablissementGroupsService } from "../../services/GroupEtablissement/GroupEtablissementServices";
import { useEtablissementContext } from "@/context/EtablissementContext/EtablissementContext";
import { getEtablissementService } from "@/services/Etablissement/EtablissementServices";
import EtablissementForm from "./EtablissementForm/EtablissementForm";
interface DataType {
  key: number;
  name: string;
  status: boolean;
}

type DataIndex = keyof DataType;

const EtabTableComponent: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const { tableData, setTableData } = useEtablissementContext();
  const [searchedColumn, setSearchedColumn] = useState("");
  const [loading, setloading] = useState(true);
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
          setloading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error if needed
      }
    };

    fetchData();
  }, []);
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (
    clearFilters: () => void,
    confirm: (param?: FilterConfirmProps) => void
  ) => {
    clearFilters();
    setSearchText("");
    confirm();
  };
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
  const getColumnSearchProps = (
    dataIndex: DataIndex,
    searchTitle: String
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Rechercher ${searchTitle}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 120 }}
          >
            Rechercher
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Réinitialiser
          </Button>
          {/*  <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Fermer
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Établissements",
      dataIndex: "name",
      key: "name",
      width: "15%",
      // sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name", "Établissements"),
    },
    {
      title: "Groupe Établissement",
      dataIndex: "groupName",
      key: "groupName",
      width: "15%",
    },
    {
      title: "Fractionnement",
      dataIndex: "Fractionnement",
      key: "Fractionnement",
      width: "15%",
    },
    {
      title: "Num. tél",
      dataIndex: "NumTel",
      key: "NumTel",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      width: "15%",
    },
    {
      title: "Fax",
      dataIndex: "Fax",
      key: "Fax",
      width: "15%",
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      width: "15%",
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
      {/* {editing && (
        <UpdateEtablissementForm idRecord={editing} setEditing={setEditing} />
      )} */}
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

export default EtabTableComponent;
