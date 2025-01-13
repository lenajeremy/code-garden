import * as React from "react";
import { Layout } from "@/components/Layout";
import { CodeEditor } from "@/components/Editor";
import MainContext from "@/lib/main-context.tsx";
import { DefaultLanguage } from "@/lib/constant.ts";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Index = () => {
  const {
    code,
    language: lang,
    output,
    setCode,
    setLanguage: setLang,
    setOutput,
  } = React.useContext(MainContext);
  const [loading, setLoading] = React.useState(true);

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
      const res = await fetch("http://localhost:3000/snippet/create", {
        method: "POST",
        body: JSON.stringify({
          code,
          language: lang.toLowerCase(),
          output,
        }),
      });
      const data = await res.json();
      if (data.status == 201) {
        resFunc(data);
        return data.data.public_id;
      } else {
        resFunc(data);
      }
    } catch (err) {
      rejFunc(err);
    }
    return "";
  }, [code, lang, output]);

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
        const res = await fetch(`http://localhost:3000/snippet/${snippetId}`, {
          method: "PUT",
          body: JSON.stringify({
            code,
            language: lang.toLowerCase(),
            output,
          }),
        });

        const data = await res.json();
        if (data.status == 200) {
          resFunc(data);
          return res;
        } else {
          resFunc(data);
          return res;
        }
      } catch (error) {
        rejFunc(error);
      }
    },
    [code, lang, output]
  );

  const save = React.useCallback(
    async (snippetId?: string): Promise<string> => {
      console.log("savinng");
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

  React.useEffect(() => {
    (async function () {
      if (!params["snippet-id"]) {
        setLoading(false);
      } else {
        try {
          const res = await fetch(
            `http://localhost:3000/snippet/${params["snippet-id"]}`
          );
          const data = await res.json();
          if (data.status != 200) {
            toast.error("Snippet not found.");
            navigate("/");
          } else {
            setCode(data.data.code);
            console.log(
              data.data.language.charAt(0).toUpperCase() +
                data.data.language.slice(1)
            );

            setLang(
              data.data.language.charAt(0).toUpperCase() +
                data.data.language.slice(1)
            );
            setOutput(data.data.output);
          }
        } catch (err) {
          toast.error(String(err));
          navigate("/");
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [params, navigate, setCode, setLang, setOutput]);

  return (
    <Layout>
      <CodeEditor />
    </Layout>
  );
};

export default Index;
