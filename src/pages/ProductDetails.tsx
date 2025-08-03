"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteProduct, getProduct, updateProduct } from "@/lib/api/methods";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Fingerprint } from "@/lib/api/types";
import { toast } from "sonner";

interface ProductData {
  productName: string;
  productDescription: string;
  imageFile: File | null;
  imagePreview: string | null;
  linkedQRs: Fingerprint[];
  status: string;
}

const ProductDetails = () => {
  const params = useParams();

  const [productData, setProductData] = useState<ProductData>({
    productName: "",
    productDescription: "",
    imageFile: null,
    imagePreview: null,
    linkedQRs: [],
    status: ""
  });

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getProduct(params.productId);
      console.log(response.qr_fingerprints);
      setProductData({
        productName: response.product_name,
        productDescription: response.product_description,
        imageFile: null,
        imagePreview: response.product_image,
        linkedQRs: response.qr_fingerprints,
        status: response.status
      });
      setLoading(false);
    })();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const removeImage = () => {
    setProductData((prev) => ({
      ...prev,
      imageFile: null,
      imagePreview: null
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (productData.productName === "") {
        console.log("Product Name cannot be empty");
        return;
      }
      await updateProduct(params.productId, {
        product_name: productData.productName,
        product_description: productData.productDescription,
        product_image: productData.imageFile,
        status: productData.status
      });
      toast.success("Product detials updated successfully", {
        position: "top-right",
        style: { color: "rgba(0, 210, 0)", border: "2px solid rgba(0, 210, 0, 0.5)" }
      });
    } catch (error) {
      toast.error("Error occured while saving", {
        position: "top-right",
        style: { color: "rgba(255, 0, 0)", border: "2px solid rgba(255, 0, 0, 0.5)" }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(params.productId);
      toast.success("Product deleted successfully", {
        position: "top-right",
        style: { color: "rgba(0, 210, 0)", border: "2px solid rgba(0, 210, 0, 0.5)" }
      });
      navigate(-1);
    } catch (error) {
      toast.error("Error occured while deleting", {
        position: "top-right",
        style: { color: "rgba(255, 0, 0)", border: "2px solid rgba(255, 0, 0, 0.5)" }
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <Card className="rounded-md min-h-full">
        <CardContent className="flex min-h-full p-0">
          {/* Left Section - Form */}
          <div className="relative w-3/5 pt-2 px-4">
            <Table className="w-full table-auto text-left text-sm text-gray-700">
              <TableBody className="text-black">
                <TableRow className="border-b hover:bg-transparent">
                  <TableCell className="w-1/4 px-4 py-2 font-semibold text-gray-600">Product ID:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">#{params.productId}</TableCell>
                </TableRow>
                <TableRow className="border-b hover:bg-transparent">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Product Name:</TableCell>
                  <TableCell className="px-4 py-2">
                    <input
                      type="text"
                      value={productData.productName}
                      onChange={(e) => setProductData((prev) => ({ ...prev, productName: e.target.value }))}
                      className="w-full border px-2 py-1 rounded text-sm"
                    />
                  </TableCell>
                </TableRow>
                <TableRow className="border-b hover:bg-transparent">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Product Description:</TableCell>
                  <TableCell className="px-4 py-2">
                    <textarea
                      rows={3}
                      value={productData.productDescription ?? ""}
                      onChange={(e) => setProductData((prev) => ({ ...prev, productDescription: e.target.value }))}
                      className="w-full border px-2 py-1 rounded text-sm"
                    />
                  </TableCell>
                </TableRow>
                <TableRow className="border-b align-top hover:bg-transparent">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Product Image:</TableCell>
                  <TableCell className="px-4 py-2 space-y-2">
                    {productData.imagePreview ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 text-sm">
                          {productData.imageFile && <span>{productData.imageFile.name.substring(0, 20) + "..."}</span>}
                          {productData.imageFile && <p>|</p>}
                          <label className="text-blue-600 cursor-pointer hover:underline">
                            Change Image
                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                          </label>
                          <p>|</p>
                          <button onClick={removeImage} className="text-red-600 hover:underline">
                            Remove Image
                          </button>
                        </div>
                        <div>
                          <img src={productData.imagePreview ?? ""} alt="Preview" className="max-h-32 rounded border" />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="text-blue-600 cursor-pointer hover:underline">
                          Upload Image
                          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow className="border-b hover:bg-transparent">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Status:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">
                    <Select
                      value={productData.status}
                      onValueChange={(val) => setProductData((prev) => ({ ...prev, status: val }))}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow className="border-b hover:bg-transparent">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Linked QR Serial:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">
                    {"["}{" "}
                    {productData.linkedQRs.map((qr, index) =>
                      productData.linkedQRs.length === index + 1 ? (
                        <span key={qr.serial_number}>#{qr.serial_number}</span>
                      ) : (
                        <span key={qr.serial_number}>#{qr.serial_number}, </span>
                      )
                    )}{" "}
                    {"]"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="absolute bottom-0 w-full flex justify-between items-center p-6 pr-10">
              <ConfirmDialog
                message={`Are you sure you want to delete ${productData.productName}`}
                onConfirm={handleDelete}
                trigger={(open) => (
                  <div className="bg-red-200 p-2 rounded-sm hover:cursor-pointer hover:bg-red-300" onClick={open}>
                    <img src="/delete.png" alt="Delete" className="mx-auto rounded-md w-7 h-7" />
                  </div>
                )}
              />

              <Button className="bg-[#2c3fcc] hover:bg-green-700 px-8 py-5" onClick={handleSave}>
                Save Details
              </Button>
            </div>
          </div>

          {/* Right Section - Webpage Preview */}
          <div className="w-2/5 bg-[#2c3fcc] px-20 pb-8 pt-5 rounded-r-md">
            <div className="text-white text-sm py-2 text-center">Webpage preview</div>
            <div className="bg-gray-100 text-center h-[450px] mx-6">
              <div className="w-full flex justify-center items-center py-3">
                <img src="/witomark-logo.png" alt="Logo" width={100} height={30} className="mx-auto rounded-md" />
              </div>
              <div className="bg-white border-t-2">
                <div>
                  <h1 className="font-semibold text-sm text-left px-3 line-clamp-1">{productData.productName}</h1>
                  <p className="text-xs text-left px-3 line-clamp-3 mb-2">{productData.productDescription}</p>
                  {productData.imagePreview ? (
                    <img src={productData.imagePreview} alt="Product" className="w-full object-cover h-[135px]" />
                  ) : null}
                </div>
              </div>
              <div className="mt-4 px-4 flex items-center justify-center gap-2 text-sm text-gray-700">
                <img src="/witomark-qr.jpg" alt="QR Code" width={50} height={50} />
                <span className="text-left text-xs pb-1">
                  Scan the QR Fingerprint and verify whether the product is genuine or not
                </span>
              </div>
              <Button className="mt-4 bg-[#02bc5f] hover:bg-green-600 text-white rounded-full text-xs pb-2.5">
                <img src="/camera.png" alt="camera" width="15" height="15" className="mt-0.5" />
                Scan QR Fingerprint
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
