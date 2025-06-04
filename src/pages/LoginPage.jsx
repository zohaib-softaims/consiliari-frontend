import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import GoogleIcon from "../../public/icons/GoogleIcon";
import LinkedinIcon from "../../public/icons/LinkedinIcon";
import api from "../utils/apiClient";
import { loginSchema } from "../validations/authValidations";
import { validateForm } from "../utils/validateForm";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleGoogleLogin = async () => {
    try {
      const response = await api.get("/auth/google");
      window.location.href = response?.data?.url;
    } catch (error) {
      console.error("Error during Google login initiation:", error);
      toast.error(error.response?.data?.message || "Failed to initiate Google login.");
    }
  };
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

    const fieldErrors = validateForm(loginSchema, formData);
    console.log("field errors", fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await api.post("/auth/login", formData);
      toast.success(response?.message || "Login successful!");
    } catch (error) {
      toast.error(error?.message || "Login failed. Please try again.");
    }
  };
  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col items-center justify-center">
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#2F279C] to-[#766EE4] bg-clip-text text-transparent">
              Consili{"\u0101"}r{"\u012B"}.ai
            </span>
          </h2>
          <p className="text-gray-600 text-sm">Sign in or create an account to accelerate your career growth</p>
        </div>

        {/* Tabs */}
        <div className="w-full max-w-xs flex mb-6 bg-[#f5f5f5] rounded-lg">
          <button className="flex-1 py-2 px-4 text-sm font-medium rounded-md bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white shadow-sm">
            Log in
          </button>
          <Link to="/signup" className="flex-1">
            <button className="w-full py-2 px-4 text-sm font-medium rounded-md text-[#c4c4c3] hover:text-gray-900 transition-colors">
              Sign Up
            </button>
          </Link>
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
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                placeholder=""
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 pr-10 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR CONTINUE WITH</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-row space-x-2">
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <GoogleIcon />
              Google
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <LinkedinIcon />
              LinkedIn
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{" "}
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
