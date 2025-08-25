/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Search } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import WorldMap from "@/components/WorldMap";
import ScanDetailsPanel from "@/components/ScanDetailsPanel";
import { getMapStats, getMapScans } from "@/lib/api/methods";
import { MapStatsResponse, MapScanData } from "@/lib/api/types";
import { useNavigate } from "react-router-dom";

// Types
interface ScanData {
  id: string;
  result: "genuine" | "tampered";
  productName: string;
  scanTime: string;
  location: string;
  qrSerialNo: string;
}

interface LocationData {
  id: number;
  lat: number;
  lng: number;
  status: "genuine" | "tampered";
  location: string;
  date: string;
}

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [viewType, setViewType] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Actual search query sent to API
  const [sortBy, setSortBy] = useState("latest");
  const [statusFilter, setStatusFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("30days");
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>();
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>();
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
  const pageSize = 100;

  // Helper function to get duration label
  const getDurationLabel = () => {
    if (durationFilter === "custom" && customStartDate && customEndDate) {
      return `${format(customStartDate, "MMM d, yyyy")} - ${format(customEndDate, "MMM d, yyyy")}`;
    }
    const labelMap: { [key: string]: string } = {
      "7days": "last 7 days",
      "30days": "last 30 days",
      "90days": "last 90 days"
    };
    return labelMap[durationFilter] || "last 30 days";
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
      status: scan.result.value === 1 ? "genuine" : ("tampered" as "genuine" | "tampered"),
      location: scan.location,
      date: new Date(scan.scan_time).toLocaleDateString()
    }));

  // Initialize view type from URL params
  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "list" || view === "map") {
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
        let timeRange: string | undefined;
        let startDate: string | undefined;
        let endDate: string | undefined;

        if (durationFilter === "custom" && customStartDate && customEndDate) {
          timeRange = "custom";
          startDate = format(customStartDate, "yyyy-MM-dd");
          endDate = format(customEndDate, "yyyy-MM-dd");
        } else {
          const timeRangeMap: { [key: string]: string } = {
            "7days": "7d",
            "30days": "30d",
            "90days": "90d"
          };
          timeRange = timeRangeMap[durationFilter] || "30d";
        }

        // Fetch stats and scan data in parallel
        const [statsResponse, scansResponse] = await Promise.all([
          getMapStats(timeRange, undefined, startDate, endDate),
          getMapScans(
            timeRange,
            statusFilter === "all" ? undefined : statusFilter === "genuine" ? "1" : "0",
            searchQuery || undefined,
            sortBy,
            undefined, // status
            undefined, // version
            true, // hasLocation
            currentPage, // page
            pageSize, // pageSize
            undefined, // companyId
            startDate, // startDate
            endDate // endDate
          )
        ]);

        setMapStats(statsResponse);
        setScanData(scansResponse.data);

        // Update pagination info
        setTotalCount(scansResponse.pagination.total);
        setTotalPages(Math.ceil(scansResponse.pagination.total / pageSize));
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [durationFilter, statusFilter, searchQuery, sortBy, currentPage, pageSize, customStartDate, customEndDate]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [durationFilter, statusFilter, sortBy]);

  const handleSearch = () => {
    // Set the search query to trigger the API call
    setSearchQuery(searchTerm);
    // Reset to first page when searching
    setCurrentPage(1);
  };

  const handleViewChange = (view: string) => {
    setViewType(view);
    setSearchParams({ view });
  };

  // Helper function to open Google Maps
  const openGoogleMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  const handleViewDetails = (scan: MapScanData) => {
    // For list view, navigate to scan page
    if (viewType === "list") {
      navigate(`/dashboard/scan/${scan.scan_id}`);
      return;
    }

    // For map view, keep the side panel behavior
    const scanDetails = {
      id: scan.scan_id,
      result: scan.result.value === 1 ? "genuine" : "tampered",
      scanId: scan.scan_id,
      scanDate: new Date(scan.scan_time).toLocaleString(),
      location: scan.location,
      coordinates: `${scan.latitude}, ${scan.longitude}`,
      qrSerialNo: scan.qr_serial_number,
      product: scan.product_name,
      deviceDetails: "Device details not available"
    };
    setSelectedScan(scanDetails);
    setIsPanelOpen(true);
  };

  const handleCloseSidePanel = () => {
    setIsPanelOpen(false);
    setSelectedScan(null);
  };

  const handleMapMarkerClick = (locationData: LocationData) => {
    // Find the corresponding scan data for this location
    const correspondingScan = scanData.find(
      (scan) => scan.latitude === locationData.lat && scan.longitude === locationData.lng
    );

    if (correspondingScan) {
      const scanDetails = {
        id: correspondingScan.scan_id,
        result: correspondingScan.result.value === 1 ? "genuine" : "tampered",
        scanId: correspondingScan.scan_id,
        scanDate: new Date(correspondingScan.scan_time).toLocaleString(),
        location: correspondingScan.location,
        coordinates: `${correspondingScan.latitude}, ${correspondingScan.longitude}`,
        qrSerialNo: correspondingScan.qr_serial_number,
        product: correspondingScan.product_name,
        deviceDetails: "Device details not available"
      };
      setSelectedScan(scanDetails);
      setIsPanelOpen(true);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Stats Cards with Controls */}
      <div className="flex items-start justify-between gap-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          <Card className="bg-[#ffebc7]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total scans in</p>
                  <p className="text-sm text-gray-600 mb-2">{getDurationLabel()}</p>
                  <div className="flex items-center gap-2">
                    <img src="/total-scans.png" className="w-6 h-6 flex-shrink-0" />
                    <span className="text-3xl font-bold text-gray-900">
                      {loading ? "..." : mapStats?.total_scans?.toLocaleString() || "0"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#c6f4ee]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total genuine scans in</p>
                  <p className="text-sm text-gray-600 mb-2">{getDurationLabel()}</p>
                  <div className="flex items-center gap-2">
                    <img src="/result-genuine.png" className="w-6 h-6 flex-shrink-0" />
                    <span className="text-3xl font-bold text-gray-900">
                      {loading ? "..." : mapStats?.authentic_scans?.toLocaleString() || "0"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#ffe1e1]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total tampered scans in</p>
                  <p className="text-sm text-gray-600 mb-2">{getDurationLabel()}</p>
                  <div className="flex items-center gap-2">
                    <img src="/result-counterfeit.png" className="w-6 h-6 flex-shrink-0" />
                    <span className="text-3xl font-bold text-gray-900">
                      {loading ? "..." : mapStats?.forged_scans?.toLocaleString() || "0"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col gap-4 min-w-fit">
          <div className="flex flex-col gap-2">
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
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {durationFilter === "custom" && (
              <div className="flex items-center gap-2">
                <DateRangePicker
                  startDate={customStartDate}
                  endDate={customEndDate}
                  onStartDateChange={setCustomStartDate}
                  onEndDateChange={setCustomEndDate}
                  className="flex-shrink-0"
                />
              </div>
            )}
          </div>
          <div className="flex w-fit mx-auto bg-white rounded-lg border-none shadow-sm">
            <Button
              variant={viewType === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleViewChange("list")}
              className="rounded-r-none">
              List view
            </Button>
            <Button
              variant={viewType === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleViewChange("map")}
              className="rounded-l-none">
              Map view
            </Button>
          </div>
        </div>
      </div>

      {viewType === "map" ? (
        <div className="bg-white rounded-lg shadow-sm border-none">
          <div className="h-96 relative" id="map-container">
            <WorldMap locationData={locationDataForMap} onMarkerClick={handleMapMarkerClick} />
          </div>
        </div>
      ) : (
        <Card className="bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-6">
                <CardTitle className="text-lg font-semibold">Scan data</CardTitle>
                <div className="relative flex-1">
                  <div className="w-[300px]">
                    <Input
                      placeholder="Search product by name"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="w-full pr-10 h-8"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="absolute right-0 top-0 h-8 w-10 flex rounded-r-md justify-center items-center bg-gray-300">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 h-8">
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
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue placeholder="Status: All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Status: All</SelectItem>
                    <SelectItem value="genuine">Status: Genuine</SelectItem>
                    <SelectItem value="tampered">Status: Tampered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search and Filters */}
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-none bg-gray-100">
                  <TableHead className="text-left font-medium text-gray-900">Result</TableHead>
                  <TableHead className="text-left font-medium text-gray-900">Scan ID</TableHead>
                  <TableHead className="text-left font-medium text-gray-900">Product Name</TableHead>
                  <TableHead className="text-left font-medium text-gray-900">Scan time</TableHead>
                  <TableHead className="text-left font-medium text-gray-900">Location</TableHead>
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
                    <TableCell colSpan={5} className="text-center py-8 text-red-600">
                      {error}
                    </TableCell>
                  </TableRow>
                ) : scanData?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No scan data found
                    </TableCell>
                  </TableRow>
                ) : (
                  scanData?.map((scan, index) => (
                    <TableRow key={scan.scan_id || index} className="border-b border-gray-200 hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center">
                          <img
                            src={scan.result.value === 1 ? "/result-genuine.png" : "/result-counterfeit.png"}
                            alt={scan.result.value === 1 ? "Genuine" : "Counterfeit"}
                            className="w-5 h-5 mr-2"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{scan.scan_id}</TableCell>
                      <TableCell>{scan.product_name === "Unknown Product" ? "-" : scan.product_name}</TableCell>
                      <TableCell className="text-gray-600">{new Date(scan.scan_time).toLocaleString()}</TableCell>
                      <TableCell className="text-gray-600">
                        <button
                          onClick={() => openGoogleMaps(scan.latitude, scan.longitude)}
                          className="text-[#02bc5f] hover:text-[#029951] font-medium hover:underline cursor-pointer 
               overflow-hidden text-ellipsis whitespace-nowrap max-w-80 2xl:max-w-full text-left">
                          {scan.location.includes("API error") ? "No location" : scan.location}
                        </button>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          className="text-[#02bc5f] hover:text-[#029951]"
                          onClick={() => handleViewDetails(scan)}>
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
            <div className="px-6 py-4 border-none">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalCount)} of{" "}
                  {totalCount} results
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
                            className="cursor-pointer">
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
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
      <ScanDetailsPanel isOpen={isPanelOpen} onClose={handleCloseSidePanel} scanDetails={selectedScan} />
    </div>
  );
};

export default Dashboard;
