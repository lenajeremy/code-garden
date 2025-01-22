"use client"
import { useCallback, useContext, useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditorContext from "@/lib/editor-context";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";

export function CodeEditor() {
  type ResultTabs = "output" | "errors" | "stats";
  const { code, output, error, stats, setCode, language, run, save } =
    useContext(EditorContext);
  const [currTab, setCurrTab] = useState<ResultTabs>("output");
  const errors = error.split("\n");
  const { resolvedTheme } = useTheme();

  const params = useParams();
  const snippetId = params["snippet-id"] as string;

  const settings = {
    fontSize: 14,
    theme: resolvedTheme == "light" ? "vs-light" : "vs-dark",
    showLineNumbers: true,
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  useEffect(() => {
    if (error) {
      setCurrTab("errors");
    } else if (output) {
      setCurrTab("output");
    }
  }, [output, error]);

  return (
    <ResizablePanelGroup direction="vertical" className="h-full">
      <ResizablePanel defaultSize={70}>
        <div className="h-full">
          <MonacoEditor
            height="100%"
            theme={settings.theme}
            value={code}
            onChange={handleEditorChange}
            defaultLanguage={language.toLowerCase()}
            language={language.toLowerCase()}
            loading={<></>}
            options={{
              minimap: { enabled: false },
              fontSize: settings.fontSize,
              lineNumbers: settings.showLineNumbers ? "on" : "off",
              roundedSelection: true,
              scrollBeyondLastLine: true,
              automaticLayout: true,
            }}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={30}>
        <div className="h-full bg-background relative overflow-y-scroll">
          <Tabs value={currTab} className="w-full">
            <div className={"w-full sticky top-0 bg-background"}>
              <TabsList className="w-full grid grid-cols-3 bg-transparent border-b border-border rounded-none">
                <TabsTrigger
                  onClick={() => setCurrTab("output")}
                  value="output"
                  className="data-[state=active]:text-editor-success data-[state=active]:border-b-2 data-[state=active]:border-editor-success rounded-none"
                >
                  Output
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => setCurrTab("errors")}
                  value="errors"
                  className="data-[state=active]:text-editor-success data-[state=active]:border-b-2 data-[state=active]:border-editor-success rounded-none"
                >
                  Errors
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => setCurrTab("stats")}
                  value="stats"
                  className="data-[state=active]:text-editor-success data-[state=active]:border-b-2 data-[state=active]:border-editor-success rounded-none"
                >
                  Stats
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="output" className="mt-0 p-4">
              <div
                style={{ whiteSpace: "break-spaces" }}
                className="font-mono text-sm text-foreground"
              >
                {output || "Program output will appear here..."}
              </div>
            </TabsContent>
            <TabsContent value="errors" className="mt-0 p-4">
              <div className="space-y-2">
                {errors.length > 0 ? (
                  errors.map((error, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-editor-error"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-editor-error"></span>
                      <span className="font-mono text-sm">{error}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 text-editor-success">
                    <span className="inline-block w-2 h-2 rounded-full bg-editor-success"></span>
                    <span className="font-mono text-sm">No errors</span>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="stats" className="mt-0 p-4">
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-foreground/70">Runtime:</span>
                  <span className="text-editor-accent">{stats.runtime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground/70">Memory Usage:</span>
                  <span className="text-editor-accent">{stats.memory}</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
