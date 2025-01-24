"use client";

import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useVerifyEmailMutation } from "@/api/authApi";
import { errorDescription } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const VerifyEmail = () => {
  const p = useParams()!;
  const token = p["token"] as string;

  const { trigger, loading, error } = useVerifyEmailMutation();
  const router = useRouter();

  const verifyToken = useCallback(
    async (token: string) => {
      try {
        await trigger({ token });
        toast.success("Email verified successfully", {
          description: "You can now log in",
        });
        router.replace("/auth/login");
      } catch (error) {
        toast.error("Failed to verify email", {
          description: errorDescription(error),
        });
      }
    },
    [router, trigger]
  );

  useEffect(() => {
    (async function () {
      if (token) {
        await verifyToken(token);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
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
              <Loader className="animate-spin w-4 h-4" />
            </>
          ) : null}

          {error && (
            <div className="flex">
              <h1>{errorDescription(error)}</h1>
              <Button asChild>
                <Link href={"/auth/login"}>To Login</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
