import { Terminal } from "lucide-react";
import { Language } from "@/lib/constant";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { Snippet } from "@/types";

async function fetchSavedSnippets(): Promise<Snippet[]> {
  // Mock API call with 3 second delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  return [
    { id: 1, name: "Fibonacci Sequence", language: "Python", code: "", output: "" },
    { id: 2, name: "Two Sum Solution", language: "JavaScript", code: "", output: "" },
    { id: 3, name: "Binary Search Tree", language: "Rust", code: "", output: "" },
    { id: 4, name: "Quick Sort Implementation", language: "C++", code: "", output: "" },
    { id: 5, name: "Dynamic Programming", language: "C#", code: "", output: "" },
  ];
}

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
  const { data: snippets, isLoading } = useQuery({
    queryKey: ['saved-snippets'],
    queryFn: fetchSavedSnippets,
  });

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Saved Snippets</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <SidebarMenuItem key={`skeleton-${index}`}>
                <SidebarMenuSkeleton showIcon />
              </SidebarMenuItem>
            ))
          ) : (
            snippets?.map((snippet) => (
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
    </SidebarGroup>
  );
};