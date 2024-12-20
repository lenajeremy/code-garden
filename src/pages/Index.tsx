import * as React from 'react';
import {Layout} from "@/components/Layout";
import {CodeEditor} from "@/components/Editor";
import MainContext from "@/lib/main-context.tsx";
import {DefaultLanguage, Language} from "@/lib/constant.ts";

const Index = () => {
    return (
        <Layout>
            <CodeEditor/>
        </Layout>
    );
};

const IndexWithProvider = () => {
    const [lang, setLang] = React.useState<Language>(DefaultLanguage);
    return (
        <MainContext.Provider value={{currLanguage: lang, setLanguage: setLang}}>
            <Index/>
        </MainContext.Provider>
    )
}

export default IndexWithProvider;