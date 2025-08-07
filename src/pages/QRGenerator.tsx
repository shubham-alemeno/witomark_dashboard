import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useAxios } from "@/hooks/useAxios";
import { createQR, getAllPrinters, listQRs } from "@/lib/api/methods";
import { Fingerprint } from "@/lib/api/types";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import { successToast, errorToast } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

const QRGenerator = () => {
  const { data: printers, isLoading: loadingPrinters } = useAxios(getAllPrinters);

  // Input Field
  const [qrCount, setQrCount] = useState<number>(0);

  // Data
  const [qrData, setQrData] = useState<Fingerprint[]>([]);
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [qrGenerationLimit, setQrGenerationLimit] = useState<number>(0);

  // Filters
  const [sortBy, setSortBy] = useState("newest");
  const [status, setStatus] = useState("All");
  const [totalQR, setTotalQR] = useState<number>(0);
  const [search, setSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const pageSize = 30;

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await listQRs({
        page: currentPage,
        page_size: pageSize,
        status: status === "All" ? "" : status,
        search: searchTerm,
        sort: sortBy
      });
      console.log("Real...", response);
      setQrData(response.results);
      setTotalQR(response.total_count);
      setQrGenerationLimit(response.qr_generation_limit);
      setTotalCount(response.count);
      setTotalPages(Math.ceil(response.count / pageSize));
      setLoading(false);
    })();
  }, [status, search, sortBy, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [status, sortBy]);

  const handleGenerateQR = async () => {
    if (qrCount > qrGenerationLimit - totalQR) {
      toast.error("Cannot generate QRs more than the QR generation limit", {
        position: "top-right",
        style: errorToast
      });
      return;
    }
    if (qrCount > 100) {
      toast.error("Cannot generate more than 100 QRs at a time", {
        position: "top-right",
        style: errorToast
      });
      return;
    }
    try {
      setLoading(true);
      const response = await createQR({ count: qrCount, printer: parseInt(selectedPrinter) });
      toast.success(response.data?.message ?? "Generated QRs successfully", {
        position: "top-right",
        style: successToast
      });
    } catch (error) {
      const printerError: boolean = error?.response?.data?.printer?.length > 0 ? true : false;
      toast.error(printerError ? "No printer selected" : "Error occured while generating QRs", {
        position: "top-right",
        style: errorToast
      });
    } finally {
      //reload by changing the state of trigger
      setSearch((prev) => !prev);
      setLoading(false);
    }
  };

  if (loadingPrinters || loading) return <Loader />;

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        {/* Total QRs Generated */}

        <Card>
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground mb-1">
              Total QRs <br /> generated
            </div>
            <div className="flex items-center gap-1">
              <img src="/total-scans.png" className="w-7 h-7" />
              <span className="text-2xl font-bold pb-1">{totalQR}</span>
            </div>
          </CardContent>
        </Card>

        {/* Total QR Generation Limit */}

        <Card>
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground mb-1">Total QR generation limit for your plan</div>
            <div className="flex items-center gap-1">
              <img src="/total-scans.png" className="w-7 h-7" />
              <span className="text-2xl font-bold pb-1">{qrGenerationLimit}</span>
            </div>
          </CardContent>
        </Card>

        {/* Credit Balance */}

        {/* <Card>
          <CardContent className="p-5">
            <div className="text-[13px] text-muted-foreground">
              Credit balance |{" "}
              <span className="text-green-600 cursor-pointer hover:underline" onClick={() => navigate("/plan-details")}>
                Buy credits
              </span>
            </div>
            <div className="text-xs text-muted-foreground mb-2">(1 credit = 1 QR generation)</div>
            <div className="flex items-center gap-1">
              <img src="/dollar.png" className="w-7 h-7" />
              <span className="text-2xl font-bold pb-1">1691</span>
            </div>
          </CardContent>
        </Card> */}

        {/* Generate QRs */}

        <Card className="col-span-2">
          <CardContent className="p-5">
            <div className="flex">
              <div className="w-1/2">
                <div className="text-sm text-muted-foreground mb-2">Enter the number of QRs you want to generate</div>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min={0}
                      value={qrCount}
                      onChange={(e) => {
                        setQrCount(parseInt(e.target.value || "0"));
                      }}
                      placeholder="6"
                      className="flex-1 h-7"
                    />
                    <Select value={selectedPrinter} onValueChange={setSelectedPrinter}>
                      <SelectTrigger className="w-32 h-7">
                        <SelectValue placeholder="Select printer" />
                      </SelectTrigger>
                      <SelectContent>
                        {printers.results.length > 0 &&
                          printers.results.map((printer) => (
                            <SelectItem key={printer.id} value={printer.id.toString()}>
                              {printer.printer_name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex justify-end items-center">
                <Button className="bg-green-400 hover:bg-green-500 rounded-sm px-8 py-5" onClick={handleGenerateQR}>
                  Generate QRs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generated QRs Section */}
      <Card className="p-6">
        <CardHeader className="p-0 mb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <CardTitle className="text-lg font-semibold ">Generated QRs</CardTitle>
              {/* Search */}
              <div className="flex items-center relative">
                <div className="w-[345px]">
                  <Input
                    type="text"
                    placeholder="Search QR by Fingerprint Id or Linked Product"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 h-8"
                  />
                </div>
                <button className="absolute right-0 h-8 w-10 flex rounded-r-md justify-center items-center bg-gray-300">
                  <Search
                    className="h-4 w-4 text-muted-foreground"
                    onClick={() => {
                      setSearch((prev) => !prev);
                      setCurrentPage(1);
                    }}
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-row justify-end gap-4">
              {/* Sort and Status */}
              <div className="flex gap-2">
                <Select
                  value={sortBy}
                  onValueChange={(val) => {
                    setSortBy(val);
                  }}>
                  <SelectTrigger className="w-40 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Sort by: Latest first</SelectItem>
                    <SelectItem value="oldest">Sort by: Oldest first</SelectItem>
                    {/* <SelectItem value="a-z">Sort by: Name A-Z</SelectItem>
                    <SelectItem value="z-a">Sort by: Name Z-A</SelectItem> */}
                  </SelectContent>
                </Select>

                <Select
                  value={status}
                  onValueChange={(val) => {
                    setStatus(val);
                  }}>
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                    <SelectItem value="Compromised">Compromised</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="pl-4">QR Serial No.</TableHead>
                <TableHead>Figerprint Id</TableHead>
                <TableHead>Linked Product</TableHead>
                <TableHead>Linked Printer</TableHead>
                <TableHead>Date created</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qrData.length > 0 ? (
                qrData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium pl-5 py-4">#{item.serial_number}</TableCell>
                    <TableCell className="py-4">{item.fingerprint_id}</TableCell>
                    <TableCell className="py-4">{item.product_name ?? "-"}</TableCell>
                    <TableCell className="py-4">{item.printer_name}</TableCell>
                    <TableCell className="py-4">{new Date(item.created_at).toLocaleString()}</TableCell>
                    <TableCell className="py-4">
                      <Button
                        variant="link"
                        className="text-green-600 hover:text-green-700 p-0 h-auto"
                        onClick={() => navigate(`/qr-generator/${item.fingerprint_id}`)}>
                        View details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No QR codes found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {/* Pagination */}
        {!loading && qrData.length > 0 && totalPages > 1 && (
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
    </div>
  );
};

export default QRGenerator;
