import {
  CircleDollarSign,
  CircleUser,
  CircleUserRound,
} from 'lucide-react';

// Location data for map and list views
export const locationData = [
  {
    id: 1,
    lat: 10.0,
    lng: -10.0,
    status: 'genuine',
    location: 'Central America',
    date: '2025-05-01',
  },
  {
    id: 2,
    lat: 20.0,
    lng: -10.0,
    status: 'tampered',
    location: 'Caribbean',
    date: '2025-05-02',
  },
  {
    id: 3,
    lat: 30.0,
    lng: -40.0,
    status: 'genuine',
    location: 'West Africa',
    date: '2025-05-03',
  },
  {
    id: 4,
    lat: 50.0,
    lng: -20.0,
    status: 'tampered',
    location: 'Western Europe',
    date: '2025-05-04',
  },
];

// Scan data statistics
export const scanData = {
  genuine: 14563,
  tampered: 5,
};

// Printers data
export const printers = [
  { id: 1, name: 'Printer1', model: 'Konica Minolta ABC (zW)' },
  { id: 2, name: 'Printer2', model: 'Konica Minolta XYZ (HH)' },
];

// Stats cards data for dashboard
export const statsCards = [
  {
    title: 'Total Scans',
    value: '14,568',
    change: '+20.1%',
    period: 'from last month',
    icon: <CircleUserRound className="h-5 w-5 text-muted-foreground" />,
  },
  {
    title: 'Genuine QR',
    value: '14,563',
    change: '+18.1%',
    period: 'from last month',
    icon: <CircleDollarSign className="h-5 w-5 text-muted-foreground" />,
  },
  {
    title: 'Tampered QR',
    value: '5',
    change: '+1.9%',
    period: 'from last month',
    icon: <CircleUser className="h-5 w-5 text-muted-foreground" />,
  },
];

// Types for better type safety
export interface LocationData {
  id: number;
  lat: number;
  lng: number;
  status: 'genuine' | 'tampered';
  location: string;
  date: string;
}

export interface ScanData {
  genuine: number;
  tampered: number;
}

export interface Printer {
  id: number;
  name: string;
  model: string;
}

export interface StatsCard {
  title: string;
  value: string;
  change: string;
  period: string;
  icon: React.ReactNode;
}
