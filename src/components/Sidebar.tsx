import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarInput,
} from "@/components/ui/sidebar";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SavedSnippets } from "./sidebar/SavedSnippets";
import { TemplatesSection } from "./sidebar/TemplatesSection";
import { SidebarFooter } from "./sidebar/SidebarFooter";
import { useContext } from "react";
import EditorContext from "@/lib/editor-context";

export const Sidebar = () => {
  const { snippetName, setSnippetName } = useContext(EditorContext);

  return (
    <SidebarComponent>
      <SidebarContent>
        <SidebarHeader />
        <div className="flex flex-col h-[calc(100vh-82px)] justify-between">
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-2 mb-4">
              <SidebarInput
                placeholder="Enter snippet name..."
                value={snippetName}
                onChange={(e) => setSnippetName(e.target.value)}
              />
            </div>
            <SavedSnippets />
            <TemplatesSection />
          </div>
          <SidebarFooter />
        </div>
      </SidebarContent>
    </SidebarComponent>
  );
};