import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MapPin, Calendar, Smartphone, Package } from "lucide-react";

interface ScanDetails {
  id: string;
  result: "genuine" | "tampered";
  scanId: string;
  scanDate: string;
  location: string;
  coordinates?: string;
  latitude?: number;
  longitude?: number;
  qrSerialNo: string;
  product: string;
  deviceDetails: string;
}

interface ScanDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  scanDetails: ScanDetails | null;
}

const ScanDetailsPanel: React.FC<ScanDetailsPanelProps> = ({ isOpen, onClose, scanDetails }) => {
  if (!scanDetails) return null;
  console.log(scanDetails);
  const isGenuine = scanDetails.result === "genuine";

  // Helper function to open Google Maps
  const openGoogleMaps = () => {
    if (scanDetails.coordinates) {
      const url = `https://www.google.com/maps?q=${scanDetails.coordinates}`;
      window.open(url, "_blank");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">Scan {scanDetails.id}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Scan Result */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600">Scan Result:</span>
              <div className="flex items-center space-x-2">
                <img
                  src={isGenuine ? "/result-genuine.png" : "/result-counterfeit.png"}
                  alt={isGenuine ? "Genuine" : "Counterfeit"}
                  className="w-5 h-5"
                />
                <span className="font-semibold text-black">{isGenuine ? "Genuine" : "Tampered"}</span>
              </div>
            </div>
          </div>

          {/* Scan Details */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Smartphone className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600">Scan ID:</p>
                <p className="text-sm text-gray-900">{scanDetails.scanId}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600">Scan Date:</p>
                <p className="text-sm text-gray-900">{scanDetails.scanDate}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600">Location:</p>
                <button
                  onClick={openGoogleMaps}
                  className="text-sm text-[#02bc5f] hover:text-[#029951] hover:underline cursor-pointer font-medium text-left">
                  {scanDetails.location}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Package className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600">QR Serial No:</p>
                <p className="text-sm text-black font-medium">#{scanDetails.qrSerialNo}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Package className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600">Product:</p>
                <p className="text-sm text-black font-medium">{scanDetails.product}</p>
              </div>
            </div>

            {/* <div className="flex items-start space-x-3">
              <Smartphone className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Device details:
                </p>
                <p className="text-sm text-gray-900">
                  {scanDetails.deviceDetails}
                </p>
              </div>
            </div> */}
          </div>

          {/* Map Section */}
          {/* <div className="mt-6">
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Map view would be displayed here</p>
                <p className="text-xs text-gray-400">
                  Showing location: {scanDetails.location}
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ScanDetailsPanel;
