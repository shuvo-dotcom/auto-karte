import { EnergyFacility } from '@/types';

export const globalEnergyFacilities: EnergyFacility[] = [
  // FRANCE
  {
    id: 'france-nuclear-1',
    name: 'Gravelines Nuclear Power Plant',
    type: 'nuclear',
    coordinates: [50.9981, 2.1281],
    capacity: 5700,
    status: 'active',
    region: 'Hauts-de-France',
    country: 'France',
    description: 'Largest nuclear power plant in France'
  },
  {
    id: 'france-nuclear-2',
    name: 'Paluel Nuclear Power Plant',
    type: 'nuclear',
    coordinates: [49.8833, 0.6333],
    capacity: 5320,
    status: 'active',
    region: 'Normandie',
    country: 'France',
    description: 'Nuclear power plant on the Channel coast'
  },
  {
    id: 'france-solar-1',
    name: 'Cestas Solar Park',
    type: 'solar',
    coordinates: [44.7333, -0.6833],
    capacity: 300,
    status: 'active',
    region: 'Nouvelle-Aquitaine',
    country: 'France',
    description: 'One of the largest solar parks in France'
  },
  {
    id: 'france-wind-1',
    name: 'Saint-Nazaire Offshore Wind Farm',
    type: 'offshore_wind',
    coordinates: [47.2167, -2.2000],
    capacity: 480,
    status: 'active',
    region: 'Pays de la Loire',
    country: 'France',
    description: 'First commercial offshore wind farm in France'
  },

  // GERMANY
  {
    id: 'germany-nuclear-1',
    name: 'Isar Nuclear Power Plant',
    type: 'nuclear',
    coordinates: [48.6167, 12.2833],
    capacity: 1485,
    status: 'inactive',
    region: 'Bavaria',
    country: 'Germany',
    description: 'Nuclear power plant in Bavaria (decommissioned)'
  },
  {
    id: 'germany-solar-1',
    name: 'Neuhardenberg Solar Park',
    type: 'solar',
    coordinates: [52.6000, 14.2500],
    capacity: 145,
    status: 'active',
    region: 'Brandenburg',
    country: 'Germany',
    description: 'Large solar park in Brandenburg'
  },
  {
    id: 'germany-wind-1',
    name: 'Alpha Ventus Offshore Wind Farm',
    type: 'offshore_wind',
    coordinates: [54.0000, 6.5000],
    capacity: 60,
    status: 'active',
    region: 'North Sea',
    country: 'Germany',
    description: 'First German offshore wind farm'
  },
  {
    id: 'germany-coal-1',
    name: 'Niederaußem Coal Power Plant',
    type: 'coal',
    coordinates: [50.9833, 6.6167],
    capacity: 3000,
    status: 'active',
    region: 'North Rhine-Westphalia',
    country: 'Germany',
    description: 'Large coal-fired power plant'
  },

  // UNITED KINGDOM
  {
    id: 'uk-nuclear-1',
    name: 'Hinkley Point C Nuclear Power Station',
    type: 'nuclear',
    coordinates: [51.2000, -3.1333],
    capacity: 3200,
    status: 'planned',
    region: 'Somerset',
    country: 'United Kingdom',
    description: 'New nuclear power station under construction'
  },
  {
    id: 'uk-wind-1',
    name: 'Hornsea One Offshore Wind Farm',
    type: 'offshore_wind',
    coordinates: [54.0000, 1.5000],
    capacity: 1200,
    status: 'active',
    region: 'North Sea',
    country: 'United Kingdom',
    description: 'World\'s largest offshore wind farm'
  },
  {
    id: 'uk-gas-1',
    name: 'Drax Power Station',
    type: 'gas',
    coordinates: [53.7333, -0.9833],
    capacity: 3960,
    status: 'active',
    region: 'Yorkshire',
    country: 'United Kingdom',
    description: 'Large gas and biomass power station'
  },

  // SPAIN
  {
    id: 'spain-solar-1',
    name: 'Núñez de Balboa Solar Plant',
    type: 'solar',
    coordinates: [38.5000, -6.0000],
    capacity: 500,
    status: 'active',
    region: 'Extremadura',
    country: 'Spain',
    description: 'Largest solar plant in Europe'
  },
  {
    id: 'spain-wind-1',
    name: 'El Hierro Wind Farm',
    type: 'onshore_wind',
    coordinates: [27.8000, -18.0000],
    capacity: 11,
    status: 'active',
    region: 'Canary Islands',
    country: 'Spain',
    description: 'Wind farm powering entire island'
  },
  {
    id: 'spain-hydro-1',
    name: 'La Muela Hydroelectric Plant',
    type: 'hydro',
    coordinates: [39.0000, -1.0000],
    capacity: 630,
    status: 'active',
    region: 'Valencia',
    country: 'Spain',
    description: 'Pumped-storage hydroelectric plant'
  },

  // ITALY
  {
    id: 'italy-solar-1',
    name: 'Montalto di Castro Solar Park',
    type: 'solar',
    coordinates: [42.3500, 11.6000],
    capacity: 84,
    status: 'active',
    region: 'Lazio',
    country: 'Italy',
    description: 'Solar park in central Italy'
  },
  {
    id: 'italy-geothermal-1',
    name: 'Larderello Geothermal Plant',
    type: 'biomass',
    coordinates: [43.2500, 10.9000],
    capacity: 800,
    status: 'active',
    region: 'Tuscany',
    country: 'Italy',
    description: 'World\'s first geothermal power plant'
  },

  // UNITED STATES
  {
    id: 'usa-nuclear-1',
    name: 'Palo Verde Nuclear Generating Station',
    type: 'nuclear',
    coordinates: [33.3833, -112.8667],
    capacity: 3937,
    status: 'active',
    region: 'Arizona',
    country: 'United States',
    description: 'Largest nuclear power plant in the US'
  },
  {
    id: 'usa-solar-1',
    name: 'Solar Star Solar Farm',
    type: 'solar',
    coordinates: [34.8000, -118.4000],
    capacity: 579,
    status: 'active',
    region: 'California',
    country: 'United States',
    description: 'One of the world\'s largest solar farms'
  },
  {
    id: 'usa-wind-1',
    name: 'Alta Wind Energy Center',
    type: 'onshore_wind',
    coordinates: [35.2000, -118.5000],
    capacity: 1548,
    status: 'active',
    region: 'California',
    country: 'United States',
    description: 'Largest wind farm in the US'
  },
  {
    id: 'usa-coal-1',
    name: 'Plant Scherer Coal Power Plant',
    type: 'coal',
    coordinates: [33.1000, -84.0000],
    capacity: 3564,
    status: 'active',
    region: 'Georgia',
    country: 'United States',
    description: 'Large coal-fired power plant'
  },

  // CHINA
  {
    id: 'china-nuclear-1',
    name: 'Taishan Nuclear Power Plant',
    type: 'nuclear',
    coordinates: [21.9000, 112.9000],
    capacity: 3400,
    status: 'active',
    region: 'Guangdong',
    country: 'China',
    description: 'Nuclear power plant with EPR reactors'
  },
  {
    id: 'china-solar-1',
    name: 'Tengger Desert Solar Park',
    type: 'solar',
    coordinates: [37.5000, 105.0000],
    capacity: 1547,
    status: 'active',
    region: 'Ningxia',
    country: 'China',
    description: 'World\'s largest solar park'
  },
  {
    id: 'china-hydro-1',
    name: 'Three Gorges Dam',
    type: 'hydro',
    coordinates: [30.8167, 111.0000],
    capacity: 22500,
    status: 'active',
    region: 'Hubei',
    country: 'China',
    description: 'World\'s largest hydroelectric power station'
  },

  // JAPAN
  {
    id: 'japan-nuclear-1',
    name: 'Kashiwazaki-Kariwa Nuclear Power Plant',
    type: 'nuclear',
    coordinates: [37.4167, 138.6000],
    capacity: 8212,
    status: 'inactive',
    region: 'Niigata',
    country: 'Japan',
    description: 'World\'s largest nuclear power plant (currently offline)'
  },
  {
    id: 'japan-solar-1',
    name: 'Kagoshima Nanatsujima Solar Power Plant',
    type: 'solar',
    coordinates: [31.6000, 130.5500],
    capacity: 70,
    status: 'active',
    region: 'Kagoshima',
    country: 'Japan',
    description: 'Floating solar power plant'
  },

  // INDIA
  {
    id: 'india-solar-1',
    name: 'Bhadla Solar Park',
    type: 'solar',
    coordinates: [27.5000, 71.5000],
    capacity: 2245,
    status: 'active',
    region: 'Rajasthan',
    country: 'India',
    description: 'World\'s largest solar park'
  },
  {
    id: 'india-coal-1',
    name: 'Vindhyachal Thermal Power Station',
    type: 'coal',
    coordinates: [24.1000, 82.6000],
    capacity: 4760,
    status: 'active',
    region: 'Madhya Pradesh',
    country: 'India',
    description: 'Largest thermal power plant in India'
  },
  {
    id: 'india-hydro-1',
    name: 'Sardar Sarovar Dam',
    type: 'hydro',
    coordinates: [21.8333, 73.7500],
    capacity: 1450,
    status: 'active',
    region: 'Gujarat',
    country: 'India',
    description: 'Multi-purpose dam with hydroelectric power'
  },

  // BRAZIL
  {
    id: 'brazil-hydro-1',
    name: 'Itaipu Dam',
    type: 'hydro',
    coordinates: [-25.4167, -54.5833],
    capacity: 14000,
    status: 'active',
    region: 'Paraná',
    country: 'Brazil',
    description: 'Second largest hydroelectric power station'
  },
  {
    id: 'brazil-wind-1',
    name: 'Osório Wind Farm',
    type: 'onshore_wind',
    coordinates: [-29.9000, -50.3000],
    capacity: 150,
    status: 'active',
    region: 'Rio Grande do Sul',
    country: 'Brazil',
    description: 'Large onshore wind farm'
  },

  // AUSTRALIA
  {
    id: 'australia-coal-1',
    name: 'Eraring Power Station',
    type: 'coal',
    coordinates: [-33.1000, 151.5000],
    capacity: 2880,
    status: 'active',
    region: 'New South Wales',
    country: 'Australia',
    description: 'Large coal-fired power station'
  },
  {
    id: 'australia-solar-1',
    name: 'Sunraysia Solar Farm',
    type: 'solar',
    coordinates: [-34.2000, 142.2000],
    capacity: 200,
    status: 'active',
    region: 'Victoria',
    country: 'Australia',
    description: 'Large solar farm in Victoria'
  },

  // CANADA
  {
    id: 'canada-hydro-1',
    name: 'Robert-Bourassa Generating Station',
    type: 'hydro',
    coordinates: [53.8000, -78.1000],
    capacity: 5616,
    status: 'active',
    region: 'Quebec',
    country: 'Canada',
    description: 'Large hydroelectric power station'
  },
  {
    id: 'canada-nuclear-1',
    name: 'Bruce Nuclear Generating Station',
    type: 'nuclear',
    coordinates: [44.3333, -81.5833],
    capacity: 6300,
    status: 'active',
    region: 'Ontario',
    country: 'Canada',
    description: 'World\'s largest operating nuclear facility'
  }
];

export const countryCoordinates: Record<string, [number, number]> = {
  'France': [46.2276, 2.2137],
  'Germany': [51.1657, 10.4515],
  'United Kingdom': [55.3781, -3.4360],
  'Spain': [40.4637, -3.7492],
  'Italy': [41.8719, 12.5674],
  'United States': [39.8283, -98.5795],
  'China': [35.8617, 104.1954],
  'Japan': [36.2048, 138.2529],
  'India': [20.5937, 78.9629],
  'Brazil': [-14.2350, -51.9253],
  'Australia': [-25.2744, 133.7751],
  'Canada': [56.1304, -106.3468]
};

export const facilityTypeColors: Record<string, string> = {
  nuclear: '#ff6b6b',
  gas: '#4ecdc4',
  solar: '#ffe66d',
  hydro: '#45b7d1',
  offshore_wind: '#96ceb4',
  onshore_wind: '#a8e6cf',
  coal: '#8b4513',
  biomass: '#90ee90'
};

export const facilityTypeIcons: Record<string, string> = {
  nuclear: '⚛️',
  gas: '🔥',
  solar: '☀️',
  hydro: '💧',
  offshore_wind: '🌊',
  onshore_wind: '💨',
  coal: '⛏️',
  biomass: '🌱'
};
