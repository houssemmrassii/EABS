import React from "react";

import { DashboardOutlined } from "@ant-design/icons";

import type { MenuProps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faClipboardList } from "@fortawesome/free-solid-svg-icons";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link to="/dashboard">Tableau de bord</Link>,
    "dashboard",
    <DashboardOutlined />
  ),
  getItem("Etablissement", "etab", <FontAwesomeIcon icon={faBuilding} />, [
    getItem(
      <Link to="/dashboard/etablissement">Etablisement</Link>,
      "etab-etab"
    ),
    getItem(
      <Link to="/dashboard/type-chambre">Type Chambre</Link>,
      "etab-type-chambre"
    ),
    getItem(
      <Link to="/dashboard/contract-etablissement">
        Contract Etablissement
      </Link>,
      "etab-contract-etab"
    ),
    getItem(
      <Link to="/dashboard/group-etablissement">Group Etablissement</Link>,
      "etab-group-etab"
    ),
    // getItem("Contacts Etablissement", "etab-contact-etab"),
    // getItem("Disponibilité de Chambres", "etab-dispo-chambre"),
  ]),
  getItem("Reservation", "reserv", <FontAwesomeIcon icon={faClipboardList} />, [
    getItem("Reservation Intégrale", "reserv-reserv-integral"),
    getItem("Reservation", "reserv-reserv"),
    getItem("Commande", "reserv-commande"),
    getItem("Résa. à prolonger", "reserv-resa-prolonger"),
    getItem("Demandes d'hébergement", "reserv-demande-hebergement"),
  ]),
];

export default items;
