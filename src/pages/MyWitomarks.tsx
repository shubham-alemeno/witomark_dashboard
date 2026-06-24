import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Loader from "@/components/Loader";
import TablePagination from "@/components/TablePagination";
import { getWitomarks } from "@/lib/api/methods";
import { Witomark } from "@/lib/api/types";

const PAGE_SIZE = 20;

const MyWitomarks = () => {
  const [witomarks, setWitomarks] = useState<Witomark[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filterKey = `${searchQuery}|${statusFilter}`;
  const prevFilterKeyRef = React.useRef(filterKey);

  useEffect(() => {
    const filtersChanged = prevFilterKeyRef.current !== filterKey;
    prevFilterKeyRef.current = filterKey;

    // When filters change, snap to page 1 and let the re-render trigger the fetch
    if (filtersChanged && currentPage !== 1) {
      setCurrentPage(1);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getWitomarks({
          search: searchQuery,
          status: statusFilter,
          page: filtersChanged ? 1 : currentPage,
          page_size: PAGE_SIZE
        });
        setWitomarks(response.results);
        setTotalCount(response.count);
        setTotalPages(response.total_pages);
      } catch (err) {
        console.error("Failed to load witomarks:", err);
        setError("Failed to load witomarks. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey, currentPage]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Stat card */}
      <Card className="w-fit min-w-56">
        <CardContent className="p-5">
          <div className="text-sm text-gray-700 text-muted-foreground mb-1">Total QR Fingerprints</div>
          <div className="flex items-center gap-2">
            <img src="/qricon.png" className="w-7 h-7" />
            <span className="text-2xl font-bold pb-1">{totalCount}</span>
          </div>
        </CardContent>
      </Card>

      {/* List */}
      <Card className="p-6">
        <CardHeader className="p-0 mb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center relative">
              <div className="w-[340px]">
                <Input
                  type="text"
                  placeholder="Search QR by Fingerprint Id or Linked Product"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setSearchQuery(searchTerm)}
                  className="w-full pr-10 h-8"
                />
              </div>
              <button
                className="absolute right-0 h-8 w-10 flex rounded-r-md justify-center items-center bg-gray-300"
                onClick={() => setSearchQuery(searchTerm)}>
                <Search className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="pl-4">Fingerprint Id</TableHead>
                <TableHead>Linked Product</TableHead>
                <TableHead>Linked Printer</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {error ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-red-600">
                    {error}
                  </TableCell>
                </TableRow>
              ) : witomarks.length > 0 ? (
                witomarks.map((item) => (
                  <TableRow key={item.fingerprint_id}>
                    <TableCell className="font-medium pl-5 py-4">{item.fingerprint_id}</TableCell>
                    <TableCell className="py-4">{item.linked_product || "-"}</TableCell>
                    <TableCell className="py-4">{item.linked_printer || "-"}</TableCell>
                    <TableCell className="py-4">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          item.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}>
                        {item.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No QR fingerprints found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      </Card>
    </div>
  );
};

export default MyWitomarks;
