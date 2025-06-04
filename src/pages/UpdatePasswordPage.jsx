import { useState } from "react";
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
  const [errors, setErrors] = useState({});

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
    const callbackUrl = window.location.href;
    if (!callbackUrl) {
      toast.error("Cannot reset password");
      return;
    }

    const fieldErrors = validateForm(resetPasswordSchema, formData);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
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
      }
    } catch (err) {
      const errorMessage = err?.message || "An error occurred while resetting password.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <AuthHeader />

      <div className="flex flex-col items-center w-full max-w-md mt-20">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Reset Your Password</h2>
          <p className="text-gray-600 text-sm">Enter your new password below.</p>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white rounded-lg shadow-sm border border-[#e2e8f0] p-8 mb-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <PasswordInputField
              label="New Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              required
            />

            <PasswordInputField
              label="Confirm New Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              required
            />
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
