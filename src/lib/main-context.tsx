import { createContext } from "react";
import { DefaultLanguage, Language } from "@/lib/constant.ts";
import { User } from "@/types";

const MainContext = createContext<{
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
  userDetails?: User;
  updateUserDetails: (u: User) => void
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
  updateUserDetails: () => {}
});

export default MainContext;
