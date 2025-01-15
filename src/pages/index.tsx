import * as React from "react";
import { Layout } from "@/components/Layout";
import { CodeEditor } from "@/components/Editor";
import { DefaultLanguage, Language } from "@/lib/constant.ts";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EditorContext from "@/lib/editor-context";
import {
  useCreateSnippetMutation,
  useGetSnippetQuery,
  useUpdateSnippetMutation,
} from "@/api/codeApi";

function Index() {
  const [lang, setLang] = React.useState(DefaultLanguage);
  const [code, setCode] = React.useState(`# Write your code here...`);
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");
  const [snippetName, setSnippetName] = React.useState("");
  const [stats, setStats] = React.useState({ runtime: "10ms", memory: "0MB" });
  const [loading, setLoading] = React.useState(true);

  const { trigger: createSnippet } = useCreateSnippetMutation();
  const { trigger: updateSnippet } = useUpdateSnippetMutation();

  const _create = React.useCallback(async (): Promise<string> => {
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
        code,
        language: lang.toLowerCase(),
        output,
      });
      resFunc(res);
      return res.data.public_id;
    } catch (err) {
      rejFunc(err);
    }
    return "";
  }, [code, lang, output, createSnippet]);

  const _save = React.useCallback(
    async (snippetId: string) => {
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
          code,
          language: lang.toLowerCase(),
          output,
          id: snippetId,
        });
        resFunc(res);
      } catch (error) {
        rejFunc(error);
      }
    },
    [code, lang, output, updateSnippet]
  );

  const save = React.useCallback(
    async (snippetId?: string): Promise<string> => {
      console.log("calling create with", snippetId)
      if (!snippetId) {
        return await _create();
      }
      await _save(snippetId);
      return snippetId;
    },
    [_create, _save]
  );

  const params = useParams();
  const navigate = useNavigate();
  const { trigger } = useGetSnippetQuery(params["snippet-id"]);

  React.useEffect(() => {
    (async function () {
      if (!params["snippet-id"]) {
        setLoading(false);
      } else {
        try {
          const data = await trigger(params["snippet-id"]);
          setCode(data.data.code);
          setLang(
            (data.data.language.charAt(0).toUpperCase() +
              data.data.language.slice(1)) as Language
          );
          setOutput(data.data.output);
        } catch (error) {
          toast.error(String(error));
          navigate("/");
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [params, navigate, setCode, setLang, setOutput, trigger]);

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
        snippetName,
        setSnippetName,
        stats,
        setStats,
        save,
      }}
    >
      <Layout>
        <CodeEditor />
      </Layout>
    </EditorContext.Provider>
  );
}
export default Index;