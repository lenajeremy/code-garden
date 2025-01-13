import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import VerifyEmail from "./pages/verify-email";
import SignInWithToken from "./pages/signin-with-token";
import { ThemeProvider } from "./lib/theme-context";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;