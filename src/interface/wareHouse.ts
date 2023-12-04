export interface WareHouses {
    id:           number;
    name:         string;
    branchoffice: Branchoffice;
    costCenter:   Branchoffice;
}

export interface Branchoffice {
    id:   number;
    name: string;
}
