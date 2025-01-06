import {useContext, useEffect, useRef, useState} from "react";
import Editor from "@monaco-editor/react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
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

    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined) {
            setCode(value);
        }
    };

    return (
        <div className="h-[calc(100vh-12rem)]">
            <ResizablePanelGroup direction="vertical" className="h-full">
                <ResizablePanel defaultSize={70}>
                    <div className="h-full">
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
                            <TabsList className="w-full grid grid-cols-3">
                                <TabsTrigger value="output" className="data-[state=active]:bg-editor-success/20">Output</TabsTrigger>
                                <TabsTrigger value="errors" className="data-[state=active]:bg-editor-error/20">Errors</TabsTrigger>
                                <TabsTrigger value="stats" className="data-[state=active]:bg-editor-accent/20">Stats</TabsTrigger>
                            </TabsList>
                            <TabsContent value="output" className="mt-4">
                                <div className="font-mono text-sm rounded-md bg-editor-bg/50 p-4 h-[calc(100%-2rem)] overflow-auto">
                                    {output || "Program output will appear here..."}
                                </div>
                            </TabsContent>
                            <TabsContent value="errors" className="mt-4">
                                <div className="space-y-2">
                                    {errors.length > 0 ? (
                                        errors.map((error, index) => (
                                            <div key={index} className="flex items-center gap-2 text-editor-error bg-editor-error/10 p-3 rounded-md">
                                                <span className="inline-block w-2 h-2 rounded-full bg-editor-error"></span>
                                                <span className="font-mono text-sm">{error}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-center gap-2 text-editor-success bg-editor-success/10 p-3 rounded-md">
                                            <span className="inline-block w-2 h-2 rounded-full bg-editor-success"></span>
                                            <span className="font-mono text-sm">No errors</span>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                            <TabsContent value="stats" className="mt-4">
                                <div className="space-y-3 font-mono text-sm bg-editor-bg/50 p-4 rounded-md">
                                    <div className="flex items-center justify-between">
                                        <span className="text-editor-text/70">Runtime:</span>
                                        <span className="px-2 py-1 rounded bg-editor-accent/20 text-editor-accent">
                                            {stats.runtime}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-editor-text/70">Memory Usage:</span>
                                        <span className="px-2 py-1 rounded bg-editor-accent/20 text-editor-accent">
                                            {stats.memory}
                                        </span>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};