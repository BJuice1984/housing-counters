interface House {
  address: string;
  id: string;
  fias_addrobjs: string[];
}

export interface IAddress {
  id: string;
  number: number;
  str_number: string;
  str_number_full: string;
  house: House;
}

interface Area {
  id: string;
}

export interface IMeter {
  id: string;
  _type: string[];
  area: Area;
  is_automatic: boolean | null;
  communication: string;
  description: string;
  serial_number: string;
  installation_date: string;
  brand_name: string | null;
  model_name: string | null;
  initial_values: number[];
}
