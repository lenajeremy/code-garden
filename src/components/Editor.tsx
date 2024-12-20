import { useState } from "react";
import Editor from "@monaco-editor/react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export const CodeEditor = () => {
  const [code, setCode] = useState(`// Write your code here...`);
  const [output, setOutput] = useState("");

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
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30}>
          <div className="h-full bg-editor-bg p-4">
            <div className="text-sm text-editor-lineNumber mb-2">Output:</div>
            <pre className="font-mono whitespace-pre-wrap h-full overflow-auto">
              {output || "Program output will appear here..."}
            </pre>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};