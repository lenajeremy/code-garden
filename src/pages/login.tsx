import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import * as q from "quokkajs";
import { useLoginMutation } from "@/api/authApi";

const Login = () => {
  const [isEmail, setIsEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { trigger, loading } = useLoginMutation();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (isEmail) {
      try {
        const res = await trigger({ email });
        toast.success("Mail sent", {
          description: "Check your email to log in",
        });
        console.log(res);
      } catch (err) {
        toast.error("Login error", { description: JSON.stringify(err) });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-editor-bg p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account
          </p>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-center gap-2">
            <Github className="h-4 w-4" />
            Continue with GitHub
          </Button>

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
              <span className="bg-editor-bg px-2 text-muted-foreground">
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
                  />
                </div>

                <div className="flex items-center justify-end">
                  <Button
                    variant="link"
                    className="px-0 font-normal text-xs text-muted-foreground hover:text-primary"
                    asChild
                  >
                    <Link to="/auth/forgot-password">Forgot Password?</Link>
                  </Button>
                </div>
              </div>
            )}

            <Button className="w-full bg-primary hover:bg-primary/90" loading={loading}>
              Sign In
            </Button>
          </form>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
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
