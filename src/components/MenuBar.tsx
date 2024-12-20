import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Play, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const languages = [
  "Python", "JavaScript", "Java", "C++", "C#", "Ruby", "PHP", "Swift", "Go", "Rust",
  "TypeScript", "Kotlin", "Scala", "R", "MATLAB", "Perl", "Haskell", "Lua", "Julia", "Dart"
];

export const MenuBar = () => {
  const { toast } = useToast();

  const handleRun = () => {
    console.log("Running code");
    toast({
      title: "Executing code...",
      description: "Your code is being compiled and executed.",
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "The URL has been copied to your clipboard.",
    });
  };

  return (
    <div className="border-b border-border p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang.toLowerCase()}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleRun} className="bg-editor-success hover:bg-editor-success/90">
          <Play className="w-4 h-4 mr-2" />
          Run
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};