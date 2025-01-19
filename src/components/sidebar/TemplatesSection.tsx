import { LayoutTemplate } from "lucide-react";
import { codeTemplates } from "@/lib/constant";
import { useContext } from "react";
import EditorContext from "@/lib/editor-context";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export const TemplatesSection = () => {
  const { language, setCode } = useContext(EditorContext);
  type TemplateKeys = keyof typeof codeTemplates
  const templates = codeTemplates[language.toLowerCase() as TemplateKeys] || [];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Templates</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {templates.map((template) => (
            <SidebarMenuItem key={template.name}>
              <SidebarMenuButton
                className="w-full"
                onClick={() => setCode(template.code)}
              >
                <LayoutTemplate className="w-5 h-5 mr-3 shrink-0" />
                <div className="flex flex-col items-start min-w-0">
                  <span className="truncate w-full">{template.name}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};