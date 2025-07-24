import React, { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { qrData } from "@/data/mockQRData";

const ProductCatalogue = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [productName, setProductName] = useState("");
    const [sortBy, setSortBy] = useState("latest");
    const [status, setStatus] = useState("all");

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
        <div className="min-h-screen bg-gray-100 space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-5 gap-4">
                {/* Total Products Added */}

                <Card>
                    <CardContent className="p-5">
                        <div className="text-sm text-gray-700 font-semibold text-muted-foreground">
                            Total products added
                        </div>
                        <div className="flex items-center">
                            <img src="/hexagon.png" className="w-6 h-6" />
                            <span className="text-2xl font-bold">{qrData.length}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Add Products */}

                <Card className="col-span-2">
                    <CardContent className="p-5">
                        <div className="flex">
                            <div className="w-1/2">
                                <div className="text-sm text-gray-700 font-semibold text-muted-foreground mb-2">
                                    Enter Product Name
                                </div>
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
                                <Button className="bg-[#969ee6] hover:bg-[#abb4ea] rounded-sm px-8 py-5">
                                    + Add Product
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Added Products Section */}
            <Card>
                <CardHeader>
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
                                        className="w-full pr-10 h-7"
                                    />
                                </div>
                                <button className="absolute right-0 h-7 w-10 flex rounded-r-md justify-center items-center bg-gray-300">
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
                                        <SelectItem value="latest">
                                            Sort by: Latest first
                                        </SelectItem>
                                        <SelectItem value="oldest">
                                            Sort by: Oldest first
                                        </SelectItem>
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
                            <TableRow className="bg-gray-100">
                                <TableHead className="pl-4">Product ID</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Linked QR</TableHead>
                                <TableHead>Date added</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAndSortedData.length > 0 ? (
                                filteredAndSortedData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium pl-5">
                                            {item.id}
                                        </TableCell>
                                        <TableCell>{item.linkedProduct}</TableCell>
                                        <TableCell>{item.linkedPrinter}</TableCell>
                                        <TableCell>{item.dateCreated}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="link"
                                                className="text-blue-700 hover:text-green-700 p-0 h-auto"
                                            >
                                                View details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center py-8 text-muted-foreground"
                                    >
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

export default ProductCatalogue;
