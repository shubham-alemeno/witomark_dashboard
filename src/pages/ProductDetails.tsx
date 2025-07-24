"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const params = useParams();

  const [productName, setProductName] = useState("Nice Product");
  const [productDescription, setProductDescription] = useState("The nicest product around these parts");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    console.log(params.productId);
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

  return (
    <div>
      <Card className="rounded-md min-h-full">
        <CardContent className="flex min-h-full p-0">
          {/* Left Section - Form */}
          <div className="relative w-3/5 pt-1">
            <table className="w-full table-auto text-left text-sm text-gray-700">
              <tbody className="text-black">
                <tr className="border-b">
                  <td className="w-1/4 px-4 py-2 font-semibold text-gray-600">Product ID:</td>
                  <td className="px-4 py-2 font-semibold">#11</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold text-gray-600">Product Name:</td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full border px-2 py-1 rounded text-sm"
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold text-gray-600">Product Description:</td>
                  <td className="px-4 py-2">
                    <textarea
                      rows={3}
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      className="w-full border px-2 py-1 rounded text-sm"
                    />
                  </td>
                </tr>
                <tr className="border-b align-top">
                  <td className="px-4 py-2 font-semibold text-gray-600">Product Image:</td>
                  <td className="px-4 py-2 space-y-2">
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
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold text-gray-600">Linked QR Serial:</td>
                  <td className="px-4 py-2 font-semibold">#11</td>
                </tr>
              </tbody>
            </table>

            <div className="absolute bottom-0 w-full flex justify-between items-center p-6">
              <div className="bg-red-200 p-2 rounded-sm">
                <img src="/delete.png" alt="Delete" className="mx-auto rounded-md w-7 h-7" />
              </div>
              <Button className="bg-[#2c3fcc] hover:bg-green-700 px-8 py-5">Save Details</Button>
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
                <h1 className="font-semibold text-sm text-left px-3 line-clamp-1">{productName || "Product Name"}</h1>
                <p className="text-xs text-left px-3 line-clamp-3 mb-2">
                  {productDescription || "Product description goes here..."}
                </p>
                {imagePreview ? (
                  <img src={imagePreview} alt="Product" className="w-full object-cover h-[170px]" />
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
