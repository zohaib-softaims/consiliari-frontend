import { useCallback, useState } from "react";
import ProgressBar from "../components/onboarding-components/ProgressBar";
import AuthHeader from "../components/shared/AuthHeader";
import AuthInputField from "../components/shared/AuthInputField";
import SelectInputField from "../components/shared/SelectInputField";
import ButtonGroupField from "../components/shared/ButtonGroupField";
import useOnboardingStore from "../store/onboardingStore";
import { industryOptions, time_in_years, employmentType, promotionBeforeThatOptions } from "../constants/onboardingData";
import { onboardingStep1 } from "../constants/onboardingProgressBarSteps";
import { jobInformationSchema } from "../validations/resumeFormsValidations";
import { validateForm } from "../utils/validateForm";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enUS from "date-fns/locale/en-US";
registerLocale("en-US", enUS);

const OnboardingJobInformationPage = () => {
  const onboardingState = useOnboardingStore((state) => state.onboardingState.resume.job_information);
  const updateSection = useOnboardingStore((state) => state.updateSection);
  const setStep = useOnboardingStore((state) => state.setStep);
  const step = useOnboardingStore((state) => state.step);
  const [errors, setErrors] = useState({});

  // Helper to update a single field in job_information
  const handleFieldChange = useCallback(
    (field, value) => {
      updateSection(`resume.job_information.${field}`, () => value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [updateSection]
  );

  const handleNext = () => {
    const fieldErrors = validateForm(jobInformationSchema, onboardingState);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
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
              error={errors.current_job_title}
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
              error={errors.current_company}
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
              error={errors.industry}
            />
            {/* Time in Current/Most Recent Role */}
            <SelectInputField
              label={"Time in Current/Most Recent Role"}
              name={"time_in_current_role"}
              placeholder="How long have you been in your current or most recent specific position?"
              value={onboardingState.time_in_current_role}
              options={time_in_years}
              onChange={(value) => handleFieldChange("time_in_current_role", value)}
              error={errors.time_in_current_role}
            />
            {/* Employment Type */}
            <SelectInputField
              label={"Employment Type"}
              name={"employment_type"}
              placeholder="What was your employment type?"
              value={onboardingState.employment_type}
              options={employmentType}
              onChange={(value) => handleFieldChange("employment_type", value)}
              error={errors.employment_type}
            />
            {/* Location */}
            <AuthInputField
              label="Location"
              placeholder="Where was this located? (e.g. London, UK)"
              type="text"
              name="location"
              value={onboardingState.location}
              onChange={(e) => handleFieldChange("location", e.target.value)}
              error={errors.location}
              required
            />
            {/* Total Years of Professional Experience */}
            <AuthInputField
              label="Total Years of Professional Experience"
              placeholder="Approximately how many years of professional experience do you have?"
              type="number"
              name="total_years_of_experience"
              value={onboardingState.total_years_of_experience}
              onChange={(e) => handleFieldChange("total_years_of_experience", e.target.value === '' ? '' : parseFloat(e.target.value))}
              error={errors.total_years_of_experience}
              required
            />
            {/* When was the promotion before that */}
            <ButtonGroupField
              label={"When was the promotion before that?"}
              name={"promotion_before_that"}
              value={onboardingState.promotion_before_that}
              options={promotionBeforeThatOptions}
              onChange={(value) => handleFieldChange("promotion_before_that", value)}
              error={errors.promotion_before_that}
            />
            {/* Last Promotion/Significant Role Change */}
            <div className="w-full flex flex-col">
              <label htmlFor="last_promotion_time" className="block text-sm font-bold text-[#020817] mb-1">
                Last Promotion/Significant Role Change
              </label>
              <p className="text-sm text-[#5b5757] mt-2">
                When was your last promotion or significant role change that involved increased responsibility?
              </p>
              <p className="text-sm text-[#5b5757] mb-2">(Approximate Date)</p>
              <DatePicker
                selected={onboardingState.last_promotion_time ? new Date(onboardingState.last_promotion_time) : null}
                onChange={(date) => handleFieldChange("last_promotion_time", date ? date.toISOString().split("T")[0] : "")}
                dateFormat="yyyy-MM-dd"
                placeholderText=""
                className={`w-full bg-[#f8fafc] px-3 py-2 border ${
                  errors.last_promotion_time ? "border-red-500" : "border-[#e2e8f0]"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                locale="en-US"
              />
              {errors.last_promotion_time && <p className="text-red-500 text-xs mt-1">{errors.last_promotion_time}</p>}
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-8">
          <button className="px-6 py-2 rounded bg-gray-200 text-gray-700" onClick={handleBack}>
            Back
          </button>
          <button className="px-6 py-2 rounded bg-[#2f279c] text-white" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingJobInformationPage;
