import * as React from 'react';
import {Layout} from "@/components/Layout";
import {CodeEditor} from "@/components/Editor";
import MainContext from "@/lib/main-context.tsx";
import {DefaultLanguage} from "@/lib/constant.ts";

const Index = () => {
    return (
        <Layout>
            <CodeEditor/>
        </Layout>
    );
};

const IndexWithProvider = () => {
    const [lang, setLang] = React.useState(DefaultLanguage);
    const [code, setCode] = React.useState(`// Write your code here...`);
    const [output, setOutput] = React.useState("");

    return (
        <MainContext.Provider value={{
            currLanguage: lang,
            setLanguage: setLang,
            code, setCode,
            output, setOutput
        }}>
            <Index/>
        </MainContext.Provider>
    )
}

export default IndexWithProvider;