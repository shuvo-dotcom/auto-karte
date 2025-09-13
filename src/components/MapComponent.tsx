'use client';

import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EnergyFacility, Connection, FacilityType } from '@/types';
import { facilityTypeColors, facilityTypeIcons, countryCoordinates } from '@/data/globalFacilities';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  selectedFacilities: EnergyFacility[];
  connections: Connection[];
  onFacilitySelect: (facility: EnergyFacility) => void;
  onFacilityDeselect: (facilityId: string) => void;
  filterType?: FacilityType;
  showAllFacilities?: boolean;
  selectedCountry?: string;
  allFacilities: EnergyFacility[];
}

const MapController: React.FC<{ 
  selectedFacilities: EnergyFacility[];
  connections: Connection[];
  filterType?: FacilityType;
  showAllFacilities?: boolean;
  selectedCountry?: string;
  allFacilities: EnergyFacility[];
}> = ({ selectedFacilities, connections, filterType, showAllFacilities, selectedCountry, allFacilities }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedFacilities.length > 0) {
      const bounds = L.latLngBounds(
        selectedFacilities.map(facility => [facility.coordinates[0], facility.coordinates[1]])
      );
      map.fitBounds(bounds, { padding: [20, 20] });
    } else if (selectedCountry && countryCoordinates[selectedCountry]) {
      const [lat, lng] = countryCoordinates[selectedCountry];
      map.setView([lat, lng], 6);
    } else if (showAllFacilities) {
      // Show all facilities with a world view
      const bounds = L.latLngBounds(
        allFacilities.map(facility => [facility.coordinates[0], facility.coordinates[1]])
      );
      map.fitBounds(bounds, { padding: [20, 20] });
    } else {
      map.setView([20, 0], 2); // World view
    }
  }, [selectedFacilities, showAllFacilities, selectedCountry, allFacilities, map]);

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({
  selectedFacilities,
  connections,
  onFacilitySelect,
  onFacilityDeselect,
  filterType,
  showAllFacilities = false,
  selectedCountry,
  allFacilities
}) => {
  const [filteredFacilities, setFilteredFacilities] = useState<EnergyFacility[]>([]);

  useEffect(() => {
    let filtered = allFacilities;
    
    // Filter by country if selected
    if (selectedCountry) {
      filtered = filtered.filter(facility => facility.country === selectedCountry);
    }
    
    // Filter by facility type if selected
    if (filterType) {
      filtered = filtered.filter(facility => facility.type === filterType);
    }
    
    setFilteredFacilities(filtered);
  }, [filterType, selectedCountry, allFacilities]);

  const getFacilityIcon = (facility: EnergyFacility) => {
    const isSelected = selectedFacilities.some(f => f.id === facility.id);
    const color = isSelected ? '#ff0000' : facilityTypeColors[facility.type];
    
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          background-color: ${color};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        ">
          ${facilityTypeIcons[facility.type]}
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  const handleMarkerClick = (facility: EnergyFacility) => {
    const isSelected = selectedFacilities.some(f => f.id === facility.id);
    if (isSelected) {
      onFacilityDeselect(facility.id);
    } else {
      onFacilitySelect(facility);
    }
  };

  const getConnectionCoordinates = (connection: Connection) => {
    const fromFacility = allFacilities.find(f => f.id === connection.from);
    const toFacility = allFacilities.find(f => f.id === connection.to);
    
    if (fromFacility && toFacility) {
      return [
        [fromFacility.coordinates[0], fromFacility.coordinates[1]],
        [toFacility.coordinates[0], toFacility.coordinates[1]]
      ];
    }
    return [];
  };

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[20, 0]} // World view
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController 
          selectedFacilities={selectedFacilities}
          connections={connections}
          filterType={filterType}
          showAllFacilities={showAllFacilities}
          selectedCountry={selectedCountry}
          allFacilities={allFacilities}
        />

        {/* Render all facilities or filtered facilities */}
        {(showAllFacilities ? allFacilities : filteredFacilities).map((facility) => (
          <Marker
            key={facility.id}
            position={[facility.coordinates[0], facility.coordinates[1]]}
            icon={getFacilityIcon(facility)}
            eventHandlers={{
              click: () => handleMarkerClick(facility)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{facility.name}</h3>
                <p className="text-sm text-gray-600">
                  {facilityTypeIcons[facility.type]} {facility.type.replace('_', ' ').toUpperCase()}
                </p>
                <p className="text-sm font-medium text-blue-600">Country: {facility.country}</p>
                <p className="text-sm">Capacity: {facility.capacity} MW</p>
                <p className="text-sm">Region: {facility.region}</p>
                <p className="text-sm">Status: {facility.status}</p>
                {facility.description && (
                  <p className="text-xs text-gray-500 mt-1">{facility.description}</p>
                )}
                <div className="mt-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                    onClick={() => handleMarkerClick(facility)}
                  >
                    {selectedFacilities.some(f => f.id === facility.id) ? 'Deselect' : 'Select'}
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Render connections */}
        {connections.map((connection) => {
          const coordinates = getConnectionCoordinates(connection);
          if (coordinates.length === 2) {
            return (
              <Polyline
                key={connection.id}
                positions={coordinates as [number, number][]}
                color={connection.color || '#ff0000'}
                weight={3}
                opacity={0.7}
                dashArray={connection.type === 'dashed' ? '5, 5' : undefined}
              />
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
