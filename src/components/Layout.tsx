import { Outlet, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useDocumentTitle } from "@/hooks/use-document-title";

// Page title mapping
const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/qr-generator": "QR Generator",
  "/qr-downloader": "QR Downloader",
  "/qr-editor": "QR Editor",
  "/product-catalogue": "Product Catalogue",
  "/printers": "Printers",
  "/plan-details": "Plan Details",
  "/alerts": "Alerts"
};

const Layout = () => {
  const location = useLocation();

  // Handle dynamic page titles for scan pages
  const getPageTitle = () => {
    if (location.pathname.startsWith("/dashboard/scan/")) {
      const scanId = location.pathname.split("/").pop();
      return `Scan #${scanId}`;
    }
    if (location.pathname.startsWith("/product-catalogue/")) {
      const params = location.pathname.split("/");
      const productName = decodeURIComponent(params[3]);
      return `Product: ${productName} #${params[2]}`;
    }
    if (location.pathname.startsWith("/qr-generator/")) {
      const params = location.pathname.split("/");
      return `QR #${params[2]}`;
    }
    return pageTitles[location.pathname] || "Dashboard";
  };

  const pageTitle = getPageTitle();

  // Set document title
  useDocumentTitle(pageTitle);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-gray-100">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 h-4" />
            <div className="text-xl font-semibold">{pageTitle}</div>
          </header>
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
