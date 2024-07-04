export interface ReservationPayload {
  key?: React.Key;
  id?: number;
  name: string;
  date: string;
  typeDeReservation: string;
  periodeTotal: {
    startDate: string;
    endDate: string;
  };
  status: string;
  contratClient: ContractClientDataType; // Change to ContractClientDataType
  contratEtablissement: ContractEtablissementDataType; // Change to ContractEtablissementDataType
}


export interface ReservationDataType {
  key?: React.Key; // Make key optional
  id: number;
  name: string;
  date: string;
  typeDeReservation: string;
  periodeTotal: {
    startDate: string;
    endDate: string;
  };
  status: string;
  contratClient: ContractClientDataType;
  contratEtablissement: ContractEtablissementDataType;
}


export interface Reservation extends ReservationPayload {
  key: React.Key;
  id: number;
}

export interface ReservationFormProps {
  initialData?: Reservation | null;
  onSubmit: (data: ReservationPayload) => void;  // Update to ReservationPayload
  establishmentContracts: SelectOptionType[];
  clientContracts: SelectOptionType[];
}

export interface ApiResponse<T> {
  message: string;
  data: T;
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

export interface Fractionnement {
  active: boolean;
  creation_date: string;
  id: number;
  name: string;
}

export interface TypeChambre {
  active: boolean;
  creation_date: string;
  default_pax: number | null;
  num_chambres: string;
  prix_achat: string;
  type_chambre: number;
}

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

export interface SelectOptionType {
  label: string;
  value: string | number;
}
