'use client';

import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white dark:bg-gray-800 px-6 shadow-sm">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 h-4" />
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              Dashboard
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
