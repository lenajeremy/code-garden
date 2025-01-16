import { createContext } from "react";
import { DefaultLanguage, Language } from "./constant";
import { Snippet } from "@/types";

const EditorContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  code: string;
  setCode: (c: string) => void;
  output: string;
  setOutput: (c: string) => void;
  error: string;
  setError: (e: string) => void;
  stats: {
    runtime: string;
    memory: string;
  };
  setStats: (s: { runtime: string; memory: string }) => void;
  save: (snippetId: string) => Promise<void>;
  create: () => Promise<Snippet>;
  loading: {
    isCreatingSnippet: boolean;
    isFetchingSnippet: boolean;
    isRunningSnippet: boolean;
    isUpdatingSnippet: boolean;
  };
  run: () => void;
}>({
  language: DefaultLanguage,
  setLanguage: () => {},
  code: "",
  setCode: () => {},
  output: "",
  setOutput: () => {},
  error: "",
  setError: () => {},
  stats: {
    runtime: "",
    memory: "",
  },
  setStats: () => {},
  save: async () => {},
  create: async () => {
    return {
      name: "",
      id: "",
      publicId: "",
      code: "",
      output: "",
      language: "Python",
    };
  },
  run: () => {},
  loading: {
    isCreatingSnippet: false,
    isRunningSnippet: false,
    isFetchingSnippet: false,
    isUpdatingSnippet: false,
  },
});

export default EditorContext;
