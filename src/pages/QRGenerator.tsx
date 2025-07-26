import React, { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { qrData } from "@/data/mockQRData";
import { useNavigate } from "react-router-dom";

const QRGenerator = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [qrCount, setQrCount] = useState("6");
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [status, setStatus] = useState("all");

  const navigate = useNavigate();

  // Filter and sort data based on dropdowns and search
  const filteredAndSortedData = React.useMemo(() => {
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

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        {/* Total QRs Generated */}

        <Card>
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground">
              Total QRs <br /> generated
            </div>
            <div className="flex items-center gap-1">
              <img src="/qricon.png" className="w-7 h-7" />
              <span className="text-2xl font-bold pb-1">11</span>
            </div>
          </CardContent>
        </Card>

        {/* Total QR Generation Limit */}

        <Card>
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground">Total QR generation limit for your plan</div>
            <div className="flex items-center gap-1">
              <img src="/qricon.png" className="w-7 h-7" />
              <span className="text-2xl font-bold pb-1">19,000</span>
            </div>
          </CardContent>
        </Card>

        {/* Credit Balance */}

        <Card>
          <CardContent className="p-5">
            <div className="text-[13px] text-muted-foreground">
              Credit balance |{" "}
              <span className="text-green-600 cursor-pointer hover:underline" onClick={() => navigate("/plan-details")}>
                Buy credits
              </span>
            </div>
            <div className="text-xs text-muted-foreground">(1 credit = 1 QR generation)</div>
            <div className="flex items-center gap-1">
              <img src="/dollar.png" className="w-7 h-7" />
              <span className="text-2xl font-bold pb-1">1691</span>
            </div>
          </CardContent>
        </Card>

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
                      value={qrCount}
                      onChange={(e) => setQrCount(e.target.value)}
                      placeholder="6"
                      className="flex-1 h-7"
                    />
                    <Select value={selectedPrinter} onValueChange={setSelectedPrinter}>
                      <SelectTrigger className="w-32 h-7">
                        <SelectValue placeholder="Select printer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xerox-1200">Xerox Versa 1200</SelectItem>
                        <SelectItem value="canon-2645">Canon ImageRunner</SelectItem>
                        <SelectItem value="hp-400">HP LaserJet Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex justify-end items-center">
                <Button className="bg-green-400 hover:bg-green-500 rounded-sm px-8 py-5">Generate QRs</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generated QRs Section */}
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
                <TableHead className="pl-4">QR Serial No.</TableHead>
                <TableHead>Linked Product</TableHead>
                <TableHead>Linked Printer</TableHead>
                <TableHead>Date created</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.length > 0 ? (
                filteredAndSortedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium pl-5">#{item.id}</TableCell>
                    <TableCell>{item.linkedProduct}</TableCell>
                    <TableCell>{item.linkedPrinter}</TableCell>
                    <TableCell>{item.dateCreated}</TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        className="text-green-600 hover:text-green-700 p-0 h-auto"
                        onClick={() => navigate(`/qr-generator/${item.id}`)}>
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
      </Card>
    </div>
  );
};

export default QRGenerator;
