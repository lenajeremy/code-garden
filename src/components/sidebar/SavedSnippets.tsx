import { Terminal, Plus, ChevronDown, MoreVertical } from "lucide-react";
import { DefaultLanguage, Language } from "@/lib/constant";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { CreateSnippetModal } from "./CreateSnippetModal";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Mock saved snippets data with programming examples
const savedSnippetsData = [
  { id: 1, name: "Fibonacci Sequence", language: "Python" },
  { id: 2, name: "Two Sum Solution", language: "JavaScript" },
  { id: 3, name: "Binary Search Tree", language: "Rust" },
  { id: 4, name: "Quick Sort", language: "C++" },
  { id: 5, name: "Graph Traversal", language: "Java" },
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

// Mock API function
const fetchSnippets = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(savedSnippetsData);
    }, 3000);
  });
};

export const SavedSnippets = () => {
  const [snippets, setSnippets] = useState<typeof savedSnippetsData>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [renamingSnippetId, setRenamingSnippetId] = useState<number | null>(null);
  const [newSnippetName, setNewSnippetName] = useState("");

  useEffect(() => {
    const loadSnippets = async () => {
      try {
        const data = await fetchSnippets();
        setSnippets(data as typeof savedSnippetsData);
      } catch (error) {
        toast.error("Failed to load snippets");
      } finally {
        setIsLoading(false);
      }
    };

    loadSnippets();
  }, []);

  const handleCreateSnippet = (name: string, language: Language) => {
    const newSnippet = {
      id: snippets.length + 1,
      name: name || "Untitled Snippet",
      language,
    };

    setSnippets([newSnippet, ...snippets]);
    setShowCreateModal(false);
    toast.success("Snippet created successfully!");
  };

  const handleRenameSnippet = (snippetId: number) => {
    if (!newSnippetName.trim()) {
      toast.error("Please enter a valid name");
      return;
    }

    setSnippets(snippets.map(snippet => 
      snippet.id === snippetId 
        ? { ...snippet, name: newSnippetName.trim() }
        : snippet
    ));
    
    setRenamingSnippetId(null);
    setNewSnippetName("");
    toast.success("Snippet renamed successfully!");
  };

  const handleDeleteSnippet = (snippetId: number) => {
    setSnippets(snippets.filter(snippet => snippet.id !== snippetId));
    toast.success("Snippet deleted successfully!");
  };

  return (
    <SidebarGroup>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between px-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "" : "-rotate-90"}`} />
              <SidebarGroupLabel className="ml-2">Saved Snippets</SidebarGroupLabel>
            </Button>
          </CollapsibleTrigger>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <SidebarMenuItem key={`skeleton-${index}`}>
                    <div className="flex items-center gap-3 px-2 py-1.5 w-full">
                      <Skeleton className="h-5 w-5 rounded-md" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  </SidebarMenuItem>
                ))
              ) : (
                snippets.map((snippet) => (
                  <SidebarMenuItem key={snippet.id} className="group">
                    <SidebarMenuButton className="w-full flex justify-between items-center">
                      <div className="flex items-center min-w-0">
                        <img
                          src={languageImage(snippet.language as Language)}
                          className="w-5 h-5 mr-3 shrink-0"
                          alt={snippet.language}
                        />
                        <span className="truncate">{snippet.name}</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 text-xs">
                          <Popover>
                            <PopoverTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  e.preventDefault();
                                  setRenamingSnippetId(snippet.id);
                                  setNewSnippetName(snippet.name);
                                }}
                              >
                                Rename
                              </DropdownMenuItem>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 p-2">
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  value={newSnippetName}
                                  onChange={(e) => setNewSnippetName(e.target.value)}
                                  className="w-full px-2 py-1 border rounded text-xs"
                                  placeholder="Enter new name"
                                  autoFocus
                                />
                                <div className="flex justify-end">
                                  <Button
                                    size="sm"
                                    onClick={() => handleRenameSnippet(snippet.id)}
                                  >
                                    Rename
                                  </Button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onSelect={() => handleDeleteSnippet(snippet.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>

      <CreateSnippetModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateSnippet}
      />
    </SidebarGroup>
  );
};
