import {useContext} from "react";
import Editor from "@monaco-editor/react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import MainContext from "@/lib/main-context.tsx";

export const CodeEditor = () => {
    const {currLanguage: language, code, setCode, output} = useContext(MainContext);

    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined) {
            setCode(value);
        }
    };

    return (
        <div className="h-[calc(100vh-10rem)] pt-4">
            <ResizablePanelGroup direction="vertical" className="h-full">
                <ResizablePanel defaultSize={70}>
                    <div className="h-full">
                        <Editor
                            height="100%"
                            theme="vs-dark"
                            value={code}
                            onChange={handleEditorChange}
                            defaultLanguage={language.toLowerCase()}
                            language={language.toLowerCase()}
                            options={{
                                minimap: {enabled: false},
                                fontSize: 14,
                                lineNumbers: "on",
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
                        <div className="text-sm text-editor-lineNumber mb-2">Output:</div>
                        <pre className="font-mono text-sm whitespace-pre-wrap h-full overflow-auto">
                            {`${output}` || "Program output will appear here..."}
                        </pre>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};