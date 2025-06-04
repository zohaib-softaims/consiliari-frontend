import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient"; // Assuming apiClient is set up here
import { resetPasswordSchema } from "../validations/authValidations"; // Import updated reset password schema
import { validateForm } from "../utils/validateForm"; // Import validateForm utility
import { toast } from "react-toastify"; // Import toast

function UpdatePasswordPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [callbackUrl, setCallbackUrl] = useState(null); // State to store the full callback URL
  const [errors, setErrors] = useState({}); // State to hold validation errors
  const [loading, setLoading] = useState(true); // Loading state while capturing URL

  // Capture full callback URL on component mount
  useEffect(() => {
    const url = window.location.href;
    if (url) {
      setCallbackUrl(url);
      setLoading(false);
    } else {
      toast.error("Password reset link is invalid or expired."); // Use toast for immediate feedback
      setLoading(false);
      // Optionally redirect after showing error
      // setTimeout(() => navigate('/forgot-password'), 3000);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear validation error for the field on input change
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    // Clear message and error states related to API calls before new submission
    // setMessage(''); // If you had a message state for success
    // setError(''); // Removed direct error state management, relying on toast and field errors

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

    // If validation passes, call the backend API with URL and new password
    try {
      const response = await apiClient.post("/auth/reset-password-confirm", {
        url: callbackUrl,
        newPassword: formData.password,
      });

      if (response.success) {
        toast.success(response?.message || "Your password has been reset successfully. Redirecting to login...");
        // Redirect to login page after a short delay
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
      <div className="fixed top-0 left-0 ml-8 p-3">
        <span className="bg-gradient-to-r from-[#2F279C] to-[#766EE4] bg-clip-text text-3xl font-bold text-transparent">
          Consili{"\u0101"}r{"\u012B"}.ai
        </span>
      </div>

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
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

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
