import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "../../public/icons/GoogleIcon";
import LinkedinIcon from "../../public/icons/LinkedinIcon";
import { signupSchema } from "../validations/authValidations";
import { validateForm } from "../utils/validateForm";
import { toast } from "react-toastify";
import apiClient from "../utils/apiClient";
import AuthHeader from "../components/shared/AuthHeader";
import AuthInputField from "../components/shared/AuthInputField";
import PasswordInputField from "../components/shared/PasswordInputField";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
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
    const fieldErrors = validateForm(signupSchema, formData);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await apiClient.post("/auth/signup", formData);
      toast.success(response?.message || "Signup successful");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <AuthHeader />

      <div className="flex flex-col items-center w-full max-w-md mt-20">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#2F279C] to-[#766EE4] bg-clip-text text-transparent">
              Consili{"\u0101"}r{"\u012B"}.ai
            </span>
          </h2>
          <p className="text-gray-600 text-sm">Sign in or create an account to accelerate your career growth</p>
        </div>

        {/* Tabs */}
        <div className="w-full max-w-3xs flex mb-6 bg-[#f5f5f5] rounded-lg">
          <Link to="/login" className="flex-1">
            <button className="w-full py-2 px-4 text-sm font-medium rounded-md text-[#c4c3c3] hover:text-gray-900 transition-colors">
              Log in
            </button>
          </Link>
          <button className="flex-1 py-2 px-4 text-sm font-medium rounded-md bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white shadow-sm">
            Sign Up
          </button>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white rounded-lg shadow-sm border border-[#e2e8f0] p-8 mb-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <AuthInputField
              label="Full Name"
              placeholder="John William"
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              error={errors.full_name}
              required
            />
            <AuthInputField
              label="Email"
              placeholder="johnwilliam@gmail.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              required
            />
            <PasswordInputField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Create a Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-[#737373]">OR CONTINUE WITH</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-row space-x-2">
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-[#e2e8f0] rounded-md  text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <GoogleIcon />
              Google
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-[#e2e8f0] rounded-md  text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <LinkedinIcon />
              LinkedIn
            </button>
          </div>

          {/* Terms of Service */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[#737373]">
              By creating an account, you agree to our <br />
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
