import { SearchOutlined } from "@ant-design/icons";
import { Flex, Input, Space, Typography } from "antd";
import Highlighter from "react-highlight-words";

type Props = {
  name: string;
  title: string;
};

const TableHeadSearch = (props: Props) => {
  const { name, title } = props;
  const [searchText, setSearchText] = useState("");

  const onFilter = (value: string, record: any) => {
    return record[name].toLowerCase().includes(String(value));
  };

  const handleRender = (text: string) => {
    return (
      <>
        {text.toLocaleLowerCase().includes(String(searchText).toLowerCase()) ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        )}
      </>
    );
  };

  return {
    title: (
      <Flex justify="space-between" align="center">
        <Typography.Text>{title}</Typography.Text>{" "}
        <Space.Compact style={{ width: "50%" }}>
          <Input
            prefix={<SearchOutlined />}
            placeholder={`Rechercher ${title}`}
            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
          />
        </Space.Compact>
      </Flex>
    ),
    dataIndex: name,
    key: name,
    filteredValue: searchText ? [searchText.toLowerCase()] : null,
    onFilter: onFilter,
    render: handleRender,
  };
};

export default TableHeadSearch;
