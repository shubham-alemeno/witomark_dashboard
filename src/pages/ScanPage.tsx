import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft } from "lucide-react";
import { getMapScans } from "@/lib/api/methods";
import { MapScanData } from "@/lib/api/types";
import WorldMap from "@/components/WorldMap";
import { useDocumentTitle } from "@/hooks/use-document-title";

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

const ScanPage: React.FC = () => {
  const { scanId } = useParams<{ scanId: string }>();
  const navigate = useNavigate();
  const [scanDetails, setScanDetails] = useState<ScanDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set document title
  useDocumentTitle(scanId ? `Scan #${scanId}` : "Scan Details");

  useEffect(() => {
    const fetchScanDetails = async () => {
      if (!scanId) {
        setError("No scan ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch all scans and find the specific one
        // In a real app, you'd have an API endpoint for a single scan
        const response = await getMapScans();
        const scan = response.data.find((s: MapScanData) => s.scan_id === scanId);

        if (!scan) {
          setError("Scan not found");
          setLoading(false);
          return;
        }

        // Convert scan data to the format expected by the component
        const details: ScanDetails = {
          id: scan.scan_id,
          result: scan.result.value === 1 ? "genuine" : "tampered",
          scanId: scan.scan_id,
          scanDate: new Date(scan.scan_time).toLocaleString(),
          location: scan.location,
          coordinates: `${scan.latitude}, ${scan.longitude}`,
          latitude: scan.latitude,
          longitude: scan.longitude,
          qrSerialNo: scan.qr_serial_number,
          product: scan.product_name === "Unknown product" ? "-" : scan.product_name,
          deviceDetails: "Device details not available"
        };

        setScanDetails(details);
      } catch (err) {
        setError("Failed to fetch scan details");
        console.error("Error fetching scan details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScanDetails();
  }, [scanId]);

  // Helper function to open Google Maps
  const openGoogleMaps = () => {
    if (scanDetails?.coordinates) {
      const url = `https://www.google.com/maps?q=${scanDetails.coordinates}`;
      window.open(url, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Loading scan details...</h1>
        </div>
      </div>
    );
  }

  if (error || !scanDetails) {
    return (
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Error</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-red-600">{error || "Scan details not found"}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isGenuine = scanDetails.result === "genuine";

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      {/* <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900">Scan #{scanDetails.scanId}</h1>
      </div> */}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-200px)]">
        {/* Scan Details */}
        <div className="bg-white p-6 rounded-lg">
          <div className="space-y-3">
            {/* Scan Result */}
            <div className="grid grid-cols-3">
              <span className="text-sm col-span-1 font-medium text-gray-600">Scan Result:</span>
              <div className="flex items-center space-x-2">
                <img
                  src={isGenuine ? "/result-genuine.png" : "/result-counterfeit.png"}
                  alt={isGenuine ? "Genuine" : "Counterfeit"}
                  className="w-5 h-5"
                />
                <span className="font-semibold text-black">{isGenuine ? "Genuine" : "Tampered"}</span>
              </div>
            </div>
            <hr />
            {/* Scan ID */}
            <div className="grid grid-cols-3">
              <span className="text-sm col-span-1 font-medium text-gray-600">Scan ID:</span>
              <span className="text-sm col-span-2 text-gray-900 font-medium">{scanDetails.scanId}</span>
            </div>
            <hr />
            {/* Scan Date */}
            <div className="grid grid-cols-3">
              <span className="text-sm col-span-1 font-medium text-gray-600">Scan Date:</span>
              <span className="text-sm col-span-2 text-gray-900">{scanDetails.scanDate}</span>
            </div>
            <hr />
            {/* Location */}
            <div className="grid grid-cols-3">
              <span className="text-sm col-span-1 font-medium text-gray-600">Location:</span>
              <button
                onClick={openGoogleMaps}
                className="text-sm col-span-2 text-[#02bc5f] hover:text-[#029951] hover:underline cursor-pointer font-medium text-left">
                {scanDetails.location}
              </button>
            </div>
            <hr />
            {/* QR Serial No */}
            <div className="grid grid-cols-3">
              <span className="text-sm col-span-1 font-medium text-gray-600">QR Serial No:</span>
              <span className="text-sm col-span-2 text-black font-medium">#{scanDetails.qrSerialNo}</span>
            </div>
            <hr />
            {/* Product */}
            <div className="grid grid-cols-3">
              <span className="text-sm col-span-1 font-medium text-gray-600">Product:</span>
              <span className="text-sm col-span-2 text-black font-medium max-w-[200px] truncate text-left">
                {scanDetails.product === "Unknown Product" ? "-" : scanDetails.product}
              </span>
            </div>
            <hr />
            {/* Device Details */}
            {/* <div className="grid grid-cols-3">
              <span className="text-sm col-span-1 font-medium text-gray-600">Device details:</span>
              <span className="text-sm col-span-2 text-gray-900 max-w-[200px] truncate text-left">
                {scanDetails.deviceDetails}
              </span>
            </div> */}
          </div>
        </div>

        {/* Map Section - Full Height */}
        <div className="h-full rounded-lg overflow-hidden">
          {scanDetails.latitude && scanDetails.longitude ? (
            <WorldMap
              locationData={[
                {
                  id: 1,
                  lat: scanDetails.latitude,
                  lng: scanDetails.longitude,
                  status: scanDetails.result,
                  location: scanDetails.location,
                  date: new Date(scanDetails.scanDate).toLocaleDateString()
                }
              ]}
            />
          ) : (
            <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p>Location coordinates not available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
