import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AuthCallback from "./pages/AuthCallback";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";
import OnboardingPage from "./pages/OnboardingPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Hello</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth/google/callback" element={<AuthCallback />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset-password" element={<UpdatePasswordPage />} />
          <Route path="/auth/confirm-email" element={<ConfirmEmailPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
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
