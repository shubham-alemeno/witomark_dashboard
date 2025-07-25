import { AlertCircle, BookOpen, Bot, DollarSign, Printer, Settings2, SquareTerminal } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import { NavMain } from "@/components/NavMain";
import { NavUser } from "@/components/NavUser";
import { TeamSwitcher } from "./team-switcher";
import { useEffect, useState } from "react";

// This is sample data
const data = {
  user: {
    name: "Deepak Gaikwad",
    email: "Alemeno",
    avatar: ""
  },
  teams: [
    {
      name: "Witomark",
      logo: GalleryVerticalEnd,
      plan: "Enterprise"
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup"
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free"
    }
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: []
    },
    {
      title: "QR Generator",
      url: "/qr-generator",
      icon: Bot,
      items: []
    },
    {
      title: "Product Catalogue",
      url: "/product-catalogue",
      icon: BookOpen,
      items: []
    },
    {
      title: "Printers",
      url: "/printers",
      icon: Printer,
      items: []
    },
    {
      title: "Plan Details",
      url: "/plan-details",
      icon: DollarSign,
      items: []
    },
    {
      title: "Alerts",
      url: "/alerts",
      icon: AlertCircle,
      items: []
    }
  ]
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = localStorage.getItem("user");
    setUser(JSON.parse(userData));
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
