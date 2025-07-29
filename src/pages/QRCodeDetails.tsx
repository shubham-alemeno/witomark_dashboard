"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductApiResponse, ProductsFilter, QRDetailsResponse } from "@/lib/api/types";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useAxios } from "@/hooks/useAxios";
import { downloadQR, getAllProductsQuery, getQR, updateQR } from "@/lib/api/methods";
import ActiveQRLandingPage from "@/components/ActiveQRLandingPage";
import InActiveQRLandingPage from "@/components/InActiveQRLandingPage";

interface LinkedProduct {
  id?: number;
  product_name?: string;
  product_description?: string;
  product_image?: string;
}

const QRCodeDetails = () => {
  const params = useParams();
  const { data: products, isLoading: loadingProducts } = useAxios<ProductApiResponse, ProductsFilter>(
    getAllProductsQuery,
    { status: "Active", search: "" }
  );
  const { data: qrData, isLoading: loadingQr, refetch } = useAxios<QRDetailsResponse, string>(getQR, params.qrId);

  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [linkedProduct, setLinkedProduct] = useState<LinkedProduct>({});

  useEffect(() => {
    if (!loadingQr) {
      setLinkedProduct(qrData.product);
      setStatus(qrData.status);
    }
  }, [products, loadingQr]);

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateQR(params.qrId, { status, product: linkedProduct.id });
      await refetch();
      alert("Saved changes successfully");
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const clickedId = e.currentTarget.id;

    try {
      setLoading(true);

      const response = await downloadQR(qrData.fingerprint_id, clickedId);

      let blob: Blob;

      if (clickedId === "svg") {
        blob = new Blob([response], { type: "image/svg+xml" });
      } else {
        // blob = response instanceof Blob ? response : new Blob([response], { type: "image/png" });
        blob = new Blob([response], { type: "image/svg+xml" });
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `qr-${qrData.fingerprint_id}.${clickedId}`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  if (loadingQr || loadingProducts || loading) return <div>Loading...</div>;

  return (
    <div>
      <Card className="rounded-md min-h-full">
        <CardContent className="flex min-h-full p-0 justify-between">
          {/* Left Section - QR Details */}
          <div className="relative pt-1 w-full">
            <Table className="w-full table-auto text-left text-sm text-gray-700">
              <TableBody className="text-black">
                <TableRow className="border-b hover:bg-transparent">
                  <TableCell className="w-1/4 px-4 py-2 font-semibold text-gray-600">QR Serial Number:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">#{qrData.serial_number}</TableCell>
                </TableRow>
                <TableRow className="border-b hover:bg-transparent">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">QR Fingerprint ID:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">{qrData.fingerprint_id}</TableCell>
                </TableRow>
                <TableRow className="border-b hover:bg-transparent">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Date created:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">{qrData.created_at}</TableCell>
                </TableRow>
                <TableRow className="border-b hover:bg-transparent">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Linked Printer:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">{qrData.printer_name}</TableCell>
                </TableRow>
                <TableRow className="border-b hover:bg-transparent">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Encoded URL:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">
                    <p>{qrData.fingerprint_url}</p>
                  </TableCell>
                </TableRow>
                <TableRow className="border-b align-top hover:bg-transparent">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Download File:</TableCell>
                  <TableCell className="px-4 py-2">
                    <div className="flex space-x-4 mt-1">
                      {/* <div className="text-center space-y-1">
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
                      </div> */}
                      <div className="text-center space-y-1">
                        <img src="/witomark-qr.jpg" alt="QR 2" width={80} height={80} className="mx-auto border" />
                        <div className="text-sm">
                          <a
                            href="#"
                            className="text-green-600 hover:underline font-semibold"
                            id="svg"
                            onClick={handleDownload}>
                            SVG
                          </a>{" "}
                          |{" "}
                          <a
                            href="#"
                            className="text-green-600 hover:underline font-semibold"
                            id="png"
                            onClick={handleDownload}>
                            PNG
                          </a>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="border-b hover:bg-transparent">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Times Downloaded:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">{qrData.download_count}</TableCell>
                </TableRow>
                <TableRow className="border-b hover:bg-transparent">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Linked Product:</TableCell>
                  <TableCell className="px-4 py-2 flex">
                    <span className="font-medium font-semibold">{linkedProduct?.product_name ?? ""}</span>
                    <span className="ml-3 font-semibold">|</span>
                    <Select
                      value={linkedProduct?.id?.toString() ?? ""}
                      onValueChange={(id) => {
                        setLinkedProduct(products.results.find((p) => p.id === parseInt(id)));
                      }}>
                      <SelectTrigger className="w-32 border-none shadow-none h-5 relative hover:border-none focus:outline-none focus:ring-0 [&>svg]:hidden">
                        <span className="text-sm text-green-600 font-semibold">Link Product</span>
                      </SelectTrigger>
                      <SelectContent>
                        {products.results.map((product) => (
                          <SelectItem key={product.id} value={product.id.toString()}>
                            {product.product_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              <Button className="bg-green-600 hover:bg-green-700 px-8 py-5" onClick={handleSave}>
                Save Details
              </Button>
            </div>
          </div>
          {/* Right Section - Webpage Preview */}
          <div className=" max-w-[460px]  bg-green-500 px-20 pb-8 pt-5 rounded-r-md">
            <div className="text-white text-sm py-2 text-center">
              Webpage preview
              <br />
              <span className="underline cursor-pointer text-xs">Link or Unlink product to change web preview</span>
            </div>
            <div className="text-center h-[450px] bg-gray-100 mx-6">
              {status === "Active" || status === "Compromised" ? (
                <ActiveQRLandingPage
                  status={status}
                  productName={linkedProduct?.product_name}
                  productDetails={linkedProduct?.product_description}
                  productImage={linkedProduct?.product_image}
                />
              ) : (
                <InActiveQRLandingPage status={status} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeDetails;
