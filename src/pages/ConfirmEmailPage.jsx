import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../utils/apiClient";
import AuthHeader from "../components/shared/AuthHeader";

function ConfirmEmailPage() {
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const callbackUrl = window.location.href;
        await apiClient.post("/auth/confirm-email", {
          url: callbackUrl,
        });
        setConfirmed(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch {
        setConfirmed(false);
      } finally {
        setLoading(false);
      }
    };

    confirmEmail();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <AuthHeader />

      <div className="flex flex-col items-center w-full max-w-md mt-20">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Email Confirmation</h2>
          <p className="text-gray-600 text-sm">We're confirming your email address</p>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white rounded-lg shadow-sm border border-[#e2e8f0] p-8 mb-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-8 h-8 border-t-2 border-[#2F279C] border-solid rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Confirming your email...</p>
            </div>
          ) : confirmed ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Email Confirmed!</h3>
              <p className="text-gray-600 mb-4">Your email has been successfully confirmed. Redirecting to login...</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Confirmation Failed</h3>
              <p className="text-gray-600 mb-4">The confirmation link is invalid or has expired.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmailPage;
