"use client";

import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";
import { useSignInWithTokenMutation } from "@/api/authApi";
import { jwtDecode } from "jwt-decode";
import MainContext from "@/lib/main-context";
import { User } from "@/types";
import { errorDescription } from "@/lib/utils";

const SignInWithToken = () => {
  const p = useParams()!;
  const token = p["token"] as string;

  const router = useRouter();

  const { trigger, loading, error } = useSignInWithTokenMutation();
  const { updateUserDetails } = useContext(MainContext);

  const signInWithToken = useCallback(
    async (token: string) => {
      try {
        const res = await trigger({ token });
        if (res) {
          localStorage.setItem("TOKEN", res.data.token);
          const payload = jwtDecode(res.data.token) satisfies { user: User };
          updateUserDetails(payload.user);
          toast.success("Signed in successfully", { description: res.message });

          router.replace("/editor");
        }
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        toast.error(err.message, { description: err.error });
      }
    },
    [trigger, updateUserDetails, router]
  );

  useEffect(() => {
    (async function () {
      if (token) {
        await signInWithToken(token);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {loading && (
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Signing you in
            </h1>
            <div className="flex gap-4">
              <Loader className="animate-spin h-4 w-4" />
              <p className="text-sm text-muted-foreground">Please wait...</p>
            </div>
          </div>
        )}

        {error && <h1>{errorDescription(error)}</h1>}
      </div>
    </div>
  );
};

export default SignInWithToken;
