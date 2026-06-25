import { LayoutDashboard, Package, Printer, QrCode } from "lucide-react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { NavMain } from "@/components/NavMain";
import { NavUser } from "@/components/NavUser";
import { TeamSwitcher } from "./team-switcher";
import { useEffect, useState } from "react";
import { getProfile } from "@/lib/api/methods";
import { UserProfile } from "@/lib/api/types";

const navMain = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, items: [] },
<<<<<<< HEAD
  { title: "My QR Fingerprints", url: "/my-witomarks", icon: QrCode, items: [] },
=======
  { title: "My QR Fingerprints", url: "/my-qr-fingerprints", icon: QrCode, items: [] },
>>>>>>> fasiculus
  { title: "My Products", url: "/my-products", icon: Package, items: [] },
  { title: "My Printers", url: "/my-printers", icon: Printer, items: [] }
];

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher companyName={profile?.company_name} companyLogo={profile?.company_logo} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={profile} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
