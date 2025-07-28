"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Fingerprint } from "@/lib/api/types";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const QRCodeDetails = () => {
  const [qrCode, setQrCode] = useState<Fingerprint | null>(null);
  const [status, setStatus] = useState<string>("");

  const params = useParams();
  useEffect(() => {
    //const response =
  }, []);
  return (
    <div>
      <Card className="rounded-md min-h-full">
        <CardContent className="flex min-h-full p-0">
          {/* Left Section - QR Details */}
          <div className="relative w-3/5 pt-1">
            <Table className="w-full table-auto text-left text-sm text-gray-700">
              <TableBody className="text-black">
                <TableRow className="border-b">
                  <TableCell className="w-1/4 px-4 py-2 font-semibold text-gray-600">QR Serial Number:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">#11</TableCell>
                </TableRow>
                <TableRow className="border-b">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">QR Fingerprint ID:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">HHDChyil</TableCell>
                </TableRow>
                <TableRow className="border-b">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Date created:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">June 21, 2025, 1:11 p.m.</TableCell>
                </TableRow>
                <TableRow className="border-b">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Linked Printer:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">Xerox Versa 1980</TableCell>
                </TableRow>
                <TableRow className="border-b">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Encoded URL:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">
                    <p>https://qr.alemeno.com/HHdChyil</p>
                  </TableCell>
                </TableRow>
                <TableRow className="border-b align-top">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Download File:</TableCell>
                  <TableCell className="px-4 py-2">
                    <div className="flex space-x-4 mt-1">
                      <div className="text-center space-y-1">
                        <img src="/witomark-qr.jpg" alt="QR 1" width={80} height={80} className="mx-auto border" />
                        <div className="text-sm">
                          <a href="#" className="text-green-600 hover:underline font-semibold">
                            SVG
                          </a>{" "}
                          |{" "}
                          <a href="#" className="text-green-600 hover:underline font-semibold">
                            PNG
                          </a>
                        </div>
                      </div>
                      <div className="text-center space-y-1">
                        <img src="/witomark-qr.jpg" alt="QR 2" width={80} height={80} className="mx-auto border" />
                        <div className="text-sm">
                          <a href="#" className="text-green-600 hover:underline font-semibold">
                            SVG
                          </a>{" "}
                          |{" "}
                          <a href="#" className="text-green-600 hover:underline font-semibold">
                            PNG
                          </a>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="border-b">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Times Downloaded:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">0</TableCell>
                </TableRow>
                <TableRow className="border-b">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Linked Product:</TableCell>
                  <TableCell className="px-4 py-2">
                    <a href="#" className="text-green-600 hover:underline font-semibold">
                      Link product
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Status:</TableCell>
                  <TableCell className="px-4 py-2 flex">
                    <span className="font-medium font-semibold">{status}</span>
                    <span className="ml-3 font-semibold">|</span>
                    <Select
                      value={status}
                      onValueChange={(val) => {
                        setStatus(val);
                      }}>
                      <SelectTrigger className="w-32 border-none shadow-none h-5 relative hover:border-none focus:outline-none focus:ring-0 [&>svg]:hidden">
                        <span className="text-sm text-green-600 font-semibold">Change Status</span>
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
              </TableBody>
            </Table>

            <div className="absolute bottom-0 w-full flex justify-end p-6">
              <Button className="bg-green-600 hover:bg-green-700 px-8 py-5">Save Details</Button>
            </div>
          </div>
          {/* Right Section - Webpage Preview */}
          <div className="w-2/5 bg-green-500 px-20 pb-8 pt-5 rounded-r-md">
            <div className="text-white text-sm py-2 text-center">
              Webpage preview
              <br />
              <span className="underline cursor-pointer text-xs">Link or Unlink product to change web preview</span>
            </div>
            <div className="bg-white text-center h-[480px] mx-6">
              <div className="w-full flex justify-center items-center py-3">
                <img src="/witomark-logo.png" alt="Logo" width={100} height={30} className="mx-auto rounded-md" />
              </div>
              <img src="/witomark-image.jpg" alt="Product Scan" className="w-full" />
              <div className="mt-4 px-4 flex items-center justify-center gap-2 text-sm text-gray-700">
                <img src="/witomark-qr.jpg" alt="QR Code" width={50} height={50} />
                <span className="text-left text-xs pb-1">
                  Scan the QR Fingerprint and verify whether the product is genuine or not
                </span>
              </div>
              <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white rounded-full">
                Scan QR Fingerprint
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeDetails;
