import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useVerifyEmailMutation } from "@/api/authApi";

const VerifyEmail = () => {
  const p = useParams();
  const token = p["token"];

  const { trigger, loading, error } = useVerifyEmailMutation();
  const navigate = useNavigate();

  const verifyToken = useCallback(
    async (token: string) => {
      try {
        const res = await trigger({ token });
        toast.success("Email verified successfully", {
          description: "You can now log in",
        });
        navigate("/auth/login");
      } catch (error) {
        toast.error("Failed to verify email", {
          description: JSON.stringify(error),
        });
      }
    },
    [navigate, trigger]
  );

  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-editor-bg p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          {loading ? (
            <>
              <h1 className="text-2xl font-semibold tracking-tight">
                Verifying your email
              </h1>
              <p className="text-sm text-muted-foreground">
                Verifying your account...
              </p>
              <Loader className="animate-spin" />
            </>
          ) : null}

          {error && <pre>{JSON.stringify(error, null, 3)}</pre>}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
