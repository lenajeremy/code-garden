"use client";

import { useGetSnippetQuery } from "@/api/codeApi";
import { EmbedSnippet } from "@/components/EmbedSnippet";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Embed() {
  const searchParams = useSearchParams();
  const snippetId = searchParams.get("snippetId")!;

  const {
    loading = true,
    error,
    data,
  } = useGetSnippetQuery(
    { snippetId, requireAuth: false },
    { fetchOnRender: true }
  );

  if (loading) {
    return (
      <div className="w-[768px] mx-auto flex items-center justify-center border rounded-lg p-4">
        <Loader className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (!snippetId || error) {
    return (
      <div className="w-[768px] mx-auto flex items-center justify-center border rounded-lg p-4">
        <p>{error ? error.message : "Snippet Not Found"}</p>
      </div>
    );
  }

  if (data) {
    return (
      <div className="w-[768px] mx-auto">
        <EmbedSnippet
          title={data.data.name}
          language={data.data.language}
          code={data.data.code}
          output={data.data.output}
        />
      </div>
    );
  }

  return <div />;
}

export default function () {
  return (
    <Suspense>
      <Embed />
    </Suspense>
  );
}
