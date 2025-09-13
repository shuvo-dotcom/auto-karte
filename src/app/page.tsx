'use client';

import React, { useState, useCallback } from 'react';
import InteractiveMap from '@/components/InteractiveMap';
import CommandInterface from '@/components/CommandInterface';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { EnergyFacility, MapCommand, Connection, FacilityType } from '@/types';
import { globalEnergyFacilities, countryCoordinates } from '@/data/globalFacilities';

export default function Home() {
  const [selectedFacilities, setSelectedFacilities] = useState<EnergyFacility[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [filterType, setFilterType] = useState<FacilityType | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  
  // Get unique countries from facilities
  const availableCountries = globalEnergyFacilities ? Array.from(new Set(globalEnergyFacilities.map(f => f.country))).sort() : [];

  const handleSelectAndConnect = useCallback((target: FacilityType, country?: string) => {
    // Filter facilities by country if selected
    const facilities = globalEnergyFacilities || [];
    const filteredFacilities = country 
      ? facilities.filter(f => f.country === country)
      : selectedCountry 
        ? facilities.filter(f => f.country === selectedCountry)
        : facilities;

    // Select specific facility type
    let selectedFacilities = filteredFacilities.filter(f => f.type === target);
    
    if (country) {
      setSelectedCountry(country);
    }
    
    if (selectedFacilities.length >= 2) {
      // Set the selected facilities
      setSelectedFacilities(selectedFacilities);
      setFilterType(target);
      
      // Create connections immediately
      const newConnections: Connection[] = [];
      for (let i = 0; i < selectedFacilities.length - 1; i++) {
        newConnections.push({
          id: `conn-${i}-${i + 1}`,
          from: selectedFacilities[i].id,
          to: selectedFacilities[i + 1].id,
          type: 'line',
          color: '#ff0000'
        });
      }
      setConnections(newConnections);
    }
  }, [globalEnergyFacilities, selectedCountry]);

  const handleCommand = useCallback((command: MapCommand) => {
    // Filter facilities by country if selected
    const facilities = globalEnergyFacilities || [];
    const filteredFacilities = selectedCountry 
      ? facilities.filter(f => f.country === selectedCountry)
      : facilities;

    switch (command.action) {
      case 'select':
        if (command.country) {
          // Select country
          setSelectedCountry(command.country);
          setShowAllFacilities(true);
        } else if (command.target) {
          // Select specific facility type
          let facilities = filteredFacilities.filter(f => f.type === command.target);
          
          // If country is also specified, filter by country too
          if (command.country) {
            facilities = facilities.filter(f => f.country === command.country);
            setSelectedCountry(command.country);
          }
          
          if (command.count) {
            setSelectedFacilities(facilities.slice(0, command.count));
          } else {
            setSelectedFacilities(facilities);
          }
          setFilterType(Array.isArray(command.target) ? command.target[0] : command.target);
        } else if (command.count) {
          // Select random facilities up to count
          const shuffled = [...filteredFacilities].sort(() => 0.5 - Math.random());
          setSelectedFacilities(shuffled.slice(0, command.count));
        } else {
          // Select all facilities
          setSelectedFacilities(filteredFacilities);
          setShowAllFacilities(true);
        }
        break;

      case 'connect':
        if (selectedFacilities.length >= 2) {
          const newConnections: Connection[] = [];
          for (let i = 0; i < selectedFacilities.length - 1; i++) {
            newConnections.push({
              id: `conn-${i}-${i + 1}`,
              from: selectedFacilities[i].id,
              to: selectedFacilities[i + 1].id,
              type: 'line',
              color: '#ff0000'
            });
          }
          setConnections(newConnections);
        }
        break;

      case 'clear':
        setSelectedFacilities([]);
        setConnections([]);
        setFilterType(undefined);
        setShowAllFacilities(false);
        setSelectedCountry('');
        break;

      case 'filter':
        if (command.target) {
          setFilterType(Array.isArray(command.target) ? command.target[0] : command.target);
          setShowAllFacilities(false);
        }
        break;
    }
  }, [selectedFacilities, selectedCountry]);

  const handleCountryChange = useCallback((country: string) => {
    setSelectedCountry(country);
    setSelectedFacilities([]);
    setConnections([]);
    setFilterType(undefined);
    setShowAllFacilities(false);
  }, []);

  const handleFacilitySelect = useCallback((facility: EnergyFacility) => {
    setSelectedFacilities(prev => {
      const isSelected = prev.some(f => f.id === facility.id);
      if (isSelected) {
        return prev.filter(f => f.id !== facility.id);
      } else {
        return [...prev, facility];
      }
    });
  }, []);

  const handleFacilityDeselect = useCallback((facilityId: string) => {
    setSelectedFacilities(prev => prev.filter(f => f.id !== facilityId));
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedFacilities([]);
    setConnections([]);
  }, []);

  const {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    error: voiceError
  } = useVoiceRecognition(handleCommand, handleSelectAndConnect);

  const handleToggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Auto-Karte: Global Energy Map
          </h1>
          <p className="text-gray-600">
            Voice and text-controlled interactive map for energy facilities worldwide
          </p>
          {isListening && transcript && (
            <div className="mt-2 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
              <strong>Listening:</strong> {transcript}
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Command Interface */}
          <div className="lg:col-span-1">
            <ErrorBoundary>
              <CommandInterface
                onCommand={handleCommand}
                onClearSelection={handleClearSelection}
                isListening={isListening}
                onToggleListening={handleToggleListening}
                selectedCount={selectedFacilities.length}
                voiceError={voiceError}
                voiceTranscript={transcript}
                selectedCountry={selectedCountry}
                onCountryChange={handleCountryChange}
                availableCountries={availableCountries}
                onSelectAndConnect={handleSelectAndConnect}
              />
            </ErrorBoundary>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '600px' }}>
              <ErrorBoundary>
                <InteractiveMap
                  selectedFacilities={selectedFacilities}
                  connections={connections}
                  onFacilitySelect={handleFacilitySelect}
                  onFacilityDeselect={handleFacilityDeselect}
                  filterType={filterType}
                  showAllFacilities={showAllFacilities}
                  selectedCountry={selectedCountry}
                  allFacilities={globalEnergyFacilities || []}
                />
              </ErrorBoundary>
            </div>
          </div>
        </div>


        {/* Status Information */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-900 mb-2">Selected Facilities</h3>
            <p className="text-2xl font-bold text-blue-600">{selectedFacilities.length}</p>
            <p className="text-sm text-gray-600">
              {selectedFacilities.length > 0 && (
                <>
                  {selectedFacilities.map(f => f.type).filter((v, i, a) => a.indexOf(v) === i).join(', ')}
                </>
              )}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-900 mb-2">Connections</h3>
            <p className="text-2xl font-bold text-green-600">{connections.length}</p>
            <p className="text-sm text-gray-600">Lines between facilities</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-900 mb-2">Voice Support</h3>
            <p className="text-2xl font-bold text-purple-600">
              {isSupported ? '✓' : '✗'}
            </p>
            <p className="text-sm text-gray-600">
              {isSupported ? 'Available' : 'Not supported'}
            </p>
          </div>
        </div>


        {/* Instructions */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Voice Commands</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• "Select nuclear" - Show all nuclear power plants</li>
                <li>• "Select 4 solar" - Select 4 solar facilities</li>
                <li>• "Connect all" - Connect selected facilities with lines</li>
                <li>• "Clear" - Clear all selections</li>
                <li>• "Filter gas" - Show only gas power plants</li>
              </ul>
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                <div className="font-medium mb-1">Voice Issues? Try these solutions:</div>
                <ul className="space-y-1 text-xs">
                  <li>• <strong>Chrome/Edge:</strong> Works best with these browsers</li>
                  <li>• <strong>HTTPS:</strong> Voice works better on HTTPS sites</li>
                  <li>• <strong>Microphone:</strong> Allow microphone access when prompted</li>
                  <li>• <strong>Network:</strong> Ensure stable internet connection</li>
                  <li>• <strong>Fallback:</strong> Use text commands if voice fails</li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Text Commands</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Type commands in the input field</li>
                <li>• Use quick select buttons for instant selection</li>
                <li>• Click on map markers to select/deselect</li>
                <li>• Use "Connect All" button to link facilities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}