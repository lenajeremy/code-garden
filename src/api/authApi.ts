import {createApi} from "quokkajs";
import {ApiResponse} from "@/types";

const authApi = createApi({
    // baseUrl: "https://c844-2a02-c206-2241-107-00-1.ngrok-free.app/auth",
    baseUrl: "http://localhost:3000/auth",
    apiName: "authApi",
    endpoints(builder) {
        return {
            loginWithEmail: builder.mutation<{ email: string }, ApiResponse<string>>(args => ({
                url: "/login-with-email",
                method: "POST",
                body: {...args, clientHost: location.origin}
            })),
            loginWithPassword: builder.mutation<{ email: string, password: string }, ApiResponse<{
                token: string
            }>>(args => ({
                url: "/login-with-password",
                method: "POST",
                body: args
            })),
            registerWithEmail: builder.mutation<{ email: string }, ApiResponse<string>>(args => ({
                url: "/register-with-email",
                method: "POST",
                body: {...args, clientHost: location.origin},
            })),
            registerWithPassword: builder.mutation<{ email: string, password: string }, ApiResponse<string>>(args => ({
                url: "/register-with-password",
                method: "POST",
                body: {...args, clientHost: location.origin},
            })),
            signInWithToken: builder.mutation<{ token: string }, ApiResponse<{ token: string }>>(args => ({
                url: `/sign-in-with-token/${args.token}`,
                method: "POST",
            })),
            verifyEmail: builder.mutation<{ token: string }, ApiResponse<string>>(args => ({
                url: `/verify-email/${args.token}`,
                method: "POST"
            })),
            requestPasswordReset: builder.mutation<string, ApiResponse<string>>(email => ({
                url: "/request-password-reset",
                method: "POST",
                body: {
                    email,
                    host: location.origin
                },
            })),
            resetPassword: builder.mutation<{
                confirmNewPassword: string,
                newPassword: string,
                validationToken: string
            }, ApiResponse<string>>(args => ({
                url: "/reset-password",
                method: "POST",
                body: args,
            }))
        }
    },
})


export const {
    useLoginWithEmailMutation,
    useLoginWithPasswordMutation,
    useRegisterWithEmailMutation,
    useRegisterWithPasswordMutation,
    useSignInWithTokenMutation,
    useVerifyEmailMutation,
    useRequestPasswordResetMutation,
    useResetPasswordMutation,
} = authApi.actions