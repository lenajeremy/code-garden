import { createContext } from "react";
import { DefaultLanguage, Language } from "@/lib/constant.ts";
import { User } from "@/types";

const MainContext = createContext<{
  userDetails?: User;
  updateUserDetails: (u: User) => void;
}>({
  updateUserDetails: () => {},
});

export default MainContext;
