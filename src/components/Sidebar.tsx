import { Sidebar as SidebarComponent, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { FolderPlus, Save, FolderOpen, History } from "lucide-react";

const menuItems = [
  { icon: FolderPlus, label: "New Project", action: () => console.log("New project") },
  { icon: Save, label: "Save Project", action: () => console.log("Save project") },
  { icon: FolderOpen, label: "Load Project", action: () => console.log("Load project") },
  { icon: History, label: "Project History", action: () => console.log("Project history") },
];

export const Sidebar = () => {
  return (
    <SidebarComponent>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Project</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton onClick={item.action}>
                    <item.icon className="w-4 h-4 mr-2" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};