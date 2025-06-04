import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const callbackUrl = window.location.href;
      if (callbackUrl) {
        try {
          const response = await apiClient.post("/auth/google/callback", {
            url: callbackUrl,
          });
          if (response.success) {
            navigate("/");
          }
        } catch {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };
    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p>Processing login...</p>
    </div>
  );
}

export default AuthCallback;
