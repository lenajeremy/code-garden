import { createContext }  from 'react'
import {Language} from "@/lib/constant.ts";

const MainContext = createContext<{
    currLanguage: Language,
    setLanguage: (language: Language) => void,
    userDetails?: unknown
}>({
    currLanguage: "Python",
    setLanguage: () => {}
})

export default MainContext