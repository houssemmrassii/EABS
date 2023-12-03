import React from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Menu, theme } from "antd";
import items from "../../consts/SideBar/SideBarItems";
const { Header, Content, Footer, Sider } = Layout;
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";

const Dashboard: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#001b79",
          colorInfo: "#001b79",
          colorSuccess: "#69ea29e6",
          colorError: "#dc1417",
          wireframe: false,
          borderRadius: 9,
        },
      }}
    >
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            color: "#F2F6FA",
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
          />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: !collapsed ? 200 : 100,
            transition: "all 0.1s ease-in-out",
            minHeight: "100vh",
          }}
        >
          <Header style={{ padding: 0, background: colorBgContainer }}>
            {" "}
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
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
          </Content>
          <Footer style={{ textAlign: "center" }}>EBAS3 ©2023</Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Dashboard;
