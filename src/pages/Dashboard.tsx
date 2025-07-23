import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import WorldMap from '@/components/WorldMap';
import PaginatedDataTable from '@/components/PaginatedDatedTable';
import { locationData, statsCards } from '@/data/mockData';

const Dashboard = () => {
  const [viewType, setViewType] = useState('heatmap');

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsCards.map((card, index) => (
          <Card
            key={index}
            className="bg-card text-card-foreground overflow-hidden dark:border-gray-800"
          >
            <CardHeader className="pb-2 pt-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                {card.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">{card.change}</span>{' '}
                {card.period}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-lg font-medium">QR Scan Locations</div>
        <div className="flex space-x-2">
          <Button
            variant={viewType === 'heatmap' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setViewType('heatmap');
              window.location.hash = 'heatmap';
            }}
          >
            Map View
          </Button>
          <Button
            variant={viewType === 'list-view' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setViewType('list-view');
              window.location.hash = 'list-view';
            }}
          >
            List View
          </Button>
        </div>
      </div>

      {viewType === 'list-view' ? (
        <PaginatedDataTable data={locationData} itemsPerPage={7} />
      ) : (
        <div className="bg-gray-100 rounded-md shadow-sm">
          <div className="h-96 relative" id="map-container">
            <WorldMap locationData={locationData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
