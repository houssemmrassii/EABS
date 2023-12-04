import {
  TeamOutlined,
  DashboardOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import React from "react";
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem('Tableau de bord', 'DASHBOARD', <DashboardOutlined />),
  getItem('Etablissement', 'ETABLISSEMENT', <TeamOutlined />, [getItem('Group Etablissement', 'GROUP ETABLISSEMENT'), getItem('Etablisement', 'ETABLISSEMENT')]),
  getItem('Reservation', 'RESERVATION', <TeamOutlined />, [getItem('Reservation', 'RESERVATION')]),
];
export default items;
