import { BASE_URL } from "@/lib/constant";
import { ApiResponse, Snippet } from "@/types";
import { createApi } from "quokkajs";

const codeApi = createApi({
    apiName: "codeApi",
    baseUrl: BASE_URL,
    prepareHeaders(_, headers) {
        const token = localStorage.getItem("TOKEN")
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    },
    endpoints(builder) {
        return {
            createSnippet: builder.mutation<Omit<Snippet, "id" | "publicId">, ApiResponse<Snippet>>(args => ({
                url: "/snippet/create",
                method: "POST",
                body: args
            })),
            updateSnippet: builder.mutation<Omit<Snippet, "id">, ApiResponse<Snippet>>(({ publicId, ...body }) => ({
                url: `/snippet/${publicId}`,
                method: "PUT",
                body,
            })),
            deleteSnippet: builder.mutation<string, ApiResponse<Snippet>>(snippetId => ({
                url: `/snippet/${snippetId}`,
                method: "DELETE"
            })),
            getSnippet: builder.query<string, ApiResponse<Snippet>>(snippetId => ({
                url: `/snippet/${snippetId}`
            })),
            getUserSnippet: builder.query<void, ApiResponse<{ total: number, snippets: Array<Snippet> }>>(() => ({
                url: "/snippets/mine",
                method: "GET"
            })),
            // runUnsafe: builder.mutation<Omit<Snippet, "output">, ApiResponse<string>>(args => ({
            //     url: "/run-unsafe",
            //     method: "POST",
            //     body: args
            // })),
            runSafe: builder.mutation<{ code: string, language: string }, ApiResponse<string>>(args => ({
                url: "/code-runner",
                method: "POST",
                body: args
            }))
        }
    },
})

export const {
    useCreateSnippetMutation,
    useUpdateSnippetMutation,
    useGetSnippetQuery,
    useDeleteSnippetMutation,
    useRunSafeMutation,
    useGetUserSnippetQuery,
} = codeApi.actions