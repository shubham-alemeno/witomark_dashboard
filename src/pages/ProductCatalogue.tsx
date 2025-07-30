import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { qrData } from "@/data/mockQRData";
import { useNavigate } from "react-router-dom";
import { useAxios } from "@/hooks/useAxios";
import { createProduct, getAllProducts, getAllProductsQuery } from "@/lib/api/methods";
import { Product } from "@/lib/api/types";

const ProductCatalogue = () => {
  const { data, isLoading, error } = useAxios(getAllProducts);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [status, setStatus] = useState<string>("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      console.log("Data set");
      setProducts(data.results);
    }
  }, [data]);

  const handleCreateProduct = async () => {
    try {
      await createProduct({ product_name: productName });
      alert("Product Created Successfully");
    } catch (error) {
      alert(error);
    }
  };

  const handleFilters = async (statusArg?: string, searchArg?: string) => {
    try {
      setLoading(true);
      const response = await getAllProductsQuery({
        status: statusArg ?? (status == "All" ? "" : status),
        search: searchArg ?? searchTerm
      });
      setProducts(response.results);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || isLoading) return <div>Loading...</div>;

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
              <span className="text-2xl font-bold pb-1">{data.total_count}</span>
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
                  onClick={() => handleFilters()}>
                  <Search className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="flex flex-row justify-end gap-4">
              {/* Search */}

              {/* Sort and Status */}
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
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
                    handleFilters(val === "All" ? "" : val);
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
                    <TableCell className="font-medium pl-5 py-4">#{item.id}</TableCell>
                    <TableCell className="py-4">{item.product_name}</TableCell>
                    <TableCell className="py-4">{item.qr_fingerprints_count}</TableCell>
                    <TableCell className="py-4">{item.created_at}</TableCell>
                    <TableCell className="py-4">
                      <Button
                        variant="link"
                        className="text-blue-700 hover:text-green-700 p-0 h-auto"
                        onClick={() => navigate(`/product-catalogue/${item.id}`)}>
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
      </Card>
    </div>
  );
};

export default ProductCatalogue;
