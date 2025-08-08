import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { BulkDownloadPayload } from "@/lib/api/types";
import { bulkDownload } from "@/lib/api/methods";
import Loader from "@/components/Loader";
import { errorToast } from "@/lib/utils";
import { toast } from "sonner";

const BulkQRDownloader = () => {
  const [data, setData] = useState<BulkDownloadPayload>({
    from: 0,
    to: 0,
    file_format: ""
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, type, name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? name : Number(value)
    }));
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      const response = await bulkDownload(data);

      const blob = new Blob([response], { type: "application/zip" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "qr_download.zip";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      const message = error?.response?.data?.error ?? "Error occured while downloading";
      toast.error(message, {
        position: "top-right",
        style: errorToast
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-4">
      <Card className="p-0">
        <CardHeader>
          <CardTitle className="text-lg">Download QRs by Serial No.</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Table className="p-0">
            <TableBody>
              {/* Row 1: From Serial No. */}
              <TableRow className="hover:bg-transparent">
                <TableCell className="align-top w-[200px]">
                  <Label htmlFor="from" className="text-sm font-medium text-gray-700">
                    From Serial No.
                  </Label>
                </TableCell>
                <TableCell className="pb-4">
                  <Input id="from" type="text" value={data.from} onChange={handleChange} className="w-20" />
                </TableCell>
              </TableRow>

              {/* Row 2: To Serial No. */}
              <TableRow className="hover:bg-transparent">
                <TableCell className="align-top w-[200px] p-2">
                  <Label htmlFor="to" className="text-sm font-medium text-gray-700">
                    To Serial No.
                  </Label>
                </TableCell>
                <TableCell className="pb-4">
                  <Input id="to" type="text" value={data.to} onChange={handleChange} className="w-20" />
                </TableCell>
              </TableRow>

              {/* Row 3: Select QR Versions */}
              <TableRow className="hover:bg-transparent">
                <TableCell className="align-top w-[200px] pt-5">
                  <Label className="text-sm font-medium text-gray-700">Select QR Versions</Label>
                </TableCell>
                <TableCell className="py-5">
                  <div className="flex gap-6">
                    {/* <Card className="border-0 shadow-none">
                    <CardContent className="p-0 text-center flex flex-col items-center gap-2">
                      <p className="text-sm font-medium text-gray-700">With instruction</p>
                      <img src="/witomark-qr.jpg" className="w-20 h-20" />
                      <div className="flex justify-center space-x-2 text-xs text-gray-500">
                        <label className="flex items-center gap-1">
                          <input type="checkbox" id="svgWith" checked={data.svgWith} onChange={handleChange} />
                          SVG
                        </label>
                        <label className="flex items-center gap-1">
                          <input type="checkbox" id="pngWith" checked={data.pngWith} onChange={handleChange} />
                          PNG
                        </label>
                      </div>
                    </CardContent>
                  </Card> */}
                    <Card className="border-0 shadow-none">
                      <CardContent className="p-0 text-center flex flex-col items-center gap-2">
                        <p className="text-sm font-medium text-gray-700">Without instruction</p>
                        <img src="/witomark-qr.jpg" className="w-20 h-20" />
                        <div className="flex justify-center space-x-2 text-xs text-gray-500">
                          <label className="flex items-center gap-1">
                            <input
                              type="checkbox"
                              id="file_format"
                              name="svg"
                              checked={data.file_format === "svg"}
                              onChange={handleChange}
                            />
                            SVG
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="checkbox"
                              id="file_format"
                              name="png"
                              checked={data.file_format === "png"}
                              onChange={handleChange}
                            />
                            PNG
                          </label>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-transparent">
                <TableCell className="pt-4">
                  <Button
                    onClick={handleDownload}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-5 px-8 rounded">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkQRDownloader;
