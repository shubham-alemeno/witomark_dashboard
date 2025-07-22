'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, CircleUser, CircleUserRound } from 'lucide-react';
import WorldMap from '@/components/WorldMap';
import PaginatedDataTable from '@/components/PaginatedDatedTable';

const locationData = [
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

// Stats cards data
const statsCards = [
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

export default function DashboardPage() {
  const [viewType, setViewType] = useState('heatmap');

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((card, index) => (
          <Card
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-3 pt-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {card.title}
                </CardTitle>
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  {card.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {card.value}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {card.change}
                </span>{' '}
                {card.period}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* QR Scan Locations Section */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              QR Scan Locations
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={viewType === 'heatmap' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('heatmap')}
                className="text-sm"
              >
                Map View
              </Button>
              <Button
                variant={viewType === 'list-view' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('list-view')}
                className="text-sm"
              >
                List View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {viewType === 'list-view' ? (
            <PaginatedDataTable data={locationData} itemsPerPage={7} />
          ) : (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <div
                className="h-96 relative flex items-center justify-center"
                id="map-container"
              >
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <div className="text-lg font-medium mb-2">World Map</div>
                  <div className="text-sm">
                    Map component will be displayed here
                  </div>
                  {/* <WorldMap locationData={locationData} /> */}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
