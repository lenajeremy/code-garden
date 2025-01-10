import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-editor-bg p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Get started with your account
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-center gap-2"
          >
            <Github className="h-4 w-4" />
            Sign up with GitHub
          </Button>

          <Button
            variant="outline"
            className="w-full justify-center"
          >
            Sign up with SSO
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-editor-bg px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                id="name"
                placeholder="Full Name"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect="off"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                placeholder="you@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Create Account
            </Button>
          </div>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:text-primary/90 hover:underline"
            >
              Sign In
            </Link>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <a href="#" className="hover:text-primary underline underline-offset-4">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="hover:text-primary underline underline-offset-4">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;