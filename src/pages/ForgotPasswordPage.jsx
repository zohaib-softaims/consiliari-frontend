import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../utils/apiClient";
import { forgotPasswordSchema } from "../validations/authValidations";
import { validateForm } from "../utils/validateForm";
import { toast } from "react-toastify";
import AuthHeader from "../components/shared/AuthHeader";
import AuthInputField from "../components/shared/AuthInputField";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      const response = await apiClient.post("/auth/reset-password", { email });
      toast.success(response?.message || "Password reset email sent. Please check your inbox.");
    } catch (err) {
      const errorMessage = err?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <AuthHeader />

      <div className="flex flex-col items-center w-full max-w-md mt-20">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Enter your email</h2>
          <p className="text-gray-600 text-sm">Enter your email so we can send you a recovery email</p>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white rounded-lg shadow-sm border border-[#e2e8f0] p-8 mb-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <AuthInputField
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              error={errors.email}
              required
              placeholder="johnwilliam@gmail.com"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                  Sending Reset Link...
                </div>
              ) : (
                "SEND RESET LINK"
              )}
            </button>
          </form>

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
