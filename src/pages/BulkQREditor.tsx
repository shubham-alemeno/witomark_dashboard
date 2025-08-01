import { useState, useMemo } from "react";
import { qrData } from "@/data/mockQRData";
import { Save, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BulkQREditor = () => {
  const [sortBy, setSortBy] = useState("latest");
  const [status, setStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editedData, setEditedData] = useState<Record<string, { linkedProduct: string; status: string }>>({});

  const handleFieldChange = (id: string, field: "linkedProduct" | "status", value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = qrData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.linkedProduct.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (status !== "all") {
      filtered = filtered.filter((item) => item.status === status);
    }

    // Sort data
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
        case "oldest":
          return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
        case "name-asc":
          return a.linkedProduct.localeCompare(b.linkedProduct);
        case "name-desc":
          return b.linkedProduct.localeCompare(a.linkedProduct);
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchTerm, status, sortBy]);

  const handleChanges = () => {
    console.log("Submitting changes:", editedData);
    // API call goes here
  };

  return (
    <div>
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
                  <Search className="h-4 w-4 text-muted-foreground" />
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
                    <SelectItem value="latest">Sort by: Latest first</SelectItem>
                    <SelectItem value="oldest">Sort by: Oldest first</SelectItem>
                    <SelectItem value="name-asc">Sort by: Name A-Z</SelectItem>
                    <SelectItem value="name-desc">Sort by: Name Z-A</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Status: All</SelectItem>
                    <SelectItem value="active">Status: Active</SelectItem>
                    <SelectItem value="inactive">Status: Inactive</SelectItem>
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
              {filteredAndSortedData.length > 0 ? (
                filteredAndSortedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium pl-5">#{item.id}</TableCell>
                    <TableCell>
                      <Select
                        value={editedData[item.id]?.linkedProduct ?? item.linkedProduct}
                        onValueChange={(value) => handleFieldChange(item.id, "linkedProduct", value)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {qrData.map((qrItem) => (
                            <SelectItem key={qrItem.id} value={qrItem.linkedProduct}>
                              {qrItem.linkedProduct}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell>{item.linkedPrinter}</TableCell>
                    <TableCell>{item.dateCreated}</TableCell>
                    <TableCell>
                      <Select
                        value={editedData[item.id]?.status ?? item.status}
                        onValueChange={(value) => handleFieldChange(item.id, "status", value)}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
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
      </Card>
    </div>
  );
};

export default BulkQREditor;
