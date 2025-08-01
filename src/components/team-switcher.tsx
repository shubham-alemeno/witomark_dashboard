import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";

export function TeamSwitcher({
  teams
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const { state } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/* <DropdownMenuTrigger asChild> */}
          <SidebarMenuButton
            size="lg"
            className={`data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ${
              state === "expanded" ? "" : "mt-2"
            }`}>
            <div className="flex items-center relative overflow-hidden">
              <img
                src="/witomark-logo.png"
                alt="Witomark Logo"
                className={`h-8 transition-all duration-300 ease-in-out ${
                  state === "expanded"
                    ? "opacity-100 scale-100 translate-x-0"
                    : "opacity-0 scale-95 -translate-x-2"
                }`}
              />
              <img
                src="/witomark-favicon.png"
                alt="Witomark Icon"
                className={`h-7 w-7 ml-0.5 absolute transition-all duration-300 ease-in-out ${
                  state === "expanded"
                    ? "opacity-0 scale-95 translate-x-2"
                    : "opacity-100 scale-100 translate-x-0"
                }`}
              />
            </div>
            {/* {state === "expanded" && (
              <div className="grid flex-1 text-left text-xl leading-tight">
                <span className="truncate font-bold">{activeTeam.name}</span>
              </div>
            )} */}
            {/* <ChevronsUpDown className="ml-auto" /> */}
          </SidebarMenuButton>
          {/* </DropdownMenuTrigger> */}
          {/* <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <team.logo className="size-4 shrink-0" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent> */}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
