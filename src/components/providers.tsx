"use client"

import * as React from "react";
import {ThemeProvider} from "next-themes";
import MainContext from "@/lib/main-context";
import {QuokkaProvider} from "quokkajs";
import {Toaster} from "sonner";
import {jwtDecode} from "jwt-decode";
import {User} from "@/types";

export default function Providers({children}: { children: React.ReactNode }) {
    const [userDetails, setUserDetails] = React.useState<User>();
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const token = localStorage.getItem("TOKEN");
        if (token) {
            const payload = jwtDecode(token) satisfies { user: User };
            setUserDetails(payload.user);
        }
        setLoading(false)
    }, []);

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <MainContext.Provider
                value={{
                    loading,
                    userDetails,
                    updateUserDetails: setUserDetails,
                }}
            >
                <QuokkaProvider getState={() => {
                }}>
                    <Toaster richColors position="top-center"/>
                    {children}
                </QuokkaProvider>
            </MainContext.Provider>
        </ThemeProvider>
    );
}
