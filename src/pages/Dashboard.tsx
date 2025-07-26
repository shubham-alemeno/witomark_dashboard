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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Search } from 'lucide-react';
import WorldMap from '@/components/WorldMap';
import ScanDetailsPanel from '@/components/ScanDetailsPanel';
import { getMapStats, getMapScans } from '@/lib/api/methods';
import { MapStatsResponse, MapScanData } from '@/lib/api/types';

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

  // API Data State
  const [mapStats, setMapStats] = useState<MapStatsResponse | null>(null);
  const [scanData, setScanData] = useState<MapScanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 20;

  // Helper function to get duration label
  const getDurationLabel = () => {
    const labelMap: { [key: string]: string } = {
      '7days': 'last 7 days',
      '30days': 'last 30 days',
      '90days': 'last 90 days',
    };
    return labelMap[durationFilter] || 'last 30 days';
  };

  // Convert scan data to location data format for WorldMap
  // Filter out invalid coordinates to prevent map errors
  const locationDataForMap = scanData
    .filter(
      (scan) =>
        scan.latitude &&
        scan.longitude &&
        !isNaN(scan.latitude) &&
        !isNaN(scan.longitude) &&
        scan.latitude !== 0 &&
        scan.longitude !== 0
    )
    .map((scan, index) => ({
      id: index + 1,
      lat: scan.latitude,
      lng: scan.longitude,
      status:
        scan.result.value === 1
          ? 'genuine'
          : ('tampered' as 'genuine' | 'tampered'),
      location: scan.location,
      date: new Date(scan.scan_time).toLocaleDateString(),
    }));

  // Initialize view type from URL params
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'list' || view === 'map') {
      setViewType(view);
    }
  }, [searchParams]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Convert duration filter to API format
        const timeRangeMap: { [key: string]: string } = {
          '7days': '7d',
          '30days': '30d',
          '90days': '90d',
        };
        const timeRange = timeRangeMap[durationFilter] || '30d';

        // Fetch stats and scan data in parallel
        const [statsResponse, scansResponse] = await Promise.all([
          getMapStats(timeRange),
          getMapScans(
            timeRange,
            statusFilter === 'all'
              ? undefined
              : statusFilter === 'genuine'
              ? '1'
              : '0',
            searchTerm || undefined,
            sortBy,
            undefined, // status
            undefined, // version
            true, // hasLocation
            currentPage, // page
            pageSize // pageSize
          ),
        ]);

        setMapStats(statsResponse);
        setScanData(scansResponse.data);

        // Update pagination info
        setTotalCount(scansResponse.pagination.total);
        setTotalPages(Math.ceil(scansResponse.pagination.total / pageSize));
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [durationFilter, statusFilter, searchTerm, sortBy, currentPage, pageSize]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [durationFilter, statusFilter, searchTerm, sortBy]);

  const handleSearch = () => {
    // Reset to first page when searching
    setCurrentPage(1);
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
      scanId: scan.id,
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
                  <p className="text-sm text-gray-600 mb-2">
                    {getDurationLabel()}
                  </p>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                    <span className="text-3xl font-bold text-gray-900">
                      {loading
                        ? '...'
                        : mapStats?.total_scans?.toLocaleString() || '0'}
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
                  <p className="text-sm text-gray-600 mb-2">
                    {getDurationLabel()}
                  </p>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-3xl font-bold text-gray-900">
                      {loading
                        ? '...'
                        : mapStats?.authentic_scans?.toLocaleString() || '0'}
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
                  <p className="text-sm text-gray-600 mb-2">
                    {getDurationLabel()}
                  </p>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-3xl font-bold text-gray-900">
                      {loading
                        ? '...'
                        : mapStats?.forged_scans?.toLocaleString() || '0'}
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
              locationData={locationDataForMap}
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
                  {/* <SelectItem value="name-asc">Sort by: Name A-Z</SelectItem>
                  <SelectItem value="name-desc">Sort by: Name Z-A</SelectItem> */}
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Loading scan data...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-red-600"
                    >
                      {error}
                    </TableCell>
                  </TableRow>
                ) : scanData?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-gray-500"
                    >
                      No scan data found
                    </TableCell>
                  </TableRow>
                ) : (
                  scanData?.map((scan, index) => (
                    <TableRow
                      key={scan.scan_id || index}
                      className="border-b hover:bg-gray-50"
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full mr-2 ${
                              scan.result.value === 1
                                ? 'bg-green-500'
                                : 'bg-red-500'
                            }`}
                          ></div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {scan.scan_id}
                      </TableCell>
                      <TableCell>{scan.product_name}</TableCell>
                      <TableCell className="text-gray-600">
                        {new Date(scan.scan_time).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {scan.location}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() =>
                            handleViewDetails({
                              id: scan.scan_id,
                              result:
                                scan.result.value === 1
                                  ? 'genuine'
                                  : 'tampered',
                              productName: scan.product_name,
                              scanTime: new Date(
                                scan.scan_time
                              ).toLocaleString(),
                              location: scan.location,
                            })
                          }
                        >
                          View details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>

          {/* Pagination */}
          {!loading && !error && scanData.length > 0 && totalPages > 1 && (
            <div className="px-6 py-4 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * pageSize + 1} to{' '}
                  {Math.min(currentPage * pageSize, totalCount)} of {totalCount}{' '}
                  results
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        className={
                          currentPage === 1
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                      />
                    </PaginationItem>

                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber: number;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }

                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            onClick={() => setCurrentPage(pageNumber)}
                            isActive={currentPage === pageNumber}
                            className="cursor-pointer"
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        className={
                          currentPage === totalPages
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
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
