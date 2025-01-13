import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Landing from "./pages/landing";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import VerifyEmail from "./pages/verify-email";
import SignInWithToken from "./pages/signin-with-token";
import { QuokkaProvider } from "quokkajs";
import { useEffect, useState } from "react";
import MainContext from "./lib/main-context";
import { jwtDecode } from "jwt-decode";
import { User } from "./types";
import { DefaultLanguage } from "./lib/constant";

const App = () => {
  const [lang, setLang] = useState(DefaultLanguage);
  const [code, setCode] = useState(`# Write your code here...`);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ runtime: "10ms", memory: "0MB" });
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      const payload = jwtDecode(token)["user"] as User;
      // the idea step should be to use the user's id
      // to get the user details from the server and update that
      // but this would suffice for now as we don't expect the
      // user's profile to change much
      setUserDetails(payload);
    }
  }, []);

  return (
    <MainContext.Provider
      value={{
        language: lang,
        setLanguage: setLang,
        code,
        setCode,
        output,
        setOutput,
        error,
        setError,
        stats,
        setStats,
        userDetails,
        updateUserDetails: setUserDetails,
      }}
    >
      <QuokkaProvider getState={() => {}}>
        <Toaster richColors={true} position={"bottom-right"} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/editor" element={<Index />} />
            <Route path="/editor/:snippet-id" element={<Index />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/auth/verify-email/:token" element={<VerifyEmail />} />
            <Route
              path="/auth/sign-in-with-token/:token"
              element={<SignInWithToken />}
            />
            <Route
              path="*"
              element={
                <div className="h-screen w-screen flex items-center justify-center">
                  <h1 className="text-5xl font-semibold">404. Not Found!</h1>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </QuokkaProvider>
    </MainContext.Provider>
  );
};

export default App;
