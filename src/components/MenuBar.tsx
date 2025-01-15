import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Menu, Play, Settings2, Share2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { languages } from "@/lib/constant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { ShareModal } from "./ShareModal";
import { useNavigate, useParams } from "react-router-dom";
import EditorContext from "@/lib/editor-context";
import { ApiResponse } from "@/types";
import { useRunSafeMutation } from "@/api/codeApi";

interface ExecutionSettings {
  timeout: number;
  memoryLimit: number;
}

export const MenuBar = () => {
  const { language, setLanguage, code, setOutput, setError, save } =
    useContext(EditorContext);
  const { toggleSidebar } = useSidebar();
  const [settings, setSettings] = useState<ExecutionSettings>({
    timeout: 5000,
    memoryLimit: 128,
  });
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = async (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key == "Enter") {
          e.preventDefault();
          await handleRun();
        } else if (e.key === "s") {
          e.preventDefault();
          const publicId = await save(params["snippet-id"]);
          if (publicId !== params["snippet-id"]) {
            navigate(`./${publicId}`, { replace: true });
          }
        }
      }
    };
    window.addEventListener("keydown", handler, true);
    return () => window.removeEventListener("keydown", handler, true);
  });

  const { trigger: runCodeUnsafe, loading: isRunning } = useRunSafeMutation();

  const handleRun = async () => {
    let resolveFunc: (r: unknown) => void;
    let rejectFunc: (r: unknown) => void;

    const myPromise = new Promise((res, rej) => {
      resolveFunc = res;
      rejectFunc = rej;
    });

    toast.promise(myPromise, {
      loading: "Executing code...",
      success: "Code run successfully.",
      error: "Failed to run code",
    });

    let res: ApiResponse<string>;
    try {
      setError("");
      setOutput("");
      res = await runCodeUnsafe({ language: language.toLowerCase(), code });
      resolveFunc(res);

      setError(res.error);
      setOutput(res.data);
    } catch (err) {
      rejectFunc(err);
    }
  };

  const handleLanguageChange = (value: string) => {
    const selectedLanguage = languages.find(
      (lang) => lang.toLowerCase() === value.toLowerCase()
    );
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
    }
  };

  return (
    <div className="border-b border-border md:h-16">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        {/* Left Section - Logo and Menu */}
        <div className="flex items-center gap-3 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <span className="font-semibold text-lg">Code Garden</span>
          </div>
        </div>

        {/* Center Section - Language Selector (Desktop Only) */}
        <div className="hidden md:flex flex-1 md:flex-auto">
          <Select
            value={language.toLowerCase()}
            onValueChange={handleLanguageChange}
          >
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
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Run Button */}
          <Button
            onClick={handleRun}
            className="bg-editor-success hover:bg-editor-success/90"
            disabled={isRunning}
            size={window.innerWidth < 768 ? "icon" : "default"}
          >
            {isRunning ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Play className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Run</span>
              </>
            )}
          </Button>

          {/* Mobile Dropdown Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <Settings2 className="h-4 w-4 mr-2" />
                      Editor Settings
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Execution Settings</DialogTitle>
                      <DialogDescription>
                        Configure code execution parameters
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="timeout">Timeout (ms)</Label>
                        <Input
                          id="timeout"
                          type="number"
                          value={settings.timeout}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              timeout: parseInt(e.target.value),
                            }))
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="memory">Memory (MB)</Label>
                        <Input
                          id="memory"
                          type="number"
                          value={settings.memoryLimit}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              memoryLimit: parseInt(e.target.value),
                            }))
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <DropdownMenuItem onClick={() => setIsShareModalOpen(true)}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Select
                    defaultValue={language.toLowerCase()}
                    onValueChange={handleLanguageChange}
                  >
                    <SelectTrigger className="w-full border-0 p-0 h-auto font-normal">
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
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsShareModalOpen(true)}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Execution Settings</DialogTitle>
                  <DialogDescription>
                    Configure code execution parameters
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="timeout">Timeout (ms)</Label>
                    <Input
                      id="timeout"
                      type="number"
                      value={settings.timeout}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          timeout: parseInt(e.target.value),
                        }))
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="memory">Memory (MB)</Label>
                    <Input
                      id="memory"
                      type="number"
                      value={settings.memoryLimit}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          memoryLimit: parseInt(e.target.value),
                        }))
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};
