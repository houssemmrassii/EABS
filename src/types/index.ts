export interface EtablissementDataType {
  key: number;
  name: string;
  groupName: string;
  Fractionnement: string;
  NumTel: string;
  Email: string;
  Fax: string;
  status: boolean;
}

export interface GroupEtablissementDataType {
  key: number;
  name: string;
  status: boolean;
}

export interface TypeChambreDataType  {
  id: number | undefined;
  key: number;
  name: string;
  type_pension: string;
  modalite_achat: string;
  modalite_vente: string;
  num_min_occupants: number;
  num_max_occupants: number;
  num_defaut_occupants: number;
  active: boolean;
};
