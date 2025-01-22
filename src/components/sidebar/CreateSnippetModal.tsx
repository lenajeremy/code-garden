import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { Language, languages } from "@/lib/constant";

interface CreateSnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, language: Language) => void;
  loading: boolean;
}

export const CreateSnippetModal = ({
  isOpen,
  onClose,
  onCreate,
  loading,
}: CreateSnippetModalProps) => {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState<Language>("Python");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(name.trim(), language);
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
                {languages.map((lang) => (
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
            <Button loading={loading} type="submit">
              Create Snippet
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
