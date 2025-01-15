import { createContext } from "react";
import { DefaultLanguage, Language } from "./constant";

export const EditorContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  code: string;
  setCode: (c: string) => void;
  output: string;
  setOutput: (c: string) => void;
  error: string;
  setError: (e: string) => void;
  snippetName: string;
  setSnippetName: (name: string) => void;
  stats: {
    runtime: string;
    memory: string;
  };
  setStats: (s: { runtime: string; memory: string }) => void;
  save: (id?: string) => Promise<string>;
}>({
  language: DefaultLanguage,
  setLanguage: () => {},
  code: "",
  setCode: () => {},
  output: "",
  setOutput: () => {},
  error: "",
  setError: () => {},
  snippetName: "",
  setSnippetName: () => {},
  stats: {
    runtime: "",
    memory: "",
  },
  setStats: () => {},
  save: async () => {
    return "";
  },
});

export default EditorContext;