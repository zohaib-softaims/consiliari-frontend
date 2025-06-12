import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AuthCallback from "./pages/AuthCallback";
import LinkedinAuthCallback from "./pages/LinkedAuthCallback";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";
import OnboardingPage from "./pages/OnboardingPage";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth/google/callback" element={<AuthCallback />} />
          <Route path="/auth/linkedin/callback" element={<LinkedinAuthCallback />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset-password" element={<UpdatePasswordPage />} />
          <Route path="/auth/confirm-email" element={<ConfirmEmailPage />} />
          <Route path="/" element={<ProtectedRoute children={<h1>Hello Consiliari</h1>} />} />
          <Route path="/onboarding" element={<ProtectedRoute children={<OnboardingPage />} />} />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
