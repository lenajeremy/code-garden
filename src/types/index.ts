export type User = {
    createdAt: Date
    deletedAt: Date | null
    email: string
    emailVerified: boolean
    emailVerifiedAt: boolean
    firstName: string
    lastName: string
    id: string
    updatedAt: string
}

export type ApiResponse<T> = {
    data: T,
    error: string,
    status: number,
    message: string
}

export type Snippet = {
    id?: number | string;
    name: string;
    code: string;
    language: string;
    output: string;
}