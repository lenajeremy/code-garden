import {
  Sidebar as SidebarComponent,
  SidebarContent,
} from "@/components/ui/sidebar";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SavedSnippets } from "./sidebar/SavedSnippets";
import { TemplatesSection } from "./sidebar/TemplatesSection";
import { SidebarFooter } from "./sidebar/SidebarFooter";
import { useContext } from "react";
import EditorContext from "@/lib/editor-context";
import { Button } from "./ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { Input } from "./ui/input";

export const Sidebar = () => {
  const { snippetName, setSnippetName, save } = useContext(EditorContext);

  const handleCreateSnippet = async () => {
    if (!snippetName.trim()) return;
    await save();
    setSnippetName("");
  };

  return (
    <SidebarComponent>
      <SidebarContent>
        <SidebarHeader />
        <div className="flex flex-col h-[calc(100vh-82px)] justify-between">
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-2 mb-4">
              <ContextMenu>
                <ContextMenuTrigger>
                  <Button className="w-full" variant="outline">
                    New
                  </Button>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64 p-2">
                  <div className="flex flex-col gap-2">
                    <Input
                      placeholder="Enter snippet name..."
                      value={snippetName}
                      onChange={(e) => setSnippetName(e.target.value)}
                    />
                    <Button onClick={handleCreateSnippet}>Create Snippet</Button>
                  </div>
                </ContextMenuContent>
              </ContextMenu>
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