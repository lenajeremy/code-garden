import React from "react"
import Index from "@/components/Index";
import ProtectedRoute from "@/components/protected-route";

export default function Layout({children}: { children: React.ReactElement }) {
    return (
        <ProtectedRoute>
            <Index>
                <div className="h-[calc(100vh-82px)] pt-4">
                    {children}
                </div>
            </Index>
        </ProtectedRoute>
    )
}