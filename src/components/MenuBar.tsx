import * as React from 'react'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Loader2, Play, Share2} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import {DefaultLanguage, Language, languages} from "@/lib/constant.ts";
import MainContext from "@/lib/main-context.tsx";


export const MenuBar = () => {
    const {toast} = useToast();
    const [isRunning, setIsRunning] = React.useState(false);
    const {setLanguage, currLanguage, code, setOutput} = React.useContext(MainContext)

    const handleRun = async () => {
        setIsRunning(true);
        toast({
            title: "Executing code...",
            description: "Your code is being compiled and executed.",
        });

        try {
            const res = await fetch("http://localhost:3000/run-safe", {
                method: "POST",
                body: JSON.stringify({language: currLanguage.toLowerCase(), code})
            })
            const data = await res.json()
            setOutput(data.output)
        } catch (error) {
            toast({
                title: "Error executing code",
                description: error.message,
            })
        } finally {
            setIsRunning(false);
        }
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
        <div className="border-b border-border">
            <div className="p-4 flex items-center justify-between flex-wrap gap-4">
                <Select defaultValue={DefaultLanguage.toLowerCase()} onValueChange={(v: Language) => setLanguage(v)}>
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
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-2"/>
                        Share
                    </Button>
                    <Button
                        onClick={handleRun}
                        className="bg-editor-success hover:bg-editor-success/90"
                        disabled={isRunning}
                    >
                        {isRunning ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                        ) : (
                            <Play className="w-4 h-4 mr-2"/>
                        )}
                        Run
                    </Button>
                </div>
            </div>
        </div>
    );
};