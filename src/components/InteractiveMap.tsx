'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { EnergyFacility, Connection, FacilityType } from '@/types';

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  )
});

interface InteractiveMapProps {
  selectedFacilities: EnergyFacility[];
  connections: Connection[];
  onFacilitySelect: (facility: EnergyFacility) => void;
  onFacilityDeselect: (facilityId: string) => void;
  filterType?: FacilityType;
  showAllFacilities?: boolean;
  selectedCountry?: string;
  allFacilities: EnergyFacility[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = (props) => {
  return <MapComponent {...props} />;
};

export default InteractiveMap;
