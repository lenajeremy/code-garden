import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Loader2, Menu, Play, Share2, Settings2} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import {useState, useContext} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import MainContext from "@/lib/main-context";
import {Language, languages} from "@/lib/constant";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useSidebar} from "@/components/ui/sidebar";

interface ExecutionSettings {
    timeout: number;
    memoryLimit: number;
}

export const MenuBar = () => {
    const {toast} = useToast();
    const [isRunning, setIsRunning] = useState(false);
    const {currLanguage: language, setLanguage} = useContext(MainContext);
    const {toggleSidebar} = useSidebar();
    const [settings, setSettings] = useState<ExecutionSettings>({
        timeout: 5000,
        memoryLimit: 128,
    });

    const handleRun = async () => {
        setIsRunning(true);
        console.log("Running code with settings:", settings);
        toast({
            title: "Executing code...",
            description: "Your code is being compiled and executed.",
        });

        // Simulate code execution with a 3-second delay
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsRunning(false);
    };

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        toast({
            title: "Link copied!",
            description: "The URL has been copied to your clipboard.",
        });
    };

    const handleLanguageChange = (value: string) => {
        const selectedLanguage = languages.find(
            lang => lang.toLowerCase() === value.toLowerCase()
        );
        if (selectedLanguage) {
            setLanguage(selectedLanguage);
        }
    };

    return (
        <div className="border-b border-border">
            <div className="p-4 flex items-center justify-between">
                {/* Mobile Menu */}
                <div className="flex items-center gap-4">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="md:hidden"
                        onClick={toggleSidebar}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg hidden md:block">Code Garden</span>
                    </div>
                </div>

                {/* Desktop Language Selector */}
                <Select 
                    defaultValue={language.toLowerCase()} 
                    onValueChange={handleLanguageChange}
                    className="hidden md:flex w-[180px]"
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Language"/>
                    </SelectTrigger>
                    <SelectContent>
                        {languages.map((lang) => (
                            <SelectItem key={lang} value={lang.toLowerCase()}>
                                {lang}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Actions */}
                <div className="flex items-center gap-2">
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

                    {/* Mobile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="md:hidden">
                            <Button variant="outline" size="icon">
                                <Settings2 className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DialogTrigger asChild>
                                <DropdownMenuItem>
                                    <Settings2 className="h-4 w-4 mr-2" />
                                    Settings
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem onClick={handleShare}>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="outline" onClick={handleShare}>
                            <Share2 className="h-4 w-4 mr-2"/>
                            Share
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Settings2 className="h-4 w-4"/>
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
                                            onChange={(e) => setSettings(prev => ({
                                                ...prev,
                                                timeout: parseInt(e.target.value)
                                            }))}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="memory">Memory (MB)</Label>
                                        <Input
                                            id="memory"
                                            type="number"
                                            value={settings.memoryLimit}
                                            onChange={(e) => setSettings(prev => ({
                                                ...prev,
                                                memoryLimit: parseInt(e.target.value)
                                            }))}
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};