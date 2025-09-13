'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Trash2, Zap, Wind, Sun, Droplets, Flame, Mountain } from 'lucide-react';
import { FacilityType, MapCommand } from '@/types';

interface CommandInterfaceProps {
  onCommand: (command: MapCommand) => void;
  onClearSelection: () => void;
  isListening: boolean;
  onToggleListening: () => void;
  selectedCount: number;
  voiceError?: string | null;
  voiceTranscript?: string;
  selectedCountry?: string;
  onCountryChange: (country: string) => void;
  availableCountries?: string[];
  onSelectAndConnect?: (target: FacilityType, country?: string) => void;
}

const CommandInterface: React.FC<CommandInterfaceProps> = ({
  onCommand,
  onClearSelection,
  isListening,
  onToggleListening,
  selectedCount,
  voiceError,
  voiceTranscript,
  selectedCountry,
  onCountryChange,
  availableCountries = [],
  onSelectAndConnect
}) => {
  const [textCommand, setTextCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const facilityTypeIcons: Record<FacilityType, React.ReactNode> = {
    nuclear: <Zap className="w-4 h-4" />,
    gas: <Flame className="w-4 h-4" />,
    solar: <Sun className="w-4 h-4" />,
    hydro: <Droplets className="w-4 h-4" />,
    offshore_wind: <Wind className="w-4 h-4" />,
    onshore_wind: <Wind className="w-4 h-4" />,
    coal: <Mountain className="w-4 h-4" />,
    biomass: <Mountain className="w-4 h-4" />
  };

  const facilityTypes: { type: FacilityType; label: string }[] = [
    { type: 'nuclear', label: 'Nuclear' },
    { type: 'gas', label: 'Gas' },
    { type: 'solar', label: 'Solar' },
    { type: 'hydro', label: 'Hydro' },
    { type: 'offshore_wind', label: 'Offshore Wind' },
    { type: 'onshore_wind', label: 'Onshore Wind' },
    { type: 'coal', label: 'Coal' },
    { type: 'biomass', label: 'Biomass' }
  ];

  const parseCommand = (command: string): MapCommand | null => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Clear command
    if (lowerCommand.includes('clear') || lowerCommand.includes('reset')) {
      return { action: 'clear' };
    }

    // Connect command
    if (lowerCommand.includes('connect') || lowerCommand.includes('link')) {
      return { action: 'connect' };
    }

    // Country selection
    for (const country of availableCountries) {
      if (lowerCommand.includes(country.toLowerCase())) {
        return { action: 'select', country: country };
      }
    }

    // Select command
    if (lowerCommand.includes('select') || lowerCommand.includes('show') || lowerCommand.includes('find')) {
      // Find facility type
      for (const { type, label } of facilityTypes) {
        if (lowerCommand.includes(type) || lowerCommand.includes(label.toLowerCase())) {
          return { action: 'select', target: type };
        }
      }
      
      // Check for count
      const countMatch = lowerCommand.match(/(\d+)/);
      if (countMatch) {
        return { action: 'select', count: parseInt(countMatch[1]) };
      }
      
      return { action: 'select' };
    }

    // Filter command
    if (lowerCommand.includes('filter') || lowerCommand.includes('only')) {
      for (const { type, label } of facilityTypes) {
        if (lowerCommand.includes(type) || lowerCommand.includes(label.toLowerCase())) {
          return { action: 'filter', target: type };
        }
      }
    }

    return null;
  };

  const handleTextCommand = async () => {
    if (!textCommand.trim()) return;

    setIsProcessing(true);
    const command = parseCommand(textCommand);
    
    if (command) {
      onCommand(command);
      setTextCommand('');
    } else {
      alert('Command not recognized. Try: "select nuclear", "connect all", "clear", etc.');
    }
    
    setIsProcessing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTextCommand();
    }
  };

  const handleQuickSelect = (type: FacilityType) => {
    onCommand({ action: 'select', target: type });
  };

  const handleConnectAll = () => {
    onCommand({ action: 'connect' });
  };

  useEffect(() => {
    if (isListening && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isListening]);

  // Update text input when voice transcript changes (only for display, not auto-processing)
  useEffect(() => {
    if (voiceTranscript && !isListening) {
      // Only update text field if we're not currently listening
      // This prevents overwriting while user is speaking
      setTextCommand(voiceTranscript);
      
      // Clear the processed message after 3 seconds
      const timer = setTimeout(() => {
        setTextCommand('');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [voiceTranscript, isListening]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Command Interface</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {selectedCount} selected
          </span>
          <button
            onClick={onClearSelection}
            className="p-2 text-red-500 hover:bg-red-50 rounded"
            title="Clear Selection"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Country Selection */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-800 mb-2">
          Select Country:
        </label>
        <select
          value={selectedCountry || ''}
          onChange={(e) => onCountryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All Countries</option>
          {availableCountries && availableCountries.length > 0 && availableCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Voice Control */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={onToggleListening}
            className={`p-3 rounded-full transition-colors ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title={isListening ? 'Stop Listening' : 'Start Voice Command'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <span className="text-sm text-gray-600">
            {isListening ? 'Listening...' : 'Click to start voice command'}
          </span>
        </div>
        {isListening && voiceTranscript && (
          <div className="mt-2 p-2 bg-blue-100 border border-blue-300 rounded text-sm text-blue-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <strong>Listening:</strong> 
              <span className="text-blue-600">{voiceTranscript}</span>
            </div>
          </div>
        )}
        {!isListening && voiceTranscript && (
          <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded text-sm text-green-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <strong>✓ Command Processed:</strong> 
              <span className="text-green-600">{voiceTranscript}</span>
            </div>
          </div>
        )}
        {voiceError && (
          <div className="mt-2 p-3 bg-red-100 border border-red-300 rounded text-sm text-red-700">
            <div className="font-medium mb-2">Voice Recognition Error:</div>
            <div className="mb-2">{voiceError}</div>
            <div className="space-y-2">
              <button
                onClick={onToggleListening}
                className="mr-2 px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
              >
                Try Again
              </button>
              <div className="text-xs text-red-600">
                <strong>Alternative:</strong> Use text commands below or click the quick select buttons
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Text Command Input */}
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={textCommand}
            onChange={(e) => setTextCommand(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type command: 'select nuclear', 'connect all', 'clear'..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
            disabled={isProcessing}
          />
          <button
            onClick={handleTextCommand}
            disabled={isProcessing || !textCommand.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-bold text-gray-800 mb-3">Quick Select Facilities:</h4>
          <div className="grid grid-cols-2 gap-2">
            {facilityTypes.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => handleQuickSelect(type)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 rounded-md transition-colors shadow-sm"
              >
                {facilityTypeIcons[type]}
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-gray-800 mb-3">Actions:</h4>
          <div className="flex gap-2">
            <button
              onClick={handleConnectAll}
              disabled={selectedCount < 2}
              className="flex-1 px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium shadow-sm"
            >
              <Zap className="w-4 h-4" />
              Connect All Selected
            </button>
          </div>
          {selectedCount < 2 && (
            <p className="text-xs text-gray-500 mt-1">
              Select at least 2 facilities to connect them
            </p>
          )}
        </div>
      </div>


      {/* Command Examples */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h4 className="text-sm font-bold text-blue-800 mb-3">Voice & Text Commands:</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p className="font-medium">• "select nuclear" - Show all nuclear plants</p>
          <p className="font-medium">• "select nuclear in France" - Nuclear plants in France</p>
          <p className="font-medium">• "select 4 solar" - Select 4 solar facilities</p>
          <p className="font-medium">• "select France" - Show facilities in France</p>
          <p className="font-medium">• "select wind in Germany" - Wind farms in Germany</p>
          <p className="font-medium">• "connect solar" - Select & connect solar facilities</p>
          <p className="font-medium">• "connect nuclear" - Select & connect nuclear facilities</p>
          <p className="font-medium">• "connect wind" - Select & connect wind facilities</p>
          <p className="font-medium">• "connect hydro" - Select & connect hydro facilities</p>
          <p className="font-medium">• "connect gas" - Select & connect gas facilities</p>
          <p className="font-medium">• "connect coal" - Select & connect coal facilities</p>
          <p className="font-medium">• "connect biomass" - Select & connect biomass facilities</p>
          <p className="font-medium">• "connect all" - Connect selected facilities</p>
          <p className="font-medium">• "clear" - Clear selection</p>
        </div>
      </div>
    </div>
  );
};

export default CommandInterface;
