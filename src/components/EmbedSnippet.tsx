"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlayIcon } from "lucide-react";
import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useRunSafeMutation } from "@/api/codeApi";

interface EmbedSnippetProps {
  title: string;
  code: string;
  language: string;
  output: string;
}

export function EmbedSnippet({
  title,
  code: _code,
  language,
  output: _output,
}: EmbedSnippetProps) {
  const { resolvedTheme } = useTheme();
  const [output, setOutput] = useState<string>(_output);
  const [code, setCode] = useState(_code);
  const { trigger: run, loading: running } = useRunSafeMutation();

  const settings = {
    fontSize: 14,
    theme: resolvedTheme === "light" ? "vs-light" : "vs-dark",
  };

  async function onRun() {
    const res = await run({ code, language, requireAuth: false });
    if (res) {
      setOutput(res.data);
    }
  }

  return (
    <Card className="w-full border rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-4 py-3 bg-card border-b">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex gap-2">
          <Button
            loading={running}
            variant="default"
            size="sm"
            onClick={onRun}
            className="flex items-center gap-2 min-w-10"
          >
            <PlayIcon className="h-4 w-4" />
            Run
          </Button>
          {/* <Button
            variant="outline"
            size="sm"
            onClick={onFork}
            className="flex items-center gap-2"
          >
            <GitForkIcon className="h-4 w-4" />
            Fork
          </Button> */}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px]">
          <MonacoEditor
            onChange={(e) => setCode(e!)}
            height="100%"
            theme={settings.theme}
            value={code}
            defaultLanguage={language.toLowerCase()}
            language={language.toLowerCase()}
            options={{
              minimap: { enabled: false },
              fontSize: settings.fontSize,
              lineNumbers: "on",
              roundedSelection: true,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
        {output && (
          <div className="p-4 border-t bg-muted/10 max-h-60 overflow-y-scroll">
            <div className="mb-3 text-sm opacity-85">Output</div>
            <pre className="font-mono text-sm whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
