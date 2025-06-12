import GoogleIcon from "../../../public/icons/GoogleIcon";
import LinkedinIcon from "../../../public/icons/LinkedinIcon";
import api from "../../utils/apiClient";
import { toast } from "react-toastify";

const SocialLogins = () => {
  const handleGoogleLogin = async () => {
    try {
      const response = await api.get("/auth/google");
      window.location.href = response?.data?.url;
    } catch (error) {
      toast.error(error?.message || "Failed to initiate Google login.");
    }
  };
  const handleLinkedinLogin = async () => {
    try {
      const response = await api.get("/auth/linkedin");
      window.location.href = response?.data?.url;
    } catch (error) {
      toast.error(error?.message || "Failed to initiate Linkedin login.");
    }
  };

  return (
    <div className="flex flex-row space-x-2">
      <button
        onClick={handleGoogleLogin}
        type="button"
        className="w-full flex items-center justify-center px-4 py-2 border border-[#e2e8f0] rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <GoogleIcon />
        Google
      </button>

      <button
        onClick={handleLinkedinLogin}
        type="button"
        className="w-full flex items-center justify-center px-4 py-2 border border-[#e2e8f0] rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <LinkedinIcon />
        LinkedIn
      </button>
    </div>
  );
};

export default SocialLogins;
