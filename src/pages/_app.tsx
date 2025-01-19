import { AppProps } from 'next/app';
import { Toaster } from "@/components/ui/sonner";
import { QuokkaProvider } from "quokkajs";
import { useEffect, useState } from "react";
import MainContext from "@/lib/main-context";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types";
import { ThemeProvider } from "next-themes";
import '@/index.css';

export default function App({ Component, pageProps }: AppProps) {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      const payload = jwtDecode(token)["user"] as User;
      setUserDetails(payload);
      console.log(payload);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <MainContext.Provider
        value={{
          userDetails,
          updateUserDetails: setUserDetails,
        }}
      >
        <QuokkaProvider getState={() => {}}>
          <Toaster richColors={true} position={"top-center"} />
          <Component {...pageProps} />
        </QuokkaProvider>
      </MainContext.Provider>
    </ThemeProvider>
  );
}