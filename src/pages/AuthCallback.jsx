import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient"; // Assuming apiClient is set up here

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      // Get the full callback URL
      const callbackUrl = window.location.href;

      if (callbackUrl) {
        try {
          // Send the full callback URL to your backend
          const response = await apiClient.post("/auth/google/callback", {
            url: callbackUrl,
          });

          // Assuming your backend returns a success status and potentially user info
          if (response.success) {
            console.log("Login successful:", response.data.message);
            // No need to store tokens/user info client-side if using HTTP-only cookies

            // Redirect to dashboard or home page
            navigate("/"); // Or wherever you want to redirect
          } else {
            // Handle backend errors or unsuccessful login
            console.error("Backend login failed:", response.data);
            navigate("/login"); // Redirect to login on failure
          }
        } catch (error) {
          console.error("Error processing callback:", error);
          // You might want to show a user-friendly error message
          navigate("/login"); // Redirect to login on error
        }
      } else {
        // Should not happen if redirected from Google, but as a fallback
        console.error("No callback URL available");
        navigate("/login"); // Redirect to login on failure
      }
    };

    handleCallback();
  }, [navigate]);

  // You can render a loading message while processing
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p>Processing login...</p>
    </div>
  );
}

export default AuthCallback;
