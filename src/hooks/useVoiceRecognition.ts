'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { MapCommand, FacilityType } from '@/types';

interface UseVoiceRecognitionReturn {
  isListening: boolean;
  transcript: string;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
}

export const useVoiceRecognition = (
  onCommand: (command: MapCommand) => void,
  onSelectAndConnect?: (target: FacilityType, country?: string) => void
): UseVoiceRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      setIsSupported(!!SpeechRecognition);

      if (SpeechRecognition) {
        try {
          recognitionRef.current = new SpeechRecognition();
          const recognition = recognitionRef.current;

          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setError(null);
        };

        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          setTranscript(finalTranscript || interimTranscript);

          // Process final transcript immediately
          if (finalTranscript) {
            processCommand(finalTranscript);
            // Stop listening after processing final transcript
            recognition.stop();
          }
        };

        recognition.onerror = (event: any) => {
          let errorMessage = `Speech recognition error: ${event.error}`;
          
          switch (event.error) {
            case 'network':
              errorMessage = 'Network error: Please check your internet connection and try again.';
              break;
            case 'not-allowed':
              errorMessage = 'Microphone access denied. Please allow microphone access and refresh the page.';
              break;
            case 'no-speech':
              errorMessage = 'No speech detected. Please try speaking again.';
              break;
            case 'audio-capture':
              errorMessage = 'No microphone found. Please connect a microphone and try again.';
              break;
            case 'service-not-allowed':
              errorMessage = 'Speech recognition service not allowed. Please check your browser settings.';
              break;
            default:
              errorMessage = `Speech recognition error: ${event.error}. Please try again.`;
          }
          
          setError(errorMessage);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
          // Clear transcript after a longer delay to show the processed message
          setTimeout(() => {
            setTranscript('');
          }, 5000);
        };
        } catch (err) {
          setError('Failed to initialize speech recognition. Please try refreshing the page.');
          setIsSupported(false);
        }
      }
    }
  }, []);

  const processCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log('Processing voice command:', lowerCommand);
    
    // Clear command
    if (lowerCommand.includes('clear') || lowerCommand.includes('reset')) {
      console.log('Executing clear command');
      onCommand({ action: 'clear' });
      return;
    }

    // Connect command
    if (lowerCommand.includes('connect') || lowerCommand.includes('link')) {
      console.log('Connect command detected');
      // Check if it's a specific facility type + connect command
      if (lowerCommand.includes('solar') && onSelectAndConnect) {
        console.log('Connecting solar facilities');
        onSelectAndConnect('solar');
        return;
      }
      if (lowerCommand.includes('nuclear') && onSelectAndConnect) {
        console.log('Connecting nuclear facilities');
        onSelectAndConnect('nuclear');
        return;
      }
      if (lowerCommand.includes('wind') && onSelectAndConnect) {
        const windType = lowerCommand.includes('offshore') ? 'offshore_wind' : 'onshore_wind';
        console.log('Connecting wind facilities:', windType);
        onSelectAndConnect(windType);
        return;
      }
      if (lowerCommand.includes('hydro') && onSelectAndConnect) {
        console.log('Connecting hydro facilities');
        onSelectAndConnect('hydro');
        return;
      }
      if (lowerCommand.includes('gas') && onSelectAndConnect) {
        console.log('Connecting gas facilities');
        onSelectAndConnect('gas');
        return;
      }
      if (lowerCommand.includes('coal') && onSelectAndConnect) {
        console.log('Connecting coal facilities');
        onSelectAndConnect('coal');
        return;
      }
      if (lowerCommand.includes('biomass') && onSelectAndConnect) {
        console.log('Connecting biomass facilities');
        onSelectAndConnect('biomass');
        return;
      }
      // If no specific type mentioned, just connect existing selection
      console.log('Connecting existing selection');
      onCommand({ action: 'connect' });
      return;
    }

    // Select and connect command
    if (lowerCommand.includes('select') && lowerCommand.includes('connect')) {
      // Extract facility type from command
      if (lowerCommand.includes('solar') && onSelectAndConnect) {
        onSelectAndConnect('solar');
        return;
      }
      if (lowerCommand.includes('nuclear') && onSelectAndConnect) {
        onSelectAndConnect('nuclear');
        return;
      }
      if (lowerCommand.includes('wind') && onSelectAndConnect) {
        const windType = lowerCommand.includes('offshore') ? 'offshore_wind' : 'onshore_wind';
        onSelectAndConnect(windType);
        return;
      }
      if (lowerCommand.includes('hydro') && onSelectAndConnect) {
        onSelectAndConnect('hydro');
        return;
      }
      if (lowerCommand.includes('gas') && onSelectAndConnect) {
        onSelectAndConnect('gas');
        return;
      }
      if (lowerCommand.includes('coal') && onSelectAndConnect) {
        onSelectAndConnect('coal');
        return;
      }
      if (lowerCommand.includes('biomass') && onSelectAndConnect) {
        onSelectAndConnect('biomass');
        return;
      }
    }

    // Country selection
    const countries = ['france', 'germany', 'united kingdom', 'uk', 'spain', 'italy', 'united states', 'usa', 'china', 'japan', 'india', 'brazil', 'australia', 'canada'];
    for (const country of countries) {
      if (lowerCommand.includes(country)) {
        const countryMap: Record<string, string> = {
          'uk': 'United Kingdom',
          'usa': 'United States'
        };
        const countryName = countryMap[country] || country.charAt(0).toUpperCase() + country.slice(1);
        onCommand({ action: 'select', country: countryName });
        return;
      }
    }

    // Select command
    if (lowerCommand.includes('select') || lowerCommand.includes('show') || lowerCommand.includes('find')) {
      console.log('Select command detected');
      // Check for combined country + facility type commands
      for (const country of countries) {
        const countryMap: Record<string, string> = {
          'uk': 'United Kingdom',
          'usa': 'United States'
        };
        const countryName = countryMap[country] || country.charAt(0).toUpperCase() + country.slice(1);
        
        // Nuclear + Country (various phrasings)
        if (lowerCommand.includes('nuclear') && (lowerCommand.includes(country) || 
            lowerCommand.includes(`in ${country}`) || 
            lowerCommand.includes(`${country} nuclear`) ||
            lowerCommand.includes(`nuclear in ${country}`) ||
            lowerCommand.includes(`nuclear facilities in ${country}`) ||
            lowerCommand.includes(`nuclear plants in ${country}`))) {
          console.log('Executing nuclear + country command:', countryName);
          onCommand({ action: 'select', target: 'nuclear', country: countryName });
          return;
        }
        // Solar + Country
        if (lowerCommand.includes('solar') && lowerCommand.includes(country)) {
          onCommand({ action: 'select', target: 'solar', country: countryName });
          return;
        }
        // Wind + Country
        if (lowerCommand.includes('wind') && lowerCommand.includes(country)) {
          const windType = lowerCommand.includes('offshore') ? 'offshore_wind' : 'onshore_wind';
          onCommand({ action: 'select', target: windType, country: countryName });
          return;
        }
        // Hydro + Country
        if (lowerCommand.includes('hydro') && lowerCommand.includes(country)) {
          onCommand({ action: 'select', target: 'hydro', country: countryName });
          return;
        }
        // Gas + Country
        if (lowerCommand.includes('gas') && lowerCommand.includes(country)) {
          onCommand({ action: 'select', target: 'gas', country: countryName });
          return;
        }
        // Coal + Country
        if (lowerCommand.includes('coal') && lowerCommand.includes(country)) {
          onCommand({ action: 'select', target: 'coal', country: countryName });
          return;
        }
      }
      
      // Nuclear
      if (lowerCommand.includes('nuclear') || lowerCommand.includes('nuke')) {
        console.log('Selecting nuclear facilities');
        onCommand({ action: 'select', target: 'nuclear' });
        return;
      }
      
      // Gas
      if (lowerCommand.includes('gas') || lowerCommand.includes('natural gas')) {
        console.log('Selecting gas facilities');
        onCommand({ action: 'select', target: 'gas' });
        return;
      }
      
      // Solar
      if (lowerCommand.includes('solar') || lowerCommand.includes('sun')) {
        console.log('Selecting solar facilities');
        onCommand({ action: 'select', target: 'solar' });
        return;
      }
      
      // Hydro
      if (lowerCommand.includes('hydro') || lowerCommand.includes('water') || lowerCommand.includes('dam')) {
        console.log('Selecting hydro facilities');
        onCommand({ action: 'select', target: 'hydro' });
        return;
      }
      
      // Wind
      if (lowerCommand.includes('wind')) {
        if (lowerCommand.includes('offshore')) {
          console.log('Selecting offshore wind facilities');
          onCommand({ action: 'select', target: 'offshore_wind' });
        } else if (lowerCommand.includes('onshore')) {
          console.log('Selecting onshore wind facilities');
          onCommand({ action: 'select', target: 'onshore_wind' });
        } else {
          console.log('Selecting wind facilities (defaulting to onshore)');
          onCommand({ action: 'select', target: 'onshore_wind' });
        }
        return;
      }
      
      // Coal
      if (lowerCommand.includes('coal')) {
        console.log('Selecting coal facilities');
        onCommand({ action: 'select', target: 'coal' });
        return;
      }
      
      // Biomass
      if (lowerCommand.includes('biomass') || lowerCommand.includes('bio')) {
        console.log('Selecting biomass facilities');
        onCommand({ action: 'select', target: 'biomass' });
        return;
      }
      
      // Check for count
      const countMatch = lowerCommand.match(/(\d+)/);
      if (countMatch) {
        onCommand({ action: 'select', count: parseInt(countMatch[1]) });
        return;
      }
      
      onCommand({ action: 'select' });
      return;
    }

    // Filter command
    if (lowerCommand.includes('filter') || lowerCommand.includes('only')) {
      if (lowerCommand.includes('nuclear')) {
        onCommand({ action: 'filter', target: 'nuclear' });
        return;
      }
      if (lowerCommand.includes('gas')) {
        onCommand({ action: 'filter', target: 'gas' });
        return;
      }
      if (lowerCommand.includes('solar')) {
        onCommand({ action: 'filter', target: 'solar' });
        return;
      }
      if (lowerCommand.includes('hydro')) {
        onCommand({ action: 'filter', target: 'hydro' });
        return;
      }
      if (lowerCommand.includes('wind')) {
        if (lowerCommand.includes('offshore')) {
          onCommand({ action: 'filter', target: 'offshore_wind' });
        } else {
          onCommand({ action: 'filter', target: 'onshore_wind' });
        }
        return;
      }
    }

    // If no specific command recognized, try to parse as general select
    console.log('No specific command matched, executing general select');
    onCommand({ action: 'select' });
  }, [onCommand, onSelectAndConnect]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        setError(null); // Clear any previous errors
        recognitionRef.current.start();
      } catch (err) {
        setError('Failed to start voice recognition. Please try again.');
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    error
  };
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
