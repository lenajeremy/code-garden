import { useState, useEffect, useCallback, useRef } from "react";
import { Layout } from "@/components/Layout";
import { CodeEditor } from "@/components/Editor";
import { DefaultLanguage, Language } from "@/lib/constant.ts";
import { useRouter } from 'next/router';
import { toast } from "sonner";
import EditorContext from "@/lib/editor-context";
import {
  useCreateSnippetMutation,
  useGetSnippetQuery,
  useRunSafeMutation,
  useUpdateSnippetMutation,
} from "@/api/codeApi";
import { ApiResponse, Snippet } from "@/types";
import ProtectedRoute from "@/components/protected-route";

const Index = ({ snippetId }: { snippetId: string }) => {
  const router = useRouter();

  const [lang, setLang] = useState(DefaultLanguage);
  const [code, setCode] = useState(`# Write your code here...`);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ runtime: "10ms", memory: "0MB" });

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

  const { trigger: createSnippet, loading: isCreatingSnippet } =
    useCreateSnippetMutation();
  const { trigger: updateSnippet, loading: isUpdatingSnippet } =
    useUpdateSnippetMutation();
  const { trigger: runCodeSafe, loading: isRunningSnippet } =
    useRunSafeMutation();
  const {
    data: snippetRes,
    error: snippetError,
    loading: isFetchingSnippet,
  } = useGetSnippetQuery(snippetId, {
    fetchOnRender: !!snippetId,
  });

  const create = useCallback(async (): Promise<Snippet> => {
    let [resFunc, rejFunc] = [(v: unknown) => {}, (r?: unknown) => {}];
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
      return res.data;
    } catch (err) {
      rejFunc(err);
    }
  }, [createSnippet]);

  const save = useCallback(
    async (snippetId: string): Promise<void> => {
      let [resFunc, rejFunc] = [(v: unknown) => {}, (r?: unknown) => {}];
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
    let resolveFunc: (r: unknown) => void;
    let rejectFunc: (r: unknown) => void;

    const myPromise = new Promise((res, rej) => {
      resolveFunc = res;
      rejectFunc = rej;
    });

    toast.promise(myPromise, {
      loading: "Executing code...",
      success: "Code run successfully.",
      error: "Failed to run code",
    });

    let res: ApiResponse<string>;
    try {
      setError("");
      setOutput("");
      res = await runCodeSafe({
        language: langRef.current.toLowerCase(),
        code: codeRef.current,
      });
      resolveFunc(res);

      setError(res.error);
      setOutput(res.data);
    } catch (err) {
      rejectFunc(err);
    }
  }, [runCodeSafe, setError, setOutput]);

  useEffect(() => {
    if (snippetError) {
      toast.error(JSON.stringify(snippetError));
      router.push("/");
    } else if (snippetRes && snippetRes.status == 200) {
      setCode(snippetRes.data.code);
      setLang(
        (snippetRes.data.language.charAt(0).toUpperCase() +
          snippetRes.data.language.slice(1)) as Language
      );
      setOutput(snippetRes.data.output);
    }
  }, [snippetError, snippetRes, router]);

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
      <Layout>
        <CodeEditor />
      </Layout>
    </EditorContext.Provider>
  );
};

export default Index;