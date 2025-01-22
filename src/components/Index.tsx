"use client";

import React, {useCallback, useEffect, useRef, useState} from "react";
import {EditorLayout} from "@/components/EditorLayout";
import {DefaultLanguage, Language} from "@/lib/constant";
import {useParams, useRouter} from "next/navigation";
import {toast} from "sonner";
import EditorContext from "@/lib/editor-context";
import {
    useCreateSnippetMutation,
    useGetSnippetQuery,
    useRunSafeMutation,
    useUpdateSnippetMutation,
} from "@/api/codeApi";
import {Snippet} from "@/types";


const Index = ({children}: { children: React.ReactNode }) => {
    const router = useRouter();
    const snippetId = useParams<{ "snippet-id": string }>()["snippet-id"]

    const [lang, setLang] = useState(DefaultLanguage);
    const [code, setCode] = useState(`# Write your code here...`);
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [stats, setStats] = useState({runtime: "10ms", memory: "0MB"});

    const langRef = useRef(lang);
    const codeRef = useRef(code);
    const outputRef = useRef(output);
    const errorRef = useRef(error);

    useEffect(() => {
        langRef.current = lang;
        codeRef.current = code;
        outputRef.current = output;
        errorRef.current = error;
    }, [lang, output, error, code]);

    const {trigger: createSnippet, loading: isCreatingSnippet} =
        useCreateSnippetMutation();
    const {trigger: updateSnippet, loading: isUpdatingSnippet} =
        useUpdateSnippetMutation();
    const {trigger: runCodeSafe, loading: isRunningSnippet} =
        useRunSafeMutation();

    const {
        loading: isFetchingSnippet,
        trigger: fetchSnippet
    } = useGetSnippetQuery(snippetId);

    const create = useCallback(async (): Promise<Snippet | undefined> => {
        let [resFunc, rejFunc] = [
            (v: unknown) => {
                console.log(v);
            },
            (_?: unknown) => {
                console.log(_);
            },
        ];

        const promise = new Promise((_res, _rej) => {
            resFunc = _res;
            rejFunc = _rej;
        });

        toast.promise(promise, {
            loading: "Saving...",
            success: "Saved",
            error: "Failed to save!",
        });

        try {
            const res = await createSnippet({
                code: codeRef.current,
                language: langRef.current.toLowerCase(),
                output: outputRef.current,
                name: "",
            });
            resFunc(res);
            return res?.data;
        } catch (err) {
            rejFunc(err);
        }
    }, [createSnippet]);

    const save = useCallback(
        async (snippetId: string): Promise<void> => {
            let [resFunc, rejFunc] = [
                (v: unknown) => {
                    console.log(v);
                },
                (r?: unknown) => {
                    console.log(r);
                },
            ];

            const promise = new Promise((_res, _rej) => {
                resFunc = _res;
                rejFunc = _rej;
            });

            toast.promise(promise, {
                loading: "Saving...",
                success: "Saved",
                error: "Failed to save!",
            });

            try {
                const res = await updateSnippet({
                    code: codeRef.current,
                    language: langRef.current.toLowerCase(),
                    output: outputRef.current,
                    publicId: snippetId,
                    name: "",
                });
                resFunc(res);
            } catch (error) {
                rejFunc(error);
            }
        },
        [updateSnippet]
    );

    const run = useCallback(async () => {
        let resolveFunc = (r: unknown) => {
            console.log(r);
        };
        let rejectFunc = (r: unknown) => {
            console.log(r);
        };

        const myPromise = new Promise((res, rej) => {
            resolveFunc = res;
            rejectFunc = rej;
        });

        toast.promise(myPromise, {
            loading: "Executing code...",
            success: "Code run successfully.",
            error: "Failed to run code",
        });

        try {
            setError("");
            setOutput("");
            const r = await runCodeSafe({
                language: langRef.current.toLowerCase(),
                code: codeRef.current,
            });
            if (r) {
                resolveFunc(r);
                setError(r.error);
                setOutput(r.data);
            }
        } catch (err) {
            rejectFunc(err);
        }
    }, [runCodeSafe, setError, setOutput]);

    useEffect(() => {
        (async function () {
            if (!snippetId) return
            try {
                const res = await fetchSnippet(snippetId)
                if (res && res.status == 200) {
                    setCode(res.data.code);
                    setLang(
                        (res.data.language.charAt(0).toUpperCase() +
                            res.data.language.slice(1)) as Language
                    );
                    setOutput(res.data.output);
                }
            } catch (error) {
                toast.error(JSON.stringify(error));
                router.push("/");
            }
        })()
    }, [fetchSnippet, router, snippetId]);

    return (
        <EditorContext.Provider
            value={{
                language: lang,
                setLanguage: setLang,
                code,
                setCode,
                output,
                setOutput,
                error,
                setError,
                stats,
                setStats,
                save,
                create,
                run,
                loading: {
                    isCreatingSnippet,
                    isFetchingSnippet,
                    isRunningSnippet,
                    isUpdatingSnippet,
                },
            }}
        >
            <EditorLayout>
                {children}
            </EditorLayout>
        </EditorContext.Provider>
    );
};

export default Index;
