// router.tsx or routes.tsx

import Alerts from "@/pages/Alerts";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import PlanDetails from "@/pages/PlanDetails";
import Printers from "@/pages/Printers";
import ProductCatalogue from "@/pages/ProductCatalogue";
import ProductDetails from "@/pages/ProductDetails";
import QRCodeDetails from "@/pages/QRCodeDetails";
import QRGenerator from "@/pages/QRGenerator";
import ScanPage from "@/pages/ScanPage";
import ProtectedRoute from "@/ProtectedRoute";
import Layout from "@/components/Layout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import BulkQRDownloader from "@/pages/BulkQRDownloader";
import BulkQREditor from "@/pages/BulkQREditor";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "dashboard/scan/:scanId", element: <ScanPage /> },
      { path: "qr-generator", element: <QRGenerator /> },
      { path: "qr-generator/:fId", element: <QRCodeDetails /> },
      { path: "product-catalogue", element: <ProductCatalogue /> },
      { path: "product-catalogue/:productId/:pname", element: <ProductDetails /> },
      { path: "printers", element: <Printers /> },
      { path: "plan-details", element: <PlanDetails /> },
      { path: "alerts", element: <BulkQRDownloader /> }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;
