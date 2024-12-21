import { Sidebar as SidebarComponent, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { FolderPlus, Save, FolderOpen, History, Code2 } from "lucide-react";

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
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-10 text-editor-success" />
            <span className="text-lg font-semibold">Code Garden</span>
          </div>
        </div>
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