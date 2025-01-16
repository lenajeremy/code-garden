import {
  Sidebar as SidebarComponent,
  SidebarContent,
} from "@/components/ui/sidebar";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SavedSnippets } from "./sidebar/SavedSnippets";
import { TemplatesSection } from "./sidebar/TemplatesSection";
import { SidebarFooter } from "./sidebar/SidebarFooter";

export const Sidebar = () => {
  return (
    <SidebarComponent>
      <SidebarContent>
        <SidebarHeader />
        <div className="flex flex-col h-[calc(100vh-82px)] justify-between">
          <div className="flex-1 overflow-y-auto pb-4">
            <SavedSnippets />
            <TemplatesSection />
          </div>
          <SidebarFooter />
        </div>
      </SidebarContent>
    </SidebarComponent>
  );
};