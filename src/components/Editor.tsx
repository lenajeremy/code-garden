import {useContext, useEffect, useRef, useState} from "react";
import Editor from "@monaco-editor/react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {Settings2} from "lucide-react";
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

interface EditorSettings {
    fontSize: number;
    theme: string;
    showLineNumbers: boolean;
}

export const CodeEditor = () => {
    const [code, setCode] = useState(`// Write your code here...`);
    const [output, setOutput] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [stats, setStats] = useState({ runtime: "0ms", memory: "0MB" });
    const [settings, setSettings] = useState<EditorSettings>({
        fontSize: 14,
        theme: "vs-dark",
        showLineNumbers: true,
    });
    const {currLanguage: language} = useContext(MainContext);
    const [userInput, setUserInput] = useState("");

    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined) {
            setCode(value);
        }
    };

    const handleSettingsChange = (newSettings: Partial<EditorSettings>) => {
        setSettings(prev => ({...prev, ...newSettings}));
    };

    const handleUserInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value);
    };

    return (
        <div className="h-[calc(100vh-12rem)]">
            <ResizablePanelGroup direction="vertical" className="h-full">
                <ResizablePanel defaultSize={70}>
                    <div className="h-full relative">
                        <div className="absolute top-2 right-2 z-10">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Settings2 className="h-4 w-4"/>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Editor Settings</DialogTitle>
                                        <DialogDescription>
                                            Customize your coding environment
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="fontSize">Font Size</Label>
                                            <Input
                                                id="fontSize"
                                                type="number"
                                                value={settings.fontSize}
                                                onChange={(e) => handleSettingsChange({
                                                    fontSize: parseInt(e.target.value)
                                                })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="theme">Theme</Label>
                                            <select
                                                id="theme"
                                                value={settings.theme}
                                                onChange={(e) => handleSettingsChange({theme: e.target.value})}
                                                className="col-span-3"
                                            >
                                                <option value="vs-dark">Dark</option>
                                                <option value="light">Light</option>
                                            </select>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <Editor
                            height="100%"
                            theme={settings.theme}
                            value={code}
                            onChange={handleEditorChange}
                            defaultLanguage={language.toLowerCase()}
                            language={language.toLowerCase()}
                            options={{
                                minimap: {enabled: false},
                                fontSize: settings.fontSize,
                                lineNumbers: settings.showLineNumbers ? "on" : "off",
                                roundedSelection: false,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                            }}
                        />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={30}>
                    <div className="h-full bg-editor-bg p-4">
                        <Tabs defaultValue="output" className="w-full">
                            <TabsList>
                                <TabsTrigger value="output">Output</TabsTrigger>
                                <TabsTrigger value="errors">Errors</TabsTrigger>
                                <TabsTrigger value="stats">Stats</TabsTrigger>
                            </TabsList>
                            <TabsContent value="output">
                                <pre className="font-mono text-sm whitespace-pre-wrap h-[calc(100%-8rem)] overflow-auto">
                                    {output || "Program output will appear here..."}
                                </pre>
                            </TabsContent>
                            <TabsContent value="errors">
                                <div className="text-editor-error">
                                    {errors.length > 0 ? (
                                        errors.map((error, index) => (
                                            <div key={index} className="mb-2">{error}</div>
                                        ))
                                    ) : (
                                        "No errors"
                                    )}
                                </div>
                            </TabsContent>
                            <TabsContent value="stats">
                                <div className="space-y-2">
                                    <div>Runtime: {stats.runtime}</div>
                                    <div>Memory Usage: {stats.memory}</div>
                                </div>
                            </TabsContent>
                            <div className="mt-4">
                                <Label htmlFor="userInput">Program Input</Label>
                                <textarea
                                    id="userInput"
                                    value={userInput}
                                    onChange={handleUserInput}
                                    placeholder="Enter input for your program here..."
                                    className="w-full h-20 mt-2 p-2 bg-editor-bg border border-border rounded font-mono"
                                />
                            </div>
                        </Tabs>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};