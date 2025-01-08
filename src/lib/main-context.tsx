import { createContext }  from 'react'
import {DefaultLanguage, Language} from "@/lib/constant.ts";

const MainContext = createContext<{
    language: Language,
    setLanguage: (language: Language) => void,
    code: string,
    setCode: (c: string) => void,
    output: string,
    setOutput: (c: string) => void,
    error: string,
    setError: (e: string) => void,
    stats: {
        runtime: string,
        memory: string,
    }
    setStats: (s : {runtime: string, memory: string}) => void,
    userDetails?: unknown
}>({
    language: DefaultLanguage,
    setLanguage: () => {},
    code: '',
    setCode: () => {},
    output: '',
    setOutput: () => {},
    error: '',
    setError: () => {},
    stats: {
        runtime: "",
        memory: "",
    },
    setStats: () => {}
})

export default MainContext