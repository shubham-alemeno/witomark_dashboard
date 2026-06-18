import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export function TeamSwitcher({ companyLogo }: { companyName?: string; companyLogo?: string | null }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <img
            src={companyLogo || "/witomark-favicon.png"}
            alt="Company logo"
            className="max-h-12 w-auto max-w-[160px] flex-shrink-0 rounded object-contain"
          />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
