import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import EditorContext from "@/lib/editor-context";
import { useCreateSnippetMutation } from "@/api/codeApi";

export const MenuBar = () => {
  const { language, code, snippetName } = useContext(EditorContext);
  const { trigger } = useCreateSnippetMutation();

  const handleSave = async () => {
    try {
      await trigger({
        language: language.toLowerCase(),
        code,
        name: snippetName || "Untitled Snippet",
      });
      toast.success("Code saved successfully!");
    } catch (error) {
      toast.error("Failed to save code.");
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};