export interface EtablissementDataType {
  key: number;
  status?: boolean;
  active?: boolean;
  address?: string;
  adresse_banque?: null | string;
  banque?: null | string;
  bic?: null | string;
  code_banque?: null | string;
  code_guichet?: null | string;
  code_naf?: null | string;
  code_postal?: string;
  compte_banque?: null | string;
  creation_date?: string;
  departments?: string;
  email?: string;
  fractionnement_data?: {
    active?: boolean;
    creation_date?: string;
    id?: number;
    name?: string;
  };
  group_data?: {
    active?: boolean;
    creation_date?: string;
    id?: number;
    name?: string;
  };
  group_id?: number;
  iban?: null | string;
  id?: number;
  id_fractionnement?: number;
  immatriculation?: null | string;
  name?: string;
  num_fax?: string;
  num_portable?: string;
  num_telephone?: string;
  region?: string;
  siret?: null | string;
  tva_instra_communautaire?: null | string;
  ville?: string;
}

export interface UserDataType {
  key: number;
  id: number;
  active?: boolean;
  email?: string;
  role_id?: number;
  username?: string;
  gender?:string
  tel?:string
}
export interface ClientDataType {
  key: number;
  status?: boolean;
  active?: boolean;
  address?: string;
  adresse_banque?: null | string;
  banque?: null | string;
  bic?: null | string;
  code_banque?: null | string;
  code_guichet?: null | string;
  code_naf?: null | string;
  code_postal?: string;
  compte_banque?: null | string;
  creation_date?: string;
  departments?: string;
  email?: string;
  fractionnement_data?: {
    active?: boolean;
    creation_date?: string;
    id?: number;
    name?: string;
  };
  group_data?: {
    active?: boolean;
    creation_date?: string;
    id?: number;
    name?: string;
  };
  group_id?: number;
  iban?: null | string;
  id?: number;
  id_fractionnement?: number;
  immatriculation?: null | string;
  name?: string;
  num_fax?: string;
  num_portable?: string;
  num_telephone?: string;
  region?: string;
  siret?: null | string;
  tva_instra_communautaire?: null | string;
  ville?: string;
}
export type ContractEtablissementDataType = {
  id: number;
  active: boolean;
  creation_date: string;
  end_date: string;
  etablissement: EtablissementDataType;
  etablissement_id: number;
  fractionnement: Fractionnement;
  fractionnement_id: number;
  start_date: string;
  type_chambres: TypeChambre[];
};

export type ContractClientDataType = {
  id: number;
  active: boolean;
  creation_date: string;
  end_date: string;
  etablissement: EtablissementDataType;
  etablissement_id: number;
  fractionnement: Fractionnement;
  fractionnement_id: number;
  start_date: string;
  type_chambres: TypeChambre[];
};
export interface GroupEtablissementDataType {
  key: number;
  name: string;
  status: boolean;
}
export interface GroupClientDataType {
  key: number;
  name: string;
  status: boolean;
}
interface Fractionnement {
  active: boolean;
  creation_date: string;
  id: number;
  name: string;
}

interface TypeChambre {
  active: boolean;
  creation_date: string;
  default_pax: number | null;
  num_chambres: string;
  prix_achat: string;
  type_chambre: number;
}

export interface TypeChambreDataType {
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
}

export type SelectTOptionType = {
  label: string;
  value: string | number;
};

export type SelectTOptionTypeWithId = {
  label: string;
  value: string | number;
  id: number | string;
};
