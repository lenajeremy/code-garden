import { Terminal, Plus } from "lucide-react";
import { DefaultLanguage, Language } from "@/lib/constant";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import { useGetSnippetQuery, useGetUserSnippetQuery } from "@/api/codeApi";
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
  // const [snippets, setSnippets] = useState<typeof savedSnippetsData>([]);
  const [newSnippetName, setNewSnippetName] = useState("");
  const { data, loading } = useGetUserSnippetQuery(null, {
    fetchOnRender: true,
  });

  const handleCreateSnippet: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!newSnippetName.trim()) {
      toast.error("Please enter a name for your snippet");
      return;
    }

    // const newSnippet = {
    //   id: snippets.length + 1,
    //   name: newSnippetName,
    //   language: DefaultLanguage,
    //   icon: Terminal,
    // };

    // setSnippets([newSnippet, ...snippets]);
    setNewSnippetName("");
    toast.success("Snippet created successfully!", { position: "top-center" });
  };

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between px-2">
        <SidebarGroupLabel>Saved Snippets</SidebarGroupLabel>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Plus className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-2">
            <form
              className="flex flex-col gap-2"
              onSubmit={handleCreateSnippet}
            >
              <Input
                placeholder="Enter snippet name"
                value={newSnippetName}
                onChange={(e) => setNewSnippetName(e.target.value)}
              />
              <Button>Create Snippet</Button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <SidebarGroupContent>
        <SidebarMenu>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SidebarMenuItem key={`skeleton-${index}`}>
                  <div className="flex items-center gap-3 px-2 py-1.5 w-full">
                    <Skeleton className="h-5 w-5 rounded-md" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                </SidebarMenuItem>
              ))
            : data &&
              data.data.snippets.map((snippet) => (
                <SidebarMenuItem key={snippet.id}>
                  <SidebarMenuButton className="w-full" asChild>
                    <Link to = {`/editor/${snippet.publicId}`}>
                      <div className="border border-border rounded-md p-1 mr-3">
                        <img
                          src={languageImage(snippet.language as Language)}
                          className="w-5 h-5 shrink-0"
                          alt={snippet.language}
                        />
                      </div>
                      <div className="flex flex-col items-start min-w-0">
                        <span className="truncate w-full capitalize">
                          {snippet.name || snippet.language}
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
