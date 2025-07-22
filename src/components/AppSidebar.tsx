import {
  AlertCircle,
  BookOpen,
  Bot,
  DollarSign,
  Printer,
  Settings2,
  SquareTerminal,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react';
import { NavMain } from '@/components/NavMain';
import { NavUser } from '@/components/NavUser';
import { TeamSwitcher } from './team-switcher';

// This is sample data
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Witomark',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '#heatmap',
      icon: SquareTerminal,
      isActive: true,
      items: [],
    },
    {
      title: 'QR Generator',
      url: '#qr-generator',
      icon: Bot,
      items: [],
    },
    {
      title: 'Product Catalogue',
      url: '#product-catalogue',
      icon: BookOpen,
      items: [],
    },
    {
      title: 'Printers',
      url: '#printers',
      icon: Printer,
      items: [],
    },
    {
      title: 'Plan Details',
      url: '#plan-details',
      icon: DollarSign,
      items: [],
    },
    {
      title: 'Alerts',
      url: '#alters',
      icon: AlertCircle,
      items: [],
    },
  ],
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
