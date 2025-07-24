import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./components/Layout";

// Import page components
import Dashboard from "./pages/Dashboard";
import QRGenerator from "./pages/QRGenerator";
import ProductCatalogue from "./pages/ProductCatalogue";
import Printers from "./pages/Printers";
import PlanDetails from "./pages/PlanDetails";
import Alerts from "./pages/Alerts";
import QRCodeDetails from "./pages/QRCodeDetails";
import ProductDetails from "./pages/ProductDetails";

const App = () => (
  <TooltipProvider>
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
          {/* Nested routes within the layout */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="qr-generator" element={<QRGenerator />} />
          <Route path="qr-generator/:qrId" element={<QRCodeDetails />} />
          <Route path="product-catalogue" element={<ProductCatalogue />} />
          <Route path="product-catalogue/:productId" element={<ProductDetails />} />
          <Route path="printers" element={<Printers />} />
          <Route path="plan-details" element={<PlanDetails />} />
          <Route path="alerts" element={<Alerts />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
