import { ApiResponse, Snippet } from "@/types";
import { createApi } from "quokkajs";

const codeApi = createApi({
    apiName: "codeApi",
    baseUrl: "http://localhost:3000",
    prepareHeaders(_, headers) {
        const token = localStorage.getItem("TOKEN")
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    },
    endpoints(builder) {
        return {
            createSnippet: builder.mutation<Snippet, ApiResponse<{ public_id: string }>>(args => ({
                url: "/snippet/create",
                method: "POST",
                body: args
            })),
            updateSnippet: builder.mutation<{ id: string } & Snippet, ApiResponse<string>>(({ id, ...body }) => ({
                url: `/snippet/${id}`,
                method: "PUT",
                body,
            })),
            getSnippet: builder.query<string, ApiResponse<Snippet>>(snippetId => ({
                url: `/snippet/${snippetId}`
            }))
        }
    },
})

export const { useCreateSnippetMutation, useUpdateSnippetMutation, useGetSnippetQuery } = codeApi.actions