import MainContext from "@/lib/main-context";
import { ReactNode, useContext, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { userDetails } = useContext(MainContext);

  useEffect(() => {
    console.log(userDetails)
    if (!userDetails) {
      navigate("/auth/login");
    }
    setLoading(false);
  }, [navigate, userDetails]);

  if (loading) {
    return <></>;
  } else {
    return children;
  }
}
