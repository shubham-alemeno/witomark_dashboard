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

const ProductDetails = () => {
  const params = useParams();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [linkedQRs, setLinkedQRs] = useState<Fingerprint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getProduct(params.productId);
      console.log(response.qr_fingerprints);
      setProductName(response.product_name);
      setProductDescription(response.product_description);
      setImagePreview(response.product_image);
      setStatus(response.status);
      setLinkedQRs(response.qr_fingerprints);
      setLoading(false);
    })();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (productName === "") {
        console.log("Product Name cannot be empty");
        return;
      }
      const response = await updateProduct(params.productId, {
        product_name: productName,
        product_description: productDescription,
        product_image: imageFile,
        status
      });
      alert("Product details updated successfully");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(params.productId);
      navigate(-1);
    } catch (error) {
      alert(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <Card className="rounded-md min-h-full">
        <CardContent className="flex min-h-full p-0">
          {/* Left Section - Form */}
          <div className="relative w-3/5 pt-1">
            <Table className="w-full table-auto text-left text-sm text-gray-700">
              <TableBody className="text-black">
                <TableRow className="border-b">
                  <TableCell className="w-1/4 px-4 py-2 font-semibold text-gray-600">Product ID:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">#{params.productId}</TableCell>
                </TableRow>
                <TableRow className="border-b">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Product Name:</TableCell>
                  <TableCell className="px-4 py-2">
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full border px-2 py-1 rounded text-sm"
                    />
                  </TableCell>
                </TableRow>
                <TableRow className="border-b">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Product Description:</TableCell>
                  <TableCell className="px-4 py-2">
                    <textarea
                      rows={3}
                      value={productDescription ?? ""}
                      onChange={(e) => setProductDescription(e.target.value)}
                      className="w-full border px-2 py-1 rounded text-sm"
                    />
                  </TableCell>
                </TableRow>
                <TableRow className="border-b align-top">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Product Image:</TableCell>
                  <TableCell className="px-4 py-2 space-y-2">
                    {imageFile ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 text-sm">
                          <span>{imageFile.name.substring(0, 20) + "..."}</span>
                          <p>|</p>
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
                          <img src={imagePreview ?? ""} alt="Preview" className="max-h-32 rounded border" />
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
                <TableRow className="border-b">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Status:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">
                    <Select value={status} onValueChange={setStatus}>
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
                <TableRow className="border-b">
                  <TableCell className="px-4 py-2 font-semibold text-gray-600">Linked QR Serial:</TableCell>
                  <TableCell className="px-4 py-2 font-semibold">
                    {"["}{" "}
                    {linkedQRs.map((qr, index) =>
                      linkedQRs.length === index + 1 ? (
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

            <div className="absolute bottom-0 w-full flex justify-between items-center p-6">
              <ConfirmDialog
                message={`Are you sure you want to delete ${productName}`}
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
            <div className="bg-white text-center h-[480px] mx-6">
              <div className="w-full flex justify-center items-center py-3">
                <img src="/witomark-logo.png" alt="Logo" width={100} height={30} className="mx-auto rounded-md" />
              </div>
              <div>
                <h1 className="font-semibold text-sm text-left px-3 line-clamp-1">{productName}</h1>
                <p className="text-xs text-left px-3 line-clamp-3 mb-2">{productDescription}</p>
                {imagePreview ? (
                  <img src={imagePreview} alt="Product" className="w-full object-cover h-[155px]" />
                ) : null}
              </div>
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

export default ProductDetails;
