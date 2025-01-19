"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from "react";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter()
  const token = searchParams?.get('token');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would verify the token and update the password
    toast.success("Password successfully reset!");
    router.replace('/auth/login');
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Invalid or expired link</h1>
          <p className="text-sm text-muted-foreground">
            Please request a new password reset link
          </p>
          <Button asChild>
            <Link href="/forgot-password">Request New Link</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Set new password</h1>
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
            />
          </div>
          <div className="space-y-2">
            <Input
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
              id="confirm-password"
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              required
            />
          </div>
          <Button type="submit" className="w-full">
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
  )
};