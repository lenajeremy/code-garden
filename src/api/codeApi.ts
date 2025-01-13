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

        }
    },
})