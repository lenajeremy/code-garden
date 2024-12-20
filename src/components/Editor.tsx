import { useState } from "react";

export const Editor = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="editor-container">
      <div className="split-pane-container">
        <div className="flex-1">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-editor-bg text-editor-text p-4 font-mono resize-none focus:outline-none"
            placeholder="Write your code here..."
          />
        </div>
        <div className="output-panel">
          <div className="text-sm text-editor-lineNumber mb-2">Output:</div>
          <pre className="whitespace-pre-wrap">{output || "Program output will appear here..."}</pre>
        </div>
      </div>
    </div>
  );
};