import { ChevronDown, MoreVertical, Plus } from "lucide-react";
import { Language } from "@/lib/constant";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useCallback, useContext, useEffect, useState } from "react";
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
  useDeleteSnippetMutation,
  useGetUserSnippetQuery,
  useUpdateSnippetMutation,
} from "@/api/codeApi";
import { useRouter, usePathname } from "next/navigation";
import EditorContext from "@/lib/editor-context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { errorDescription } from "@/lib/utils";
import MainContext from "@/lib/main-context";

function languageImage(language: Language): string {
  if (language == "javascript") {
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
  const [isOpen, setIsOpen] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [, setRenamingSnippetId] = useState<string | null>(null);
  const [isPopoverOpen, setIsPopOverOpen] = useState(false);
  const [newSnippetName, setNewSnippetName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [pendingNavigationPath, setPendingNavigationPath] = useState<
    string | null
  >(null);
  const { snippets, setSnippets, save, code } = useContext(EditorContext);
  const { userDetails } = useContext(MainContext);

  const { trigger: updateSnippet } = useUpdateSnippetMutation();
  const { trigger: createSnippet, loading: isCreatingSnippet } =
    useCreateSnippetMutation();
  const {
    data,
    loading: isLoadingSnippet,
    error,
  } = useGetUserSnippetQuery(undefined, {
    fetchOnRender: !!userDetails,
  });
  const { trigger: deleteSnippet } = useDeleteSnippetMutation();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (error) {
      toast.error("Failed to load snippets", {
        description: errorDescription(error),
      });
      setSnippets([]);
      return;
    }

    if (data && data.data) {
      setSnippets(data.data.snippets);
    }
  }, [data, error, setSnippets]);

  const handleNavigate = (path: string) => {
    const snippetId = pathname.split("/").pop();
    const snippet = snippets.find((s) => s.publicId === snippetId);

    if (snippet?.code !== code && pathname !== "/editor" && pathname !== path) {
      setPendingNavigationPath(path);
      setShowSaveDialog(true);
    } else {
      router.push(path);
    }
  };

  const handleSaveAndNavigate = async () => {
    if (pendingNavigationPath) {
      const currentSnippetId = pathname.split("/").pop();
      if (currentSnippetId) {
        await save(currentSnippetId);
        setSnippets((snippets) =>
          snippets.map((s) =>
            s.publicId === currentSnippetId ? { ...s, code } : s
          )
        );
        toast.success("Changes saved successfully!");
      }
      router.push(pendingNavigationPath);
      setShowSaveDialog(false);
      setPendingNavigationPath(null);
    }
  };

  const handleDiscardAndNavigate = () => {
    if (pendingNavigationPath) {
      router.push(pendingNavigationPath);
      setShowSaveDialog(false);
      setPendingNavigationPath(null);
    }
  };

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
        if (res) {
          setSnippets([res.data, ...snippets]);
          router.push(`/editor/${res.data.publicId}`);
          toast.success("Snippet created successfully!");
        }
      } catch (err) {
        toast.error("Failed to create snippet", {
          description: errorDescription(err),
        });
        console.error(err);
      } finally {
        setShowCreateModal(false);
      }
    },
    [createSnippet, router, setSnippets, snippets]
  );

  const handleRenameSnippet = async (snippetId: string) => {
    const currSnip = snippets.find((s) => s.publicId == snippetId);
    if (!currSnip) {
      return;
    }

    if (!newSnippetName.trim()) {
      toast.error("Please enter a valid name");
      return;
    }

    try {
      const res = await updateSnippet({
        ...currSnip,
        name: newSnippetName,
      });
      if (res && !res.error) {
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
      }
    } catch (error) {
      toast.error("Failed to rename snippet", {
        description: errorDescription(error),
      });
    }
  };

  const handleDeleteSnippet = async (snippetId: string) => {
    try {
      const res = await deleteSnippet(snippetId);
      if (res && !res.error) {
        setSnippets(
          snippets.filter((snippet) => snippet.publicId !== snippetId)
        );
        toast.success("Snippet deleted successfully!");
        router.push("/editor");
      } else {
        toast.error("Failed to delete snippet", {
          description: errorDescription(res?.error),
        });
      }
    } catch (error) {
      toast.error("Failed to delete snippet", {
        description: errorDescription(error),
      });
    }
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
                : snippets.map((snippet) => {
                    const isActive = pathname === `/editor/${snippet.publicId}`;
                    return (
                      <SidebarMenuItem key={snippet.id} className="group">
                        <SidebarMenuButton
                          className={`w-full relative ${
                            isActive
                              ? "before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-primary"
                              : ""
                          }`}
                          asChild
                        >
                          <div className="flex justify-between items-center">
                            <div
                              className="flex items-center min-w-0 cursor-pointer"
                              onClick={() =>
                                handleNavigate(`/editor/${snippet.publicId}`)
                              }
                            >
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
                                      onSubmit={async (e) => {
                                        e.preventDefault();
                                        await handleRenameSnippet(
                                          snippet.publicId
                                        );
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
                                  onSelect={() =>
                                    handleDeleteSnippet(snippet.publicId)
                                  }
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
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

      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes in your current snippet. Would you like
              to save them before switching to another snippet?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDiscardAndNavigate}>
              Don't Save
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveAndNavigate}>
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarGroup>
  );
};
