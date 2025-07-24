/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search } from 'lucide-react';
import WorldMap from '@/components/WorldMap';
import ScanDetailsPanel from '@/components/ScanDetailsPanel';
import { locationData } from '@/data/mockData';

// Types
interface ScanData {
  id: string;
  result: 'genuine' | 'tampered';
  productName: string;
  scanTime: string;
  location: string;
}

interface LocationData {
  id: number;
  lat: number;
  lng: number;
  status: 'genuine' | 'tampered';
  location: string;
  date: string;
}

// Mock scan data for the table
const mockScanData: ScanData[] = [
  {
    id: '#57CTY34',
    result: 'genuine',
    productName: 'Uprise-D3 69K Capsule',
    scanTime: 'June 21, 2025, 1:11 p.m.',
    location: 'Lucknow, Uttar Pradesh',
  },
  {
    id: '#57CTY34',
    result: 'genuine',
    productName: 'Uprise-D3 69K Capsule',
    scanTime: 'June 21, 2025, 1:11 p.m.',
    location: 'Lucknow, Uttar Pradesh',
  },
  {
    id: '#57CTY34',
    result: 'tampered',
    productName: 'Uprise-D3 69K Capsule',
    scanTime: 'June 21, 2025, 1:11 p.m.',
    location: 'Lucknow, Uttar Pradesh',
  },
  {
    id: '#57CTY34',
    result: 'genuine',
    productName: 'Uprise-D3 69K Capsule',
    scanTime: 'June 21, 2025, 1:11 p.m.',
    location: 'Lucknow, Uttar Pradesh',
  },
  {
    id: '#57CTY34',
    result: 'genuine',
    productName: 'Uprise-D3 69K Capsule',
    scanTime: 'June 21, 2025, 1:11 p.m.',
    location: 'Lucknow, Uttar Pradesh',
  },
  {
    id: '#57CTY34',
    result: 'tampered',
    productName: 'Uprise-D3 69K Capsule',
    scanTime: 'June 21, 2025, 1:11 p.m.',
    location: 'Lucknow, Uttar Pradesh',
  },
  {
    id: '#57CTY34',
    result: 'genuine',
    productName: 'Uprise-D3 69K Capsule',
    scanTime: 'June 21, 2025, 1:11 p.m.',
    location: 'Lucknow, Uttar Pradesh',
  },
  {
    id: '#57CTY34',
    result: 'genuine',
    productName: 'Uprise-D3 69K Capsule',
    scanTime: 'June 21, 2025, 1:11 p.m.',
    location: 'Lucknow, Uttar Pradesh',
  },
  {
    id: '#57CTY34',
    result: 'genuine',
    productName: 'Uprise-D3 69K Capsule',
    scanTime: 'June 21, 2025, 1:11 p.m.',
    location: 'Lucknow, Uttar Pradesh',
  },
  {
    id: '#57CTY34',
    result: 'genuine',
    productName: 'Uprise-D3 69K Capsule',
    scanTime: 'June 21, 2025, 1:11 p.m.',
    location: 'Lucknow, Uttar Pradesh',
  },
];

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewType, setViewType] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [statusFilter, setStatusFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('30days');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedScan, setSelectedScan] = useState<any>(null);

  // Initialize view type from URL params
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'list' || view === 'map') {
      setViewType(view);
    }
  }, [searchParams]);

  const handleSearch = () => {
    // API call would go here
    console.log('Searching with:', { searchTerm, sortBy, statusFilter });
  };

  const handleViewChange = (view: string) => {
    setViewType(view);
    setSearchParams({ view });
  };

  const handleViewDetails = (scan: ScanData) => {
    // Convert scan data to the format expected by ScanDetailsPanel
    const scanDetails = {
      id: scan.id,
      result: scan.result,
      scanId: 'HHDGhyl',
      scanDate: scan.scanTime,
      location: scan.location,
      coordinates: 'WXR3+9W, Lucknow, Uttar Pradesh 226021, India',
      qrSerialNo: '#11',
      product: scan.productName,
      deviceDetails: 'CMF Phone 1, Android 14, Google Chrome 28.2',
    };
    setSelectedScan(scanDetails);
    setIsPanelOpen(true);
  };

  const handleCloseSidePanel = () => {
    setIsPanelOpen(false);
    setSelectedScan(null);
  };

  const handleMapMarkerClick = (locationData: LocationData) => {
    // Convert location data to scan details format
    const scanDetails = {
      id: '#57CTY34',
      result: locationData.status,
      scanId: 'HHDGhyl',
      scanDate: locationData.date,
      location: locationData.location,
      coordinates: 'WXR3+9W, Lucknow, Uttar Pradesh 226021, India',
      qrSerialNo: '#11',
      product: 'Uprise-D3 69K Capsule #324535',
      deviceDetails: 'CMF Phone 1, Android 14, Google Chrome 28.2',
    };
    setSelectedScan(scanDetails);
    setIsPanelOpen(true);
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Stats Cards with Controls */}
      <div className="flex items-start justify-between gap-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total scans in</p>
                  <p className="text-sm text-gray-600 mb-2">last 30 days</p>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                    <span className="text-3xl font-bold text-gray-900">
                      1,98,345
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Total genuine scans in
                  </p>
                  <p className="text-sm text-gray-600 mb-2">last 30 days</p>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-3xl font-bold text-gray-900">
                      1,98,045
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Total tampered scans in
                  </p>
                  <p className="text-sm text-gray-600 mb-2">last 30 days</p>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-3xl font-bold text-gray-900">
                      300
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col gap-4 min-w-fit">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Duration:</span>
            <Select value={durationFilter} onValueChange={setDurationFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="1year">Last 1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit mx-auto bg-white rounded-lg border">
            <Button
              variant={viewType === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleViewChange('list')}
              className="rounded-r-none"
            >
              List view
            </Button>
            <Button
              variant={viewType === 'map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleViewChange('map')}
              className="rounded-l-none"
            >
              Map view
            </Button>
          </div>
        </div>
      </div>

      {viewType === 'map' ? (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="h-96 relative" id="map-container">
            <WorldMap
              locationData={locationData}
              onMarkerClick={handleMapMarkerClick}
            />
          </div>
        </div>
      ) : (
        <Card className="bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Scan data</CardTitle>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search product by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by: Latest first" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Sort by: Latest first</SelectItem>
                  <SelectItem value="oldest">Sort by: Oldest first</SelectItem>
                  <SelectItem value="name-asc">Sort by: Name A-Z</SelectItem>
                  <SelectItem value="name-desc">Sort by: Name Z-A</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status: All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Status: All</SelectItem>
                  <SelectItem value="genuine">Status: Genuine</SelectItem>
                  <SelectItem value="tampered">Status: Tampered</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="text-left font-medium text-gray-900">
                    Result
                  </TableHead>
                  <TableHead className="text-left font-medium text-gray-900">
                    Scan ID
                  </TableHead>
                  <TableHead className="text-left font-medium text-gray-900">
                    Product Name
                  </TableHead>
                  <TableHead className="text-left font-medium text-gray-900">
                    Scan time
                  </TableHead>
                  <TableHead className="text-left font-medium text-gray-900">
                    Location
                  </TableHead>
                  <TableHead className="text-right font-medium text-gray-900"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockScanData.map((scan, index) => (
                  <TableRow key={index} className="border-b hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-2 ${
                            scan.result === 'genuine'
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          }`}
                        ></div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{scan.id}</TableCell>
                    <TableCell>{scan.productName}</TableCell>
                    <TableCell className="text-gray-600">
                      {scan.scanTime}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {scan.location}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleViewDetails(scan)}
                      >
                        View details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Side Panel */}
      <ScanDetailsPanel
        isOpen={isPanelOpen}
        onClose={handleCloseSidePanel}
        scanDetails={selectedScan}
      />
    </div>
  );
};

export default Dashboard;
