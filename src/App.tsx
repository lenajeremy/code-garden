import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Landing from "./pages/landing";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import VerifyEmail from "./pages/verify-email";
import SignInWithToken from "./pages/signin-with-token";

const queryClient = new QueryClient();

const App = () => (
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
            <>
              <h1>404. Not Found!</h1>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
