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
import { ThemeProvider } from "next-themes";
import ProtectedRoute from "./components/protected-route";

const App = () => {
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      const payload = jwtDecode(token)["user"] as User;
      setUserDetails(payload);
    }
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <MainContext.Provider
        value={{
          userDetails,
          updateUserDetails: setUserDetails,
        }}
      >
        <QuokkaProvider getState={() => {}}>
          <Toaster richColors={true} position={"bottom-right"} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/editor"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/editor/:snippet-id"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route
                path="/auth/forgot-password"
                element={<ForgotPassword />}
              />
              <Route path="/auth/reset-password" element={<ResetPassword />} />
              <Route
                path="/auth/verify-email/:token"
                element={<VerifyEmail />}
              />
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
    </ThemeProvider>
  );
};

export default App;
