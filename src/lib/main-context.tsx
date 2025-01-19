"use client"

import { createContext } from "react";
import { User } from "@/types";

const MainContext = createContext<{
  userDetails?: User;
  updateUserDetails: (u: User | undefined) => void;
}>({
  updateUserDetails: () => {},
});

export default MainContext;
