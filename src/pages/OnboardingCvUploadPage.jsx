import { useState } from "react";
import ProgressBar from "../components/onboarding-components/ProgressBar";
import AuthHeader from "../components/shared/AuthHeader";
import { onboardingStep1 } from "../constants/onboardingProgressBarSteps";
import apiClient from "../utils/apiClient";
import LoaderIcon from "../../public/icons/LoaderIcon";

const OnboardingCvUploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      await uploadFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploading(true);
      await uploadFile(file);
    }
    e.target = "";
  };

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("cv", file);
      const response = await apiClient.post("/onboarding/parse-cv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("cv response", response);
    } catch (error) {
      console.log("cv error", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AuthHeader />
      <div className="max-w-3xl mx-auto pt-8 px-6">
        <div className="text-center mt-8 mb-8">
          <div className="text-sm text-[#2f279c] mb-3">Step 1/2</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Your Career Foundation</h2>
        </div>

        <ProgressBar steps={onboardingStep1} />

        {/* Upload Content */}
        <div className="space-y-6 mt-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-[#766ee4] mb-1">Upload Your Resume</h3>
            <p className="text-sm text-[#737373] mb-6">Get started by uploading your current resume</p>
          </div>

          <div
            className={`w-full bg-[#f8fafc] border-2 ${
              dragActive ? "border-[#766ee4]" : "border-[#e2e8f0]"
            } border-dashed rounded-lg flex flex-col items-center justify-center py-16 cursor-pointer transition-all`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("cv-upload-input").click()}
          >
            <input id="cv-upload-input" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
            {uploading ? (
              <div className="flex flex-col items-center justify-center">
                <LoaderIcon />
                <p className="text-xs text-[#737373] mt-2">Uploading your resume...</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg font-bold text-[#2f279c]">Upload Your Resume</p>
                <p className="text-xs text-[#2f279c]/39 mt-2">Drag and Drop here</p>
              </div>
            )}
          </div>

          <div className="text-center mt-4">
            <p className="text-xs text-[#737373]">Don't have a resume?</p>
            <span className="text-xs text-[#2f279c] underline cursor-pointer">Continue with manual input instead</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCvUploadPage;
