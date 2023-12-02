import {
  TeamOutlined,
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
  getItem('Etablissement', 'Etab', <TeamOutlined />, [getItem('Group Etablissement', 'E1'), getItem('Etablisement', 'E2')]),
  getItem('Reservation', 'Rez', <TeamOutlined />, [getItem('Reservation', 'R1'), getItem('Reservation', 'R2')]),
];
export default items;
