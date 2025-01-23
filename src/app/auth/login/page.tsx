"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  useLoginWithEmailMutation,
  useLoginWithPasswordMutation,
} from "@/api/authApi";
import { User } from "@/types";
import { jwtDecode } from "jwt-decode";
import MainContext from "@/lib/main-context";
import { useRouter } from "next/navigation";
import { errorDescription } from "@/lib/utils";

const Login = () => {
  const [isEmail, setIsEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUserDetails } = useContext(MainContext);
  const router = useRouter();

  const { trigger: loginWithEmail, loading: loadingWithEmail } =
    useLoginWithEmailMutation();
  const { trigger: loginWithPassword, loading: loadingWithPassword } =
    useLoginWithPasswordMutation();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      if (isEmail) {
        await loginWithEmail({ email });
        toast.success("Mail sent", {
          description: "Check your email to log in",
        });
      } else {
        const res = await loginWithPassword({ email, password });
        if (res) {
          localStorage.setItem("TOKEN", res.data.token);
          const payload = jwtDecode(res.data.token) satisfies { user: User };
          updateUserDetails(payload.user);
          toast.success("Signed in successfully", { description: res.message });
          router.replace("/editor");
        }
      }
    } catch (err) {
      toast.error("Login error", { description: errorDescription(err) });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={() => setIsEmail(!isEmail)}
          >
            Continue with {!isEmail ? "email" : "password"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Input
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                id="email"
                placeholder="you@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                required
              />
            </div>
            {!isEmail && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </div>

                <div className="flex items-center justify-end">
                  <Button
                    variant="link"
                    className="px-0 font-normal text-xs text-muted-foreground hover:text-primary"
                    asChild
                  >
                    <Link href="/auth/forgot-password">Forgot Password?</Link>
                  </Button>
                </div>
              </div>
            )}

            <Button
              className="w-full bg-primary hover:bg-primary/90"
              loading={loadingWithEmail || loadingWithPassword}
            >
              Sign In
            </Button>
          </form>

          <div className="text-center text-sm text-foreground">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-primary hover:text-primary/90 hover:underline"
            >
              Sign Up Now
            </Link>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="hover:text-primary underline underline-offset-4"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="hover:text-primary underline underline-offset-4"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
