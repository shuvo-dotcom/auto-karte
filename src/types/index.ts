export interface EnergyFacility {
  id: string;
  name: string;
  type: FacilityType;
  coordinates: [number, number]; // [latitude, longitude]
  capacity?: number; // in MW
  status: 'active' | 'inactive' | 'planned';
  region: string;
  country: string;
  description?: string;
}

export type FacilityType = 
  | 'nuclear'
  | 'gas'
  | 'solar'
  | 'hydro'
  | 'offshore_wind'
  | 'onshore_wind'
  | 'coal'
  | 'biomass';

export interface FacilityFilter {
  types: FacilityType[];
  regions: string[];
  status: ('active' | 'inactive' | 'planned')[];
}

export interface MapCommand {
  action: 'select' | 'connect' | 'clear' | 'filter';
  target?: FacilityType | FacilityType[];
  region?: string;
  country?: string;
  count?: number;
  criteria?: string;
}

export interface Connection {
  id: string;
  from: string; // facility id
  to: string; // facility id
  type: 'line' | 'dashed' | 'arrow';
  color?: string;
}
