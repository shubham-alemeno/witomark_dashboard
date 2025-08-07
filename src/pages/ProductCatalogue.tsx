import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { createProduct, listProducts } from "@/lib/api/methods";
import { Product } from "@/lib/api/types";
import Loader from "@/components/Loader";
import { errorToast, successToast } from "@/lib/utils";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext
} from "@/components/ui/pagination";
import { qrData } from "@/data/mockQRData";

const ProductCatalogue = () => {
  const [productName, setProductName] = useState<string>("");

  const [products, setProducts] = useState<Product[]>([]);
  const [totalProduct, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [status, setStatus] = useState<string>("All");
  const [search, setSearch] = useState<boolean>(false);

  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 30;

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await listProducts({
        page: currentPage,
        page_size: pageSize,
        status: status === "All" ? "" : status,
        search: searchTerm,
        sort: sortBy
      });
      console.log("Real...", response);
      setProducts(response.results);
      setTotalProducts(response.total_count);
      setTotalCount(response.count);
      setTotalPages(Math.ceil(response.count / pageSize));
      setLoading(false);
    })();
  }, [status, search, sortBy, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [status, sortBy]);

  const handleCreateProduct = async () => {
    try {
      setLoading(true);
      await createProduct({ product_name: productName });
      toast.success("Product created successfully", {
        position: "top-right",
        style: successToast
      });
    } catch (error) {
      const nameError: boolean = error?.response?.data?.product_name?.length > 0 ? true : false;
      toast.error(nameError ? "Error: Product Name cannot be empty" : "Error occured while creating product", {
        position: "top-right",
        style: errorToast
      });
    } finally {
      // reload the page by changing state
      setSearch((prev) => !prev);
      setProductName("");
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        {/* Total Products Added */}

        <Card>
          <CardContent className="p-5">
            <div className="text-sm text-gray-700 text-muted-foreground mb-1">Total products added</div>
            <div className="flex items-center gap-1">
              <img src="/hexagon.png" className="w-7 h-7" />
              <span className="text-2xl font-bold pb-1">{totalProduct}</span>
            </div>
          </CardContent>
        </Card>

        {/* Add Products */}

        <Card className="col-span-2">
          <CardContent className="p-5">
            <div className="flex">
              <div className="w-1/2">
                <div className="text-sm text-gray-700 text-muted-foreground mb-2">Enter Product Name</div>
                <div className="space-y-3">
                  <Input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Placeholder name"
                    className="flex-1 h-7"
                  />
                </div>
              </div>
              <div className="w-1/2 flex justify-end items-center">
                <Button className="bg-[#969ee6] hover:bg-[#abb4ea] rounded-sm px-8 py-5" onClick={handleCreateProduct}>
                  + Add Product
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Added Products Section */}
      <Card className="p-6">
        <CardHeader className="p-0 mb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <CardTitle className="text-lg font-semibold ">Products</CardTitle>
              <div className="flex items-center relative">
                <div className="w-[300px]">
                  <Input
                    type="text"
                    placeholder="Search product by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 h-8"
                  />
                </div>
                <button
                  className="absolute right-0 h-8 w-10 flex rounded-r-md justify-center items-center bg-gray-300"
                  onClick={() => {
                    setCurrentPage(1);
                    setSearch((prev) => !prev);
                  }}>
                  <Search className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="flex flex-row justify-end gap-4">
              {/* Search */}

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
                    <SelectItem value="latest">Sort by: Latest first</SelectItem>
                    <SelectItem value="oldest">Sort by: Oldest first</SelectItem>
                    <SelectItem value="name-asc">Sort by: Name A-Z</SelectItem>
                    <SelectItem value="name-desc">Sort by: Name Z-A</SelectItem>
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
                    <SelectItem value="All">Status: All</SelectItem>
                    <SelectItem value="Active">Status: Active</SelectItem>
                    <SelectItem value="Inactive">Status: Inactive</SelectItem>
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
                <TableHead className="pl-4">Product ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Linked QR</TableHead>
                <TableHead>Date added</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium pl-5 py-4">#{item.product_id}</TableCell>
                    <TableCell className="py-4">{item.product_name}</TableCell>
                    <TableCell className="py-4">{item.qr_fingerprints_count}</TableCell>
                    <TableCell className="py-4">{new Date(item.created_at).toLocaleString()}</TableCell>
                    <TableCell className="py-4">
                      <Button
                        variant="link"
                        className="text-blue-700 hover:text-green-700 p-0 h-auto"
                        onClick={() => navigate(`/product-catalogue/${item.product_id}/${item.product_name}`)}>
                        View details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No products found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {/* Pagination */}
        {!loading && products.length > 0 && totalPages > 1 && (
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

export default ProductCatalogue;
