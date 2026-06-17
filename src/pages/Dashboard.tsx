import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import WorldMap from "@/components/WorldMap";
import TablePagination from "@/components/TablePagination";
import { getDashboardStats, getScans, getScanLocations } from "@/lib/api/methods";
import { DashboardStats, Scan, ScanLocation } from "@/lib/api/types";

const PAGE_SIZE = 20;

const durationLabels: Record<string, string> = {
  "7days": "last 7 days",
  "30days": "last 30 days",
  "90days": "last 90 days"
};

// Pull "lat,lng" out of a Google Maps URL like https://www.google.com/maps?q=18.6,77.8
const parseLatLng = (url: string | null): { lat: number; lng: number } | null => {
  if (!url) return null;
  const match = url.match(/[?&]q=(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/);
  if (!match) return null;
  return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
};

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewType, setViewType] = useState("list");

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [resultFilter, setResultFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("30days");
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>();
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>();

  // Data
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [scans, setScans] = useState<Scan[]>([]);
  const [scanLocations, setScanLocations] = useState<ScanLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const getDurationLabel = () => {
    if (durationFilter === "custom" && customStartDate && customEndDate) {
      return `${format(customStartDate, "MMM d, yyyy")} - ${format(customEndDate, "MMM d, yyyy")}`;
    }
    return durationLabels[durationFilter] || "last 30 days";
  };

  // Map markers — driven by the dedicated locations endpoint
  const locationDataForMap = scanLocations.map((loc, index) => ({
    id: index + 1,
    lat: loc.latitude,
    lng: loc.longitude,
    status: loc.result,
    location: loc.reference_id,
    date: new Date(loc.scanned_at).toLocaleDateString()
  }));

  // Sync view type from URL
  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "list" || view === "map") {
      setViewType(view);
    }
  }, [searchParams]);

  // Fetch dashboard data.
  // When filters change (not page), always resets to page 1 to avoid a
  // double-fetch: we derive the effective page inside the effect rather
  // than from a separate reset useEffect.
  const filterKey = `${durationFilter}|${resultFilter}|${searchQuery}|${sortBy}|${customStartDate}|${customEndDate}`;
  const prevFilterKeyRef = React.useRef(filterKey);

  useEffect(() => {
    const filtersChanged = prevFilterKeyRef.current !== filterKey;
    prevFilterKeyRef.current = filterKey;

    // When filters change, snap back to page 1 (skip the redundant fetch
    // that would happen if we let a separate reset-effect change currentPage).
    const page = filtersChanged ? 1 : currentPage;
    if (filtersChanged && currentPage !== 1) {
      setCurrentPage(1);
      return; // the setCurrentPage will trigger this effect again with page=1
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const filters = {
          duration: durationFilter,
          startDate: customStartDate ? format(customStartDate, "yyyy-MM-dd") : undefined,
          endDate: customEndDate ? format(customEndDate, "yyyy-MM-dd") : undefined,
          search: searchQuery || undefined,
          sort: sortBy,
          result: resultFilter
        };

        // Stats + scans fail together; locations failure is non-fatal
        const [statsResponse, scansResponse] = await Promise.all([
          getDashboardStats(filters),
          getScans({ ...filters, page, page_size: PAGE_SIZE })
        ]);

        setStats(statsResponse);
        setScans(scansResponse.results);
        setTotalCount(scansResponse.count);
        setTotalPages(scansResponse.total_pages);

        // Map locations are best-effort — a failure here shouldn't blank the table
        getScanLocations(filters)
          .then(setScanLocations)
          .catch((err) => console.error("Failed to load map locations:", err));
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey, currentPage]);

  const handleSearch = () => setSearchQuery(searchTerm);

  const handleViewChange = (view: string) => {
    setViewType(view);
    setSearchParams({ view });
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Stats Cards with Controls */}
      <div className="flex items-start justify-between gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          <Card className="bg-[#ffebc7]">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-1">Total scans in</p>
              <p className="text-sm text-gray-600 mb-2">{getDurationLabel()}</p>
              <div className="flex items-center gap-2">
                <img src="/total-scans.png" className="w-6 h-6 flex-shrink-0" />
                <span className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : stats?.total_scans?.toLocaleString() || "0"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#c6f4ee]">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-1">Total genuine scans in</p>
              <p className="text-sm text-gray-600 mb-2">{getDurationLabel()}</p>
              <div className="flex items-center gap-2">
                <img src="/result-genuine.png" className="w-6 h-6 flex-shrink-0" />
                <span className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : stats?.genuine_scans?.toLocaleString() || "0"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#ffe1e1]">
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-1">Total tampered scans in</p>
              <p className="text-sm text-gray-600 mb-2">{getDurationLabel()}</p>
              <div className="flex items-center gap-2">
                <img src="/result-counterfeit.png" className="w-6 h-6 flex-shrink-0" />
                <span className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : stats?.tampered_scans?.toLocaleString() || "0"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
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
              <DateRangePicker
                startDate={customStartDate}
                endDate={customEndDate}
                onStartDateChange={setCustomStartDate}
                onEndDateChange={setCustomEndDate}
                className="flex-shrink-0"
              />
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
            <WorldMap locationData={locationDataForMap} />
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
                  </SelectContent>
                </Select>

                <Select value={resultFilter} onValueChange={setResultFilter}>
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
                ) : scans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No scan data found
                    </TableCell>
                  </TableRow>
                ) : (
                  scans.map((scan) => {
                    const coords = parseLatLng(scan.location);
                    return (
                      <TableRow key={scan.scan_id} className="border-b border-gray-200 hover:bg-gray-50">
                        <TableCell>
                          {scan.result === "genuine" || scan.result === "tampered" ? (
                            <img
                              src={scan.result === "genuine" ? "/result-genuine.png" : "/result-counterfeit.png"}
                              alt={scan.result}
                              className="w-5 h-5"
                            />
                          ) : (
                            <span className="text-xs text-gray-500 capitalize">{scan.result}</span>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{scan.scan_id}</TableCell>
                        <TableCell>{scan.product_name || "-"}</TableCell>
                        <TableCell className="text-gray-600">{new Date(scan.scan_time).toLocaleString()}</TableCell>
                        <TableCell className="text-gray-600">
                          {coords ? (
                            <a
                              href={scan.location as string}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#02bc5f] hover:text-[#029951] font-medium hover:underline cursor-pointer">
                              {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
                            </a>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>

          {!loading && !error && (
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          )}
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
