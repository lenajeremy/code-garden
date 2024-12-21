import { createContext }  from 'react'
import {DefaultLanguage, Language} from "@/lib/constant.ts";

const MainContext = createContext<{
    currLanguage: Language,
    setLanguage: (language: Language) => void,
    code: string,
    setCode: (c: string) => void,
    output: string,
    setOutput: (c: string) => void,
    userDetails?: unknown
}>({
    currLanguage: DefaultLanguage,
    setLanguage: () => {},
    code: '',
    setCode: () => {},
    output: '',
    setOutput: () => {}
})

export default MainContext