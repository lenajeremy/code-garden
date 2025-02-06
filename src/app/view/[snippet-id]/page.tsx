"use client";

import { CodeEditor } from "@/components/Editor";
import Index from "@/components/Index";
import EditorContext from "@/lib/editor-context";
import { useContext } from "react";

function ViewSnippet() {
  const { mode } = useContext(EditorContext);

  if (mode == "view-only") {
    return (
      <div className="h-[calc(100vh-82px)] pt-4 flex">
        <CodeEditor />
      </div>
    );
  }

  return <div />;
}

export default function ViewSnippetPage() {
  return (
    <Index defaultOptions={{ mode: "view-only" }}>
      <ViewSnippet />
    </Index>
  );
}
