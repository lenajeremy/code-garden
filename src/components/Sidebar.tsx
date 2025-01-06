import { Sidebar as SidebarComponent, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Code2, FileCode, Settings, HelpCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

const codeTemplates = {
    javascript: [
        { name: "Hello World", code: 'console.log("Hello, World!");' },
        { name: "Array Operations", code: 'const numbers = [1, 2, 3];\nnumbers.forEach(n => console.log(n));' },
    ],
    python: [
        { name: "Hello World", code: 'print("Hello, World!")' },
        { name: "List Operations", code: 'numbers = [1, 2, 3]\nfor n in numbers:\n    print(n)' },
    ],
};

export const Sidebar = () => {
    return (
        <SidebarComponent>
            <SidebarContent>
                <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-2">
                        <Code2 className="w-6 h-6 text-editor-success" />
                        <span className="text-lg font-semibold">Code Garden</span>
                    </div>
                </div>
                <div className="p-4 space-y-4">
                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start">
                                <FileCode className="w-4 h-4 mr-2" />
                                Code Templates
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-2 mt-2">
                            {Object.entries(codeTemplates).map(([language, templates]) => (
                                <div key={language} className="pl-6">
                                    <h4 className="text-sm font-medium mb-2 capitalize">{language}</h4>
                                    {templates.map((template, index) => (
                                        <Button
                                            key={index}
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-start text-sm"
                                            onClick={() => console.log(`Load template: ${template.name}`)}
                                        >
                                            {template.name}
                                        </Button>
                                    ))}
                                </div>
                            ))}
                        </CollapsibleContent>
                    </Collapsible>

                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start">
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-2 mt-2 pl-6">
                            <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                                Editor Theme
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                                Font Settings
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                                Keybindings
                            </Button>
                        </CollapsibleContent>
                    </Collapsible>

                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start">
                                <HelpCircle className="w-4 h-4 mr-2" />
                                Help
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-2 mt-2 pl-6">
                            <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                                Documentation
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                                Keyboard Shortcuts
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                                Language Guide
                            </Button>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </SidebarContent>
        </SidebarComponent>
    );
};