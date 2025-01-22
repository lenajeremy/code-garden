"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { useResetPasswordMutation } from "@/api/authApi";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get("token") || "";
  const email = searchParams?.get("email");

  const { trigger, loading, error } = useResetPasswordMutation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await trigger({
        newPassword: password,
        confirmNewPassword: confirmPassword,
        validationToken: token,
      });
      if (res?.error) {
        toast.error("Failed to reset password. Try again!", {
          description: res.error,
        });
      }
      toast.success("Password successfully reset!");
      router.replace("/auth/login");
    } catch (error) {
      toast.error("Failed to reset password. Try again!", {
        description: JSON.stringify(error),
      });
    }
  };

  if (!token || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {JSON.stringify(error)}
          </h1>
          <p className="text-sm text-muted-foreground">
            Please request a new password reset link
          </p>
          <Button asChild>
            <Link href="/auth/forgot-password">Request New Link</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Set new password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="email"
              placeholder="you@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
              readOnly={true}
              disabled={true}
              value={email || ""}
            />
          </div>
          <div className="space-y-2">
            <Input
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              id="password"
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              id="confirm-password"
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              required
            />
          </div>
          <Button type="submit" className="w-full" loading={loading}>
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default function ResetPasswordSafe() {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
}
