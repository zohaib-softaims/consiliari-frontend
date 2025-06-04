import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient";
import { resetPasswordSchema } from "../validations/authValidations";
import { validateForm } from "../utils/validateForm";
import { toast } from "react-toastify";
import AuthHeader from "../components/shared/AuthHeader";
import PasswordInputField from "../components/shared/PasswordInputField";

function UpdatePasswordPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [callbackUrl, setCallbackUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = window.location.href;
    if (url) {
      setCallbackUrl(url);
      setLoading(false);
    } else {
      toast.error("Password reset link is invalid or expired.");
      setLoading(false);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!callbackUrl) {
      toast.error("Cannot reset password: Callback URL is missing.");
      return;
    }

    const fieldErrors = validateForm(resetPasswordSchema, formData);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      const response = await apiClient.post("/auth/reset-password-confirm", {
        url: callbackUrl,
        newPassword: formData.password,
      });

      if (response.success) {
        toast.success(response?.message || "Your password has been reset successfully. Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        const backendError = response?.message || "Failed to reset password.";
        toast.error(backendError);
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      const errorMessage = err?.message || "An error occurred while resetting password.";
      toast.error(errorMessage);
    }
  };

  // Show loading if URL is not captured immediately
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  // Render the form if URL is captured and no major error occurred
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* Logo */}
      <AuthHeader />

      {/* Centered Content Wrapper */}
      <div className="flex flex-col items-center w-full max-w-md mt-20">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Reset Your Password</h2>
          <p className="text-gray-600 text-sm">Enter your new password below.</p>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* New Password */}
            <PasswordInputField
              label="New Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              required
            />

            {/* Confirm Password */}
            <PasswordInputField
              label="Confirm New Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              required
            />

            {/* General API Error Display below form - only show if no specific field errors */}
            {/* Removed direct error state display here, relying on toast and field-specific errors */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              RESET PASSWORD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePasswordPage;
