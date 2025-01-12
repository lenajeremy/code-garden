import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSignInWithTokenMutation } from "@/api/authApi";

const SignInWithToken = () => {
  const p = useParams();
  const token = p["token"];

  const navigate = useNavigate();

  const { trigger, loading, error } = useSignInWithTokenMutation();

  const verifyToken = useCallback(
    async (token: string) => {
      try {
        const res = await trigger({ token });
        console.log(res);
        toast.success("Signed in successfully", { description: res.message });
        navigate("/");
      } catch (err) {
        console.log(err);
        toast.error("Error signing in", {
          description: JSON.stringify(err),
        });
      }
    },
    [trigger, navigate]
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
        {loading && (
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Verifying your email
            </h1>
            <p className="text-sm text-muted-foreground">
              Verifying your account...
            </p>

            <Loader className="animate-spin" />
          </div>
        )}

        {error && <pre>{JSON.stringify(error, null, 3)}</pre>}
      </div>
    </div>
  );
};

export default SignInWithToken;
