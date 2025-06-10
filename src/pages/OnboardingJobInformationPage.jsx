import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ProgressBar from "../components/onboarding-components/ProgressBar";
import AuthHeader from "../components/shared/AuthHeader";
import AuthInputField from "../components/shared/AuthInputField";
import SelectInputField from "../components/shared/SelectInputField";
import { industries, time_in_years } from "../constants/onboardingData";
const OnboardingJobInformationPage = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    industry: "",
    timeInRole: "",
    employmentType: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <AuthHeader />
      <div className="max-w-3xl mx-auto pt-8 px-6">
        <div className="text-center mt-8 mb-8">
          <div className="text-sm text-[#2f279c] mb-3">Step 1/2</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Your Career Foundation</h2>
        </div>

        <ProgressBar />

        {/* Form Content */}
        <div className="space-y-6 mt-8">
          <div>
            <h3 className="text-xl font-bold text-[#766ee4] mb-1">Job Information</h3>
            <p className="text-sm text-[#737373] mb-6">Fill job related information in the following fields.</p>
          </div>

          <div className="space-y-5">
            {/* Current or Most Recent Job Title */}
            <AuthInputField
              label="Current or Most Recent Job Title"
              placeholder="What is your current or most recent job title?"
              type="text"
              name="current_job_title"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            {/* Current or Most Recent Company */}
            <AuthInputField
              label="Current or Most Recent Company"
              placeholder="What is your current or most recent company?"
              type="text"
              name="current_company"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            {/* Industry */}
            <SelectInputField
              label={"Industry"}
              name={"industry"}
              placeholder="What industry are you in?"
              value={"IT"}
              options={industries}
            />

            {/* Time in Current/Most Recent Role */}
            <SelectInputField
              label={"Time in Current/Most Recent Role"}
              name={"industry"}
              placeholder="How long have you been in your current or most recent specific position?"
              value={""}
              options={time_in_years}
            />

            {/* Employment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
              <div className="relative">
                <select
                  value={formData.employmentType}
                  onChange={(e) => handleInputChange("employmentType", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white text-gray-400"
                >
                  <option value="">What is your employment type?</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                  <option value="internship">Internship</option>
                  <option value="unemployed">Currently Unemployed</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingJobInformationPage;
