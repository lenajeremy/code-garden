import { createApi } from "quokkajs";

type ApiResponse<T> = {
    data: T,
    error: string,
    status: number,
    message: string
}

const authApi = createApi({
    baseUrl: "http://localhost:3000/auth",
    apiName: "authApi",
    endpoints(builder) {
        return {
            login: builder.mutation<{ email: string }, ApiResponse<string>>((args) => ({
                url: "/login-with-email",
                method: "POST",
                body: args
            })),
            register: builder.mutation<{email: string}, ApiResponse<string>>(args => ({
                url: "/register-with-email",
                method: "POST",
                body: args,
            }))
        }
    },
})


export const {
    useLoginMutation,
    useRegisterMutation,
} = authApi.actions