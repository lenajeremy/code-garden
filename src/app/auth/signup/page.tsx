"use client"

import {
  useRegisterWithEmailMutation,
  useRegisterWithPasswordMutation,
} from "@/api/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiResponse } from "@/types";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

const SignUp = () => {
  const [isEmail, setIsEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { trigger: registerWithEmail, loading: loadingWithEmail } =
    useRegisterWithEmailMutation();
  const { trigger: registerWithPassword, loading: loadingWithPassword } =
    useRegisterWithPasswordMutation();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      let res: ApiResponse<string> | undefined;
      if (isEmail) {
        res = await registerWithEmail({ email });
      } else {
        res = await registerWithPassword({ email, password });
      }

      toast.success("Mail sent", { description: res?.message });
      console.log(res);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      toast.error(err.message, { description: err.error });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Get started with your account
          </p>
        </div>

        <div className="space-y-4">
          {/*<Button variant="outline" className="w-full justify-center gap-2">*/}
          {/*  <Github className="h-4 w-4" />*/}
          {/*  Sign up with GitHub*/}
          {/*</Button>*/}

          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={() => setIsEmail(!isEmail)}
          >
            Sign up with {!isEmail ? "email" : "password"}
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
                id="email"
                placeholder="you@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                value={email}
                required
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </div>
            {!isEmail && (
              <div className="space-y-2">
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
            )}

            <Button
              className="w-full bg-primary hover:bg-primary/90"
              loading={loadingWithEmail || loadingWithPassword}
            >
              Create Account
            </Button>
          </form>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:text-primary/90 hover:underline"
            >
              Sign In
            </Link>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
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

export default SignUp;
