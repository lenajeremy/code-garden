import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";

const VerifyEmail = () => {
  const p = useParams();
  const token = p["token"];

  const navigate = useNavigate();

  const verifyToken = useCallback(
    (token: string) => {
      fetch("http://localhost:3000/auth/verify-email/" + token, {
        method: "POST",
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.status >= 200 && data.status <= 299) {
            toast.success("Email Verified Successfully", {
              description: "You can now log in",
            });
            navigate("/auth/login");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to verify email", {
            description: JSON.stringify(err),
          });
        });
    },
    [navigate]
  );

  useEffect(() => {
    if (token) {
      console.log(token);
      verifyToken(token);
    }
  }, [token, verifyToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-editor-bg p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Verifying your email
          </h1>
          <p className="text-sm text-muted-foreground">
            Verifying your account...
          </p>

          <Loader className="animate-spin" />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
