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
            getSnippet: builder.query<{ snippetId: string, requireAuth?: boolean }, ApiResponse<Snippet>>(({ snippetId, requireAuth }) => ({
                url: `/snippet/${snippetId}${!requireAuth ? "/no-auth" : ""}`
            })),
            forkSnippet: builder.mutation<string, ApiResponse<Snippet>>(snippetId => ({
                url: `/snippet/${snippetId}/fork`,
                method: "POST",
            })),
            getUserSnippet: builder.query<void, ApiResponse<{ total: number, snippets: Array<Snippet> }>>(() => ({
                url: "/snippets/mine",
                method: "GET"
            })),
            runSafe: builder.mutation<{ code: string, language: string, requireAuth?: boolean }, ApiResponse<string>>(({ requireAuth, ...args }) => ({
                url: `/code-runner${!requireAuth ? "/no-auth" : ""}`,
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
    useForkSnippetMutation,
} = codeApi.actions