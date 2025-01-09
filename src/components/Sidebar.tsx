import { Code2, Settings, Github, Twitter, Linkedin, Home, Grid, Database, Lock, Folder, Zap, Server, Lightbulb, TrendingUp, List, FileText, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { languages } from "@/lib/constant";
import { useContext } from "react";
import MainContext from "@/lib/main-context";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

// Mock saved snippets data - replace with actual data later
const savedSnippets = [
    { id: 1, name: "Home", icon: Home },
    { id: 2, name: "Table Editor", icon: Grid },
    { id: 3, name: "Database", icon: Database },
    { id: 4, name: "Authentication", icon: Lock },
    { id: 5, name: "Storage", icon: Folder },
    { id: 6, name: "Edge Functions", icon: Server },
    { id: 7, name: "Realtime", icon: Zap },
    { id: 8, name: "Advisors", icon: Lightbulb },
    { id: 9, name: "Reports", icon: TrendingUp },
    { id: 10, name: "Logs", icon: List },
    { id: 11, name: "API Docs", icon: FileText },
];

// Mock user data - replace with actual auth logic later
const user = {
    name: "lenajeremy",
    image: "/avatar.png",
    isLoggedIn: true
};

export const Sidebar = () => {
    const { language, setLanguage, setCode } = useContext(MainContext);

    return (
        <SidebarComponent>
            <SidebarContent>
                <div className="p-4 border-b border-border md:h-16">
                    <div className="flex items-center gap-3">
                        <Code2 className="w-6 h-6 text-editor-success" />
                        <span className="text-lg font-semibold">Code Garden</span>
                    </div>
                </div>

                <div className="flex flex-col h-[calc(100vh-4rem)] justify-between">
                    {/* Top Section - Saved Snippets */}
                    <div className="flex-1 overflow-y-auto py-4">
                        <SidebarGroup>
                            <SidebarGroupLabel>Saved Snippets</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {savedSnippets.map((snippet) => (
                                        <SidebarMenuItem key={snippet.id}>
                                            <SidebarMenuButton className="w-full">
                                                <snippet.icon className="w-4 h-4 mr-3" />
                                                {snippet.name}
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </div>

                    {/* Bottom Section - Settings and User */}
                    <div className="border-t border-border">
                        <div className="py-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="ghost" className="w-full justify-start px-4 hover:bg-background/10">
                                        <Settings className="w-4 h-4 mr-3" />
                                        Project Settings
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-semibold">Settings</DialogTitle>
                                    </DialogHeader>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-4">Editor Settings</h3>
                                    <Separator className="mb-4" />
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
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-4">General Settings</h3>
                                    <Separator className="mb-4" />
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="darkMode">Dark Mode</Label>
                                        <Switch id="darkMode" />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-4">Language Settings</h3>
                                    <Separator className="mb-4" />
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="defaultLang">Default Language</Label>
                                        <Select 
                                            defaultValue={language.toLowerCase()}
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
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Apply Changes</Button>
                            </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <Button variant="ghost" className="w-full justify-start px-4 hover:bg-background/10">
                                <Terminal className="w-4 h-4 mr-3" />
                                Commands
                            </Button>

                            {user.isLoggedIn ? (
                                <div className="px-4 py-3 mt-2">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={user.image} />
                                            <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">{user.name}</span>
                                    </div>
                                </div>
                            ) : (
                                <Button variant="ghost" className="w-full justify-start px-4 hover:bg-background/10 mt-2">
                                    Sign in
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </SidebarContent>
        </SidebarComponent>
    );
};
