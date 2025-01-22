"use client"

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import Link from "next/link";
import React, {useState} from "react";
import {useRequestPasswordResetMutation} from "@/api/authApi";

const ForgotPassword = () => {
    const {trigger, loading} = useRequestPasswordResetMutation()
    const [email, setEmail] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await trigger(email)
            if (res?.error) {
                toast.error("Failed to request password reset")
            } else {
                toast.success(
                    "If an account exists with this email, you will receive a password reset link."
                );
            }
        } catch {
            toast.error("Failed to request password reset")
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Reset your password
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email address and we'll send you a link to reset your
                        password
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            value={email}
                            onChange={e => setEmail(e.currentTarget.value)}
                            id="email"
                            placeholder="you@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            required
                        />
                    </div>
                    <Button loading={loading} type="submit" className="w-full">
                        Send Reset Link
                    </Button>

                    <div className="text-center text-sm text-foreground">
                        Remember your password?{" "}
                        <Link
                            href="/auth/login"
                            className="text-primary hover:text-primary/90 hover:underline"
                        >
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
