import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";

export function TeamSwitcher({ companyName, companyLogo }: { companyName?: string; companyLogo?: string | null }) {
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className={state === "expanded" ? "" : "mt-2"}>
          <img
            src={companyLogo || "/witomark-favicon.png"}
            alt="Company logo"
            className="h-7 w-7 flex-shrink-0 rounded object-contain"
          />
          {state === "expanded" && (
            <div className="grid flex-1 text-left leading-tight">
              <span className="truncate text-lg font-bold">{companyName ?? ""}</span>
            </div>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
