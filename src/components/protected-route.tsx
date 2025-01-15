import { ReactNode, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/auth/login");
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-background">
        <p>Loading...</p>
      </div>
    );
  } else {
    return children;
  }
}
