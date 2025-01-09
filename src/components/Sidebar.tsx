import { Code2, Settings, Home, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Language, languages, codeTemplates } from "@/lib/constant";
import { useContext } from "react";
import MainContext from "@/lib/main-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Mock saved snippets data with programming examples
const savedSnippets = [
  { id: 1, name: "Fibonacci Sequence", language: "Python", icon: Terminal },
  { id: 2, name: "Two Sum Solution", language: "JavaScript", icon: Terminal },
  { id: 3, name: "Binary Search Tree", language: "Java", icon: Terminal },
  { id: 4, name: "Quick Sort Implementation", language: "C++", icon: Terminal },
  {
    id: 5,
    name: "Dynamic Programming - Knapsack",
    language: "C#",
    icon: Terminal,
  },
  {
    id: 6,
    name: "Graph DFS Traversal",
    language: "Dart",
    icon: Terminal,
  },
  { id: 7, name: "Merge Sort Algorithm", language: "Java", icon: Terminal },
  { id: 8, name: "Dijkstra's Algorithm", language: "Python", icon: Terminal },
  { id: 9, name: "Hash Table Implementation", language: "C++", icon: Terminal },
  {
    id: 10,
    name: "Linked List Reversal",
    language: "JavaScript",
    icon: Terminal,
  },
  {
    id: 11,
    name: "Trie Implementation",
    language: "Swift",
    icon: Terminal,
  },
];

function languageImage(language: Language): string {
  if (language == "JavaScript") {
    language = "js" as Language;
  } else if (language == "C++") {
    language = "cpp" as Language;
  } else if (language == "C#") {
    language = "csharp" as Language;
  } else if (language == "Dart") {
    language = "dartlang" as Language;
  }
  return `https://raw.githubusercontent.com/lenajeremy/vscode-icons/53506ffc3fafa5f26a55fa5920a81d0e31b9fb1f/icons/file_type_${language.toLowerCase()}.svg`;
}

// Mock user data - replace with actual auth logic later
const user = {
  name: "lenajeremy",
  image: "/avatar.png",
  isLoggedIn: false,
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

        <div className="flex flex-col h-[calc(100vh-82px)] justify-between">
          {/* Top Section - Saved Snippets */}
          <div className="flex-1 overflow-y-auto py-4">
            <SidebarGroup>
              <SidebarGroupLabel>Saved Snippets</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {savedSnippets.map((snippet) => (
                    <SidebarMenuItem key={snippet.id}>
                      <SidebarMenuButton className="w-full">
                        <img
                          src={languageImage(snippet.language as Language)}
                          className="w-4 h-4 mr-3 shrink-0"
                        />
                        <div className="flex flex-col items-start min-w-0">
                          <span className="truncate w-full">
                            {snippet.name}
                          </span>
                        </div>
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
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 hover:bg-background/10"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Project Settings
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                      Settings
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">
                        Editor Settings
                      </h3>
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
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">
                        General Settings
                      </h3>
                      <Separator className="mb-4" />
                      <div className="flex items-center justify-between">
                        <Label htmlFor="darkMode">Dark Mode</Label>
                        <Switch id="darkMode" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">
                        Language Settings
                      </h3>
                      <Separator className="mb-4" />
                      <div className="flex items-center justify-between">
                        <Label htmlFor="defaultLang">Default Language</Label>
                        <Select
                          defaultValue={language.toLowerCase()}
                          onValueChange={(v) => {
                            const lang = languages.find(
                              (l) => l.toLowerCase() === v.toLowerCase()
                            );
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

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 hover:bg-background/10"
                  >
                    <Terminal className="w-4 h-4 mr-3" />
                    Templates
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[70vh] overflow-y-scroll">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                      Code Templates
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <Select
                      defaultValue={language.toLowerCase()}
                      onValueChange={(v) => {
                        const lang = languages.find(
                          (l) => l.toLowerCase() === v.toLowerCase()
                        );
                        if (lang) setLanguage(lang);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(codeTemplates).map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang.charAt(0).toUpperCase() + lang.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="space-y-4">
                      {codeTemplates[
                        language.toLowerCase() as keyof typeof codeTemplates
                      ]?.map((template, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium">{template.name}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setCode(template.code)}
                            >
                              Use Template
                            </Button>
                          </div>
                          <pre className="bg-editor-bg p-2 rounded text-sm overflow-x-auto">
                            <code>{template.code}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {user.isLoggedIn ? (
                <div className="px-4 py-3 mt-2">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.image} />
                      <AvatarFallback>
                        {user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 hover:bg-background/10 mt-2"
                >
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
