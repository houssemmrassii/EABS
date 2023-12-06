import TableComponent from "@/components/Table/TableComponent";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
interface DashboardContentProps {
  dashboardContent: string | undefined;
}

const DashboardContent: React.FC<DashboardContentProps> = (
  props: DashboardContentProps
) => {
  switch (props.dashboardContent) {
    case "DASHBOARD":
      return (
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      );
      break;

    case "GROUP ETABLISSEMENT":
      return <TableComponent />;
    default:
      return (
        <div
          style={{
            height: "90vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingOutlined />{" "}
          <h3 style={{ marginLeft: "5px" }}>
            L'interface {props.dashboardContent} En cours de developpement ...{" "}
          </h3>
        </div>
      );
      break;
  }
};

export default DashboardContent;
