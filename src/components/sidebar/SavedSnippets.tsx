import { Plus, ChevronDown, MoreVertical } from "lucide-react";
import { Language } from "@/lib/constant";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useContext, useCallback } from "react";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { CreateSnippetModal } from "./CreateSnippetModal";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import {
  useCreateSnippetMutation,
  useGetUserSnippetQuery,
} from "@/api/codeApi";
import EditorContext from "@/lib/editor-context";
import { Snippet } from "@/types";
import { Link } from "react-router-dom";

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
  const [snippets, setSnippets] = useState<Array<Snippet>>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [renamingSnippetId, setRenamingSnippetId] = useState<string | null>(
    null
  );
  const [isPopoverOpen, setIsPopOverOpen] = useState(false);
  const [newSnippetName, setNewSnippetName] = useState("");
  const { trigger: createSnippet, loading: isCreatingSnippet } =
    useCreateSnippetMutation();
  const {
    data,
    loading: isLoadingSnippet,
    error,
  } = useGetUserSnippetQuery(null, {
    fetchOnRender: true,
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load snippets");
      setSnippets([]);
      return;
    }

    if (data && data.data) {
      setSnippets(data.data.snippets);
    }
  }, [data, error]);

  const handleCreateSnippet = useCallback(
    async (name: string, language: Language) => {
      language = language.toLowerCase() as Language;
      try {
        const res = await createSnippet({
          name: name || "Untitled Snippet",
          language,
          output: "",
          code: "",
        });
        console.log(res);
        setSnippets([res.data, ...snippets]);
        toast.success("Snippet created successfully!");
      } catch (err) {
        toast.error("Failed to create snippet", { description: err.message });
        console.error(err);
      } finally {
        setShowCreateModal(false);
      }
    },
    [createSnippet, snippets]
  );

  const handleRenameSnippet = (snippetId: string) => {
    if (!newSnippetName.trim()) {
      toast.error("Please enter a valid name");
      return;
    }

    setSnippets(
      snippets.map((snippet) =>
        snippet.publicId === snippetId
          ? { ...snippet, name: newSnippetName.trim() }
          : snippet
      )
    );

    setRenamingSnippetId(null);
    setNewSnippetName("");
    toast.success("Snippet renamed successfully!");
  };

  const handleDeleteSnippet = (snippetId: string) => {
    setSnippets(snippets.filter((snippet) => snippet.id !== snippetId));
    toast.success("Snippet deleted successfully!");
  };

  return (
    <SidebarGroup>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between px-2">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 hover:bg-transparent"
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "" : "-rotate-90"
                }`}
              />
              <SidebarGroupLabel className="ml-2">
                Saved Snippets
              </SidebarGroupLabel>
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
              {isLoadingSnippet
                ? Array.from({ length: 5 }).map((_, index) => (
                    <SidebarMenuItem key={`skeleton-${index}`}>
                      <div className="flex items-center gap-3 px-2 py-1.5 w-full">
                        <Skeleton className="h-5 w-5 rounded-md" />
                        <Skeleton className="h-4 flex-1" />
                      </div>
                    </SidebarMenuItem>
                  ))
                : snippets.map((snippet) => (
                    <SidebarMenuItem key={snippet.id} className="group">
                      <SidebarMenuButton className="w-full" asChild>
                        <div className="flex justify-between items-center">
                          <Link to={`/editor/${snippet.publicId}`}>
                            <div className="flex items-center min-w-0">
                              <img
                                src={languageImage(
                                  snippet.language as Language
                                )}
                                className="w-5 h-5 mr-3 shrink-0"
                                alt={snippet.language}
                              />
                              <span className="truncate">
                                {snippet.name || "Untitled Snippet"}
                              </span>
                            </div>
                          </Link>
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
                            <DropdownMenuContent
                              align="end"
                              className="w-48 text-xs"
                            >
                              <Popover
                                modal
                                open={isPopoverOpen}
                                onOpenChange={(v) => setIsPopOverOpen(v)}
                              >
                                <PopoverTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => {
                                      e.preventDefault();
                                      setRenamingSnippetId(snippet.publicId);
                                      setNewSnippetName(snippet.name);
                                      setIsPopOverOpen(true);
                                    }}
                                  >
                                    Rename
                                  </DropdownMenuItem>
                                </PopoverTrigger>
                                <PopoverContent className="w-48 p-2">
                                  <form
                                    className="space-y-2"
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      handleRenameSnippet(snippet.id);
                                      setIsPopOverOpen(false);
                                    }}
                                  >
                                    <Input
                                      type="text"
                                      value={newSnippetName}
                                      onChange={(e) =>
                                        setNewSnippetName(e.target.value)
                                      }
                                      className="w-full p-2 h-8 text-xs"
                                      placeholder="Enter new name"
                                      autoFocus
                                    />
                                    <div className="flex justify-end">
                                      <Button size="sm" className="w-full">
                                        Rename
                                      </Button>
                                    </div>
                                  </form>
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
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>

      <CreateSnippetModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateSnippet}
        loading={isCreatingSnippet}
      />
    </SidebarGroup>
  );
};
