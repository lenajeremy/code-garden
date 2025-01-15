import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { useSignInWithTokenMutation } from "@/api/authApi";
import { jwtDecode } from "jwt-decode";
import MainContext from "@/lib/main-context";
import { User } from "@/types";


const SignInWithToken = () => {
  const p = useParams();
  const token = p["token"];

  const navigate = useNavigate();

  const { trigger, loading, error } = useSignInWithTokenMutation();
  const { updateUserDetails } = useContext(MainContext);

  const signInWithToken = useCallback(
    async (token: string) => {
      try {
        const res = await trigger({ token });
        localStorage.setItem("TOKEN", res.data.token);
        const payload = jwtDecode(res.data.token) satisfies { user: User };
        updateUserDetails(payload.user);
        toast.success("Signed in successfully", { description: res.message });

        navigate("/editor");
      } catch (err) {
        console.log(err);
        toast.error(err.message, {
          description: err.error,
        });
      }
    },
    [trigger, updateUserDetails, navigate]
  );

  useEffect(() => {
    if (token) {
      signInWithToken(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-editor-bg p-4">
      <div className="w-full max-w-md space-y-8">
        {loading && (
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Signing you in
            </h1>
            <p className="text-sm text-muted-foreground">Please wait...</p>

            <Loader className="animate-spin" />
          </div>
        )}

        {error && (
          <pre>{JSON.stringify({ error, name: "jeremiah" }, null, 3)}</pre>
        )}
        {<pre>{JSON.stringify({ error, loading })}</pre>}
      </div>
    </div>
  );
};

export default SignInWithToken;
