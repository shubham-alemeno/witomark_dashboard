import { useState, useEffect } from "react";
import { Save, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bulkUpdate, listProducts, listQRs } from "@/lib/api/methods";
import { Fingerprint, ProductApiResponse, ProductsFilter } from "@/lib/api/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext
} from "@/components/ui/pagination";
import Loader from "@/components/Loader";
import { useAxios } from "@/hooks/useAxios";
import { errorToast, successToast } from "@/lib/utils";
import { toast } from "sonner";
import { useBlocker } from "react-router-dom";

const BulkQREditor = () => {
  const { data: products, isLoading: loadingProducts } = useAxios<ProductApiResponse, ProductsFilter>(listProducts, {
    status: "Active",
    search: "",
    all: true
  });

  const [sortBy, setSortBy] = useState("newest");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [qrData, setQrData] = useState<Fingerprint[]>([]);
  const [editedData, setEditedData] = useState<Record<number, { product: number; status: string }>>({});

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const pageSize = 30;

  const [loading, setLoading] = useState<boolean>(false);
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => unsavedChanges && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      const confirmLeave = window.confirm("You have unsaved changes. Are you sure you want to leave?");
      if (confirmLeave) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker, blocker.state]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [unsavedChanges]);

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
      console.log(response);
      setQrData(response.results);
      setTotalCount(response.count);
      setTotalPages(Math.ceil(response.count / pageSize));
      setLoading(false);
    })();
  }, [status, search, sortBy, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [status, sortBy]);

  const handleFieldChange = (id: number, field: "product" | "status", value: string | number) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
    setUnsavedChanges(true);
  };

  const handleChanges = async () => {
    try {
      setLoading(true);
      await bulkUpdate(editedData);
      setCurrentPage(1);
      setSearch((prev) => !prev);
      setEditedData({});
      setUnsavedChanges(false);
      toast.success("Updated QRs successfully", {
        position: "top-right",
        style: successToast
      });
    } catch (error) {
      toast.error("Error occured while updating QRs", {
        position: "top-right",
        style: errorToast
      });
      setLoading(false);
      setEditedData({});
      setUnsavedChanges(false);
    }
  };

  if (loading || loadingProducts) return <Loader />;

  return (
    <div className="p-4">
      <div className="pb-4 px-1 flex justify-between items-center">
        <p className="text-gray-600">
          Use the dropdowns to change linked products or to change the status of QRs. Click Save Changes once you are
          done
        </p>
        <Button
          onClick={handleChanges}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-5 px-8 rounded">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <CardTitle className="text-lg font-semibold ">Generated QRs</CardTitle>
              <div className="flex items-center relative">
                <div className="w-[300px]">
                  <Input
                    type="text"
                    placeholder="Search QR by Serial or Product Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10"
                  />
                </div>
                <button className="absolute right-0 h-9 w-10 flex rounded-r-md justify-center items-center bg-gray-300">
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
              {/* Search */}

              {/* Sort and Status */}
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Sort by: Latest first</SelectItem>
                    <SelectItem value="oldest">Sort by: Oldest first</SelectItem>
                    {/* <SelectItem value="name-asc">Name A-Z</SelectItem>
                    <SelectItem value="name-desc">Name Z-A</SelectItem> */}
                  </SelectContent>
                </Select>

                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-32">
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
              <TableRow className="bg-green-50">
                <TableHead className="pl-4 text-black">QR Serial No.</TableHead>
                <TableHead className="text-black">Linked Product</TableHead>
                <TableHead className="text-black">Linked Printer</TableHead>
                <TableHead className="text-black">Date created</TableHead>
                <TableHead className="text-black">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qrData.length > 0 ? (
                qrData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium pl-5">#{item.id}</TableCell>
                    <TableCell>
                      <Select
                        value={editedData[item.id]?.product?.toString() ?? item?.product_id?.toString()}
                        onValueChange={(value) => handleFieldChange(item.id, "product", parseInt(value))}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {item.product_name && <SelectItem value="-1">Unlink Product</SelectItem>}
                          {products.results.map((product) => (
                            <SelectItem key={product.id} value={product.id.toString()}>
                              {product.product_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell>{item.printer_name}</TableCell>
                    <TableCell>{item.created_at}</TableCell>
                    <TableCell>
                      <Select
                        value={editedData[item.id]?.status ?? item.status}
                        onValueChange={(value) => handleFieldChange(item.id, "status", value)}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Expired">Expired</SelectItem>
                          <SelectItem value="Archived">Archived</SelectItem>
                          <SelectItem value="Compromised">Compromised</SelectItem>
                        </SelectContent>
                      </Select>
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

export default BulkQREditor;
