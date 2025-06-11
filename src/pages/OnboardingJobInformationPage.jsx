import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ProgressBar from "../components/onboarding-components/ProgressBar";
import AuthHeader from "../components/shared/AuthHeader";
import AuthInputField from "../components/shared/AuthInputField";
import SelectInputField from "../components/shared/SelectInputField";
import { industries, time_in_years } from "../constants/onboardingData";
import ButtonGroupField from "../components/shared/ButtonGroupField";
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
        <div className="space-y-6 mt-8 mb-8">
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

            {/* When was the promotion before that */}
            <ButtonGroupField
              label={"When was the promotion before that"}
              name={"promotion"}
              value={"7-12 months"}
              options={["1-6 months", "7-12 months", "1-2 years", "2+ years"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingJobInformationPage;
