import { ServiceArea, ServiceItem } from '../types';

const SERVICE_SHORT_NAMES: Record<string, string> = {
  'emergency-plumbing': 'Emergency',
  'drain-cleaning': 'Drain Cleaning',
  'water-heater': 'Water Heater',
  'sewer-repair': 'Sewer Repair',
  'leak-detection': 'Leak Repair',
  'commercial-plumbing': 'Commercial Plumbing',
  repiping: 'Pipe Repair',
  'fixture-repair': 'Fixture Repair',
};

const AREA_SHORT_NAMES: Record<string, string> = {
  'Dallas - Fort Worth Metro': 'Dallas',
  'Austin & Central Texas': 'Austin',
  'Houston Metropolitan': 'Houston',
  'Phoenix Valley & Scottsdale': 'Phoenix',
  'Denver & Front Range': 'Denver',
  'Metro Atlanta': 'Atlanta',
  'Central Florida (Orlando & Tampa)': 'Central Florida',
  'Charlotte Metro': 'Charlotte',
};

export const getShortServiceName = (service: ServiceItem) =>
  SERVICE_SHORT_NAMES[service.id] ?? service.title;

export const getShortAreaName = (area: ServiceArea) =>
  AREA_SHORT_NAMES[area.city] ?? area.city;
