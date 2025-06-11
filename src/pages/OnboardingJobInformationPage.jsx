import { useCallback } from "react";
import { ChevronDown } from "lucide-react";
import ProgressBar from "../components/onboarding-components/ProgressBar";
import AuthHeader from "../components/shared/AuthHeader";
import AuthInputField from "../components/shared/AuthInputField";
import SelectInputField from "../components/shared/SelectInputField";
import ButtonGroupField from "../components/shared/ButtonGroupField";
import useOnboardingStore from "../store/onboardingStore";
import { industryOptions, time_in_years, employmentType, promotionBeforeThatOptions } from "../constants/onboardingData";
import { onboardingStep1 } from "../constants/onboardingProgressBarSteps";

const OnboardingJobInformationPage = () => {
  const onboardingState = useOnboardingStore((state) => state.onboardingState.resume.job_information);
  const updateSection = useOnboardingStore((state) => state.updateSection);

  // Helper to update a single field in job_information
  const handleFieldChange = useCallback(
    (field, value) => {
      updateSection(`resume.job_information.${field}`, () => value);
    },
    [updateSection]
  );

  return (
    <div className="min-h-screen bg-white">
      <AuthHeader />
      <div className="max-w-3xl mx-auto pt-8 px-6">
        <div className="text-center mt-8 mb-8">
          <div className="text-sm text-[#2f279c] mb-3">Step 1/2</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Your Career Foundation</h2>
        </div>

        <ProgressBar steps={onboardingStep1} />

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
              value={onboardingState.current_job_title}
              onChange={(e) => handleFieldChange("current_job_title", e.target.value)}
              required
            />
            {/* Current or Most Recent Company */}
            <AuthInputField
              label="Current or Most Recent Company"
              placeholder="What is your current or most recent company?"
              type="text"
              name="current_company"
              value={onboardingState.current_company}
              onChange={(e) => handleFieldChange("current_company", e.target.value)}
              required
            />
            {/* Industry */}
            <SelectInputField
              label={"Industry"}
              name={"industry"}
              placeholder="In which industry do you/ did you primarily work?"
              value={onboardingState.industry}
              options={industryOptions}
              onChange={(value) => handleFieldChange("industry", value)}
            />
            {/* Time in Current/Most Recent Role */}
            <SelectInputField
              label={"Time in Current/Most Recent Role"}
              name={"time_in_current_role"}
              placeholder="How long have you been in your current or most recent specific position?"
              value={onboardingState.time_in_current_role}
              options={time_in_years}
              onChange={(value) => handleFieldChange("time_in_current_role", value)}
            />
            {/* Employment Type */}
            <SelectInputField
              label={"Employment Type"}
              name={"employment_type"}
              placeholder="What was your employment type?"
              value={onboardingState.employment_type}
              options={employmentType}
              onChange={(value) => handleFieldChange("employment_type", value)}
            />
            {/* Location */}
            <AuthInputField
              label="Location"
              placeholder="Where was this located? (e.g. London, UK)"
              type="text"
              name="location"
              value={onboardingState.location}
              onChange={(e) => handleFieldChange("location", e.target.value)}
              required
            />
            {/* Total Years of Professional Experience */}
            <AuthInputField
              label="Total Years of Professional Experience"
              placeholder="Approximately how many years of professional experience do you have?"
              type="number"
              name="total_years_of_experience"
              value={onboardingState.total_years_of_experience}
              onChange={(e) => handleFieldChange("total_years_of_experience", e.target.value)}
              required
            />
            {/* When was the promotion before that */}
            <ButtonGroupField
              label={"When was the promotion before that?"}
              name={"promotion_before_that"}
              value={onboardingState.promotion_before_that}
              options={promotionBeforeThatOptions}
              onChange={(value) => handleFieldChange("promotion_before_that", value)}
            />
            {/* Last Promotion/Significant Role Change */}
            <AuthInputField
              label="Last Promotion/Significant Role Change"
              placeholder="When was your last promotion or significant role change that involved increased responsibility? (approximate date)"
              type="text"
              name="last_promotion_time"
              value={onboardingState.last_promotion_time}
              onChange={(e) => handleFieldChange("last_promotion_time", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex justify-between mb-8">
          <button className="px-6 py-2 rounded bg-gray-200 text-gray-700">Back</button>
          <button className="px-6 py-2 rounded bg-[#2f279c] text-white">Next</button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingJobInformationPage;
