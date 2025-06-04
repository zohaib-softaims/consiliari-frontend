import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../utils/apiClient";
import { forgotPasswordSchema } from "../validations/authValidations";
import { validateForm } from "../utils/validateForm";
import { toast } from "react-toastify";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const fieldErrors = validateForm(forgotPasswordSchema, { email });
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      const response = await apiClient.post("/auth/reset-password", { email });
      toast.success(response?.message || "Password reset email sent. Please check your inbox.");
    } catch (err) {
      const errorMessage = err?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

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
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Forgot Your Password?</h2>
          <p className="text-gray-600 text-sm">Enter your email address to receive a reset link.</p>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                placeholder="Your email address"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              SEND RESET LINK
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-indigo-600 hover:text-indigo-500">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
