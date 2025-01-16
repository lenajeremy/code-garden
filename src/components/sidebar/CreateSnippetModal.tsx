import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Language } from "@/lib/constant";

interface CreateSnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, language: Language) => void;
}

const LANGUAGES: Language[] = [
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "C++",
  "Rust",
  "Go",
];

export const CreateSnippetModal = ({ isOpen, onClose, onCreate }: CreateSnippetModalProps) => {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState<Language>("Python");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(name.trim(), language);
    setName("");
    setLanguage("Python");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Snippet</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="language" className="text-sm font-medium">
              Programming Language
            </label>
            <Select
              value={language}
              onValueChange={(value) => setLanguage(value as Language)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Snippet Name
            </label>
            <Input
              id="name"
              placeholder="Enter snippet name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Snippet</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};