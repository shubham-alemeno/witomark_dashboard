"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const QRCodeDetails = () => {
  const params = useParams();
  useEffect(() => {
    console.log(params.qrId);
  }, []);
  return (
    <div>
      <Card className="rounded-md min-h-full">
        <CardContent className="flex min-h-full p-0">
          {/* Left Section - QR Details */}
          <div className="relative w-3/5 pt-1">
            <table className="w-full table-auto text-left text-sm text-gray-700">
              <tbody className="text-black">
                <tr className="border-b">
                  <td className="w-1/4 px-4 py-2 font-semibold text-gray-600">QR Serial Number:</td>
                  <td className="px-4 py-2 font-semibold">#11</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold text-gray-600">QR Fingerprint ID:</td>
                  <td className="px-4 py-2 font-semibold">HHDChyil</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold text-gray-600">Date created:</td>
                  <td className="px-4 py-2 font-semibold">June 21, 2025, 1:11 p.m.</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold text-gray-600">Linked Printer:</td>
                  <td className="px-4 py-2 font-semibold">Xerox Versa 1980</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold text-gray-600">Encoded URL:</td>
                  <td className="px-4 py-2 font-semibold">
                    <p>https://qr.alemeno.com/HHdChyil</p>
                  </td>
                </tr>
                <tr className="border-b align-top">
                  <td className="px-4 py-2 font-semibold text-gray-600">Download File:</td>
                  <td className="px-4 py-2">
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
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold text-gray-600">Times Downloaded:</td>
                  <td className="px-4 py-2 font-semibold">0</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold text-gray-600">Linked Product:</td>
                  <td className="px-4 py-2">
                    <a href="#" className="text-green-600 hover:underline font-semibold">
                      Link product
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold text-gray-600">Status:</td>
                  <td className="px-4 py-2">
                    <span className="font-medium font-semibold">Active</span> |{" "}
                    <a href="#" className="text-green-600 hover:underline font-semibold">
                      Change status
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

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
