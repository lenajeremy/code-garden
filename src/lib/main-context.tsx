import { createContext }  from 'react'
import {DefaultLanguage, Language} from "@/lib/constant.ts";

const MainContext = createContext<{
    currLanguage: Language,
    setLanguage: (language: Language) => void,
    userDetails?: unknown
}>({
    currLanguage: DefaultLanguage,
    setLanguage: () => {}
})

export default MainContext