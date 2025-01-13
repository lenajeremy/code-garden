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
            })),
            signInWithToken: builder.mutation<{token: string}, ApiResponse<{token: string}>>(args => ({
                url: `/sign-in-with-token/${args.token}`,
                method: "POST",
            })),
            verifyEmail: builder.mutation<{token: string}, ApiResponse<string>>(args => ({
                url: `/verify-email/${args.token}`,
                method: "POST"
            }))
        }
    },
})


export const {
    useLoginMutation,
    useRegisterMutation,
    useSignInWithTokenMutation,
    useVerifyEmailMutation,
} = authApi.actions