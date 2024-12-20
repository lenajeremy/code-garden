import * as React from 'react'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Code2, Play, Share2} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import {Language, languages} from "@/lib/constant.ts";
import MainContext from "@/lib/main-context.tsx";


export const MenuBar = () => {
    const {toast} = useToast();
    const {setLanguage, currLanguage: l} = React.useContext(MainContext)

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
        <div className="flex flex-col border-b border-border">
            {/* Top header with logo */}
            <div className="border-b border-border p-4">
                <div className="flex items-center gap-2">
                    <Code2 className="w-6 h-6 text-editor-success"/>
                    <span className="text-lg font-semibold">Code Garden {l}</span>
                </div>
            </div>

            {/* Action buttons below */}
            <div className="p-4 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                    <Select onValueChange={(v: Language) => setLanguage(v)}>
                        <SelectTrigger className="w-[180px]">
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
                    <Button onClick={handleRun} className="bg-editor-success hover:bg-editor-success/90">
                        <Play className="w-4 h-4 mr-2"/>
                        Run
                    </Button>
                    <Button variant="outline" onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-2"/>
                        Share
                    </Button>
                </div>
            </div>
        </div>
    );
};