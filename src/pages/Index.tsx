import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';

// Import page components
import Dashboard from './Dashboard';
import QRGenerator from './QRGenerator';
import ProductCatalogue from './ProductCatalogue';
import Printers from './Printers';
import PlanDetails from './PlanDetails';
import Alerts from './Alerts';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'heatmap' || hash === 'list-view') {
        setActiveTab('dashboard');
      } else if (hash === 'qr-generator') {
        setActiveTab('qr-generator');
      } else if (hash === 'product-catalogue') {
        setActiveTab('product-catalogue');
      } else if (hash === 'printers') {
        setActiveTab('printers');
      } else if (hash === 'plan-details') {
        setActiveTab('plan-details');
      } else if (hash === 'alerts') {
        setActiveTab('alerts');
      } else {
        setActiveTab('dashboard');
      }
    };

    // Set initial state
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-gray-100">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 h-4" />
            <div className="text-xl font-semibold">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'qr-generator' && 'QR Generator'}
              {activeTab === 'product-catalogue' && 'Product Catalogue'}
              {activeTab === 'printers' && 'Printers'}
              {activeTab === 'plan-details' && 'Plan Details'}
              {activeTab === 'alerts' && 'Alerts'}
            </div>
          </header>
          <div className="flex-1 p-4 md:p-6 overflow-auto">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && <Dashboard />}

            {/* QR Generator Tab */}
            {activeTab === 'qr-generator' && <QRGenerator />}

            {/* Product Catalogue Tab */}
            {activeTab === 'product-catalogue' && <ProductCatalogue />}

            {/* Printers Tab */}
            {activeTab === 'printers' && <Printers />}

            {/* Plan Details Tab */}
            {activeTab === 'plan-details' && <PlanDetails />}

            {/* Alerts Tab */}
            {activeTab === 'alerts' && <Alerts />}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Index;
