import { Terminal, Plus } from "lucide-react";
import { Language } from "@/lib/constant";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

// Mock saved snippets data with programming examples
const savedSnippets = [
  { id: 1, name: "Fibonacci Sequence", language: "Python", icon: Terminal },
  { id: 2, name: "Two Sum Solution", language: "JavaScript", icon: Terminal },
  { id: 3, name: "Binary Search Tree", language: "Rust", icon: Terminal },
  { id: 4, name: "Quick Sort Implementation", language: "C++", icon: Terminal },
  { id: 5, name: "Dynamic Programming - Knapsack", language: "C#", icon: Terminal },
  { id: 6, name: "Graph DFS Traversal", language: "Dart", icon: Terminal },
  { id: 7, name: "Merge Sort Algorithm", language: "Java", icon: Terminal },
  { id: 8, name: "Dijkstra's Algorithm", language: "Python", icon: Terminal },
  { id: 9, name: "Hash Table Implementation", language: "C++", icon: Terminal },
  { id: 10, name: "Linked List Reversal", language: "JavaScript", icon: Terminal },
  { id: 11, name: "Trie Implementation", language: "Swift", icon: Terminal },
  { id: 12, name: "0/1 Knapsack", language: "Ruby", icon: Terminal },
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

export const SavedSnippets = () => {
  const [snippets, setSnippets] = useState(savedSnippets);
  const [newSnippetName, setNewSnippetName] = useState("");

  const handleCreateSnippet = () => {
    if (!newSnippetName.trim()) {
      toast.error("Please enter a name for your snippet");
      return;
    }

    const newSnippet = {
      id: snippets.length + 1,
      name: newSnippetName,
      language: "JavaScript" as Language,
      icon: Terminal,
    };

    setSnippets([...snippets, newSnippet]);
    setNewSnippetName("");
    toast.success("Snippet created successfully!");
  };

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between px-2">
        <SidebarGroupLabel>Saved Snippets</SidebarGroupLabel>
        <ContextMenu>
          <ContextMenuTrigger>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Plus className="h-4 w-4" />
            </Button>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64 p-2">
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Enter snippet name"
                value={newSnippetName}
                onChange={(e) => setNewSnippetName(e.target.value)}
              />
              <Button onClick={handleCreateSnippet}>Create Snippet</Button>
            </div>
          </ContextMenuContent>
        </ContextMenu>
      </div>
      <SidebarGroupContent>
        <SidebarMenu>
          {snippets.map((snippet) => (
            <SidebarMenuItem key={snippet.id}>
              <SidebarMenuButton className="w-full">
                <img
                  src={languageImage(snippet.language as Language)}
                  className="w-5 h-5 mr-3 shrink-0"
                  alt={snippet.language}
                />
                <div className="flex flex-col items-start min-w-0">
                  <span className="truncate w-full">{snippet.name}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};