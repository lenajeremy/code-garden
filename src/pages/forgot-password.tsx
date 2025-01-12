import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would trigger a password reset email
    toast.success("If an account exists with this email, you will receive a password reset link.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-editor-bg p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Reset your password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password
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
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>

          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link
              to="/login"
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