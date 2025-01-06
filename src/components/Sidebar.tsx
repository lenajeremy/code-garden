import { Code2, HelpCircle, Settings, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { languages } from "@/lib/constant";
import { useContext } from "react";
import MainContext from "@/lib/main-context";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sidebar as SidebarComponent, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

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
    const { currLanguage, setLanguage } = useContext(MainContext);

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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Settings</DialogTitle>
                            </DialogHeader>
                            <Tabs defaultValue="editor" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="editor">Editor</TabsTrigger>
                                    <TabsTrigger value="general">General</TabsTrigger>
                                    <TabsTrigger value="language">Language</TabsTrigger>
                                </TabsList>
                                <TabsContent value="editor" className="space-y-4">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="fontSize">Font Size</Label>
                                            <Input
                                                id="fontSize"
                                                type="number"
                                                className="w-20"
                                                defaultValue={14}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="theme">Theme</Label>
                                            <Select defaultValue="vs-dark">
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select theme" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="vs-dark">Dark</SelectItem>
                                                    <SelectItem value="light">Light</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="general" className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="darkMode">Dark Mode</Label>
                                        <Switch id="darkMode" />
                                    </div>
                                </TabsContent>
                                <TabsContent value="language" className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="defaultLang">Default Language</Label>
                                        <Select 
                                            defaultValue={currLanguage.toLowerCase()}
                                            onValueChange={(v) => {
                                                const lang = languages.find(l => l.toLowerCase() === v.toLowerCase());
                                                if (lang) setLanguage(lang);
                                            }}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {languages.map((lang) => (
                                                    <SelectItem key={lang} value={lang.toLowerCase()}>
                                                        {lang}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </TabsContent>
                            </Tabs>
                            <DialogFooter>
                                <Button type="submit">Apply Changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start">
                                <Code2 className="w-4 h-4 mr-2" />
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

                    <Button variant="ghost" className="w-full justify-start">
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Help
                    </Button>

                    <div className="pt-4 border-t border-border">
                        <div className="flex justify-center space-x-4">
                            <Button variant="ghost" size="icon">
                                <Github className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Twitter className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Linkedin className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </SidebarContent>
        </SidebarComponent>
    );
};