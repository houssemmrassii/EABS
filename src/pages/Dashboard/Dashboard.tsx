import React from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  DashboardOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Affix,
  Button,
  Col,
  Collapse,
  ConfigProvider,
  Divider,
  Flex,
  Layout,
  Menu,
  MenuProps,
  Tooltip,
  theme,
} from "antd";
import items from "../../consts/SideBar/SideBarItems";
const { Header, Content, Footer, Sider } = Layout;

import Integral from "../../assets/svg/integral.svg";
import { useGlobal } from "@/context/GlobalContext/GlobalContext";
import DashboardContent from "./DashboardContent";

const Dashboard: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = React.useState(true);
  const { dashboardContent, setDashboardContent } = useGlobal();

  const onClick: MenuProps["onClick"] = (e) => {
    setDashboardContent(e.key);
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#336dc4",
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
            top: 65,
            bottom: 0,
            color: "#F2F6FA",
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" items={items} onClick={onClick} />
        </Sider>
        <Layout
          className="site-layout"
          // style={{
          //  marginLeft: !collapsed ? 200 : 100,
          //   transition: "all 0.1s ease-in-out",
          //   minHeight: "100vh",
          // }}
        >
          <Affix offsetTop={0}>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              {" "}
              <Flex gap="middle" align="center" justify="space-between">
                <Col>
                  <Button
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                    }}
                  />
                  <Button
                    type="text"
                    icon={
                      <>
                        <DashboardOutlined /> Tableau de bord
                      </>
                    }
                    style={{
                      fontSize: "16px",
                      width: 150,
                      height: 64,
                    }}
                  />
                  <Tooltip title="Résa intégrale">
                    <Button
                      type="text"
                      icon={<img src={Integral} height={15} width={15} />}
                      style={{
                        fontSize: "16px",
                        width: 50,
                        height: 64,
                      }}
                    />
                  </Tooltip>
                </Col>

                <Button
                  type="text"
                  icon={<LogoutOutlined />}
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              </Flex>
            </Header>
          </Affix>
          <Content
            style={{
              margin: "26px 16px 0",
              overflow: "initial",
              marginLeft: !collapsed ? 220 : 100,
              transition: "all 0.1s ease-in-out",
              minHeight: "100vh",
            }}
          >
            <DashboardContent dashboardContent={dashboardContent} />
          </Content>
          <Footer style={{ textAlign: "center" }}>EBAS3 ©2023</Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Dashboard;
