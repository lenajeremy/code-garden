"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlayIcon, GitForkIcon } from "lucide-react";
import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useState } from "react";

interface EmbedSnippetProps {
  title: string;
  code: string;
  language: string;
  onRun?: () => void;
  onFork?: () => void;
}

export function EmbedSnippet({ 
  title, 
  code, 
  language, 
  onRun, 
  onFork 
}: EmbedSnippetProps) {
  const { resolvedTheme } = useTheme();
  const [output, setOutput] = useState<string>("");

  const settings = {
    fontSize: 14,
    theme: resolvedTheme === "light" ? "vs-light" : "vs-dark",
  };

  return (
    <Card className="w-full border rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-card border-b">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRun}
            className="flex items-center gap-2"
          >
            <PlayIcon className="h-4 w-4" />
            Run
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onFork}
            className="flex items-center gap-2"
          >
            <GitForkIcon className="h-4 w-4" />
            Fork
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px]">
          <MonacoEditor
            height="100%"
            theme={settings.theme}
            value={code}
            defaultLanguage={language.toLowerCase()}
            language={language.toLowerCase()}
            options={{
              readOnly: true,
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
          <div className="p-4 border-t bg-muted/10">
            <pre className="font-mono text-sm whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}