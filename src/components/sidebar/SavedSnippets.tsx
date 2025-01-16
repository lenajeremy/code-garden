import { Terminal, Plus, ChevronDown } from "lucide-react";
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
    toast.success("Snippet created successfully!", { position: "top-center" });
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