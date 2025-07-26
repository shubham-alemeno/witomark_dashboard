import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface Payload {
  from: number;
  to: number;
  svgWith: boolean;
  pngWith: boolean;
  svgWithout: boolean;
  pngWithout: boolean;
}

const BulkQRDownloader = () => {
  const [data, setData] = useState<Payload>({
    from: 0,
    to: 0,
    svgWith: false,
    pngWith: false,
    svgWithout: false,
    pngWithout: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, type, checked, value } = e.target;
    setData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : Number(value)
    }));
  };

  const handleDownload = () => {
    console.log(data);
  };

  return (
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
                  <Card className="border-0 shadow-none">
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
                  </Card>
                  <Card className="border-0 shadow-none">
                    <CardContent className="p-0 text-center flex flex-col items-center gap-2">
                      <p className="text-sm font-medium text-gray-700">Without instruction</p>
                      <img src="/witomark-qr.jpg" className="w-20 h-20" />
                      <div className="flex justify-center space-x-2 text-xs text-gray-500">
                        <label className="flex items-center gap-1">
                          <input type="checkbox" id="svgWithout" checked={data.svgWithout} onChange={handleChange} />
                          SVG
                        </label>
                        <label className="flex items-center gap-1">
                          <input type="checkbox" id="pngWithout" checked={data.pngWithout} onChange={handleChange} />
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
  );
};

export default BulkQRDownloader;
