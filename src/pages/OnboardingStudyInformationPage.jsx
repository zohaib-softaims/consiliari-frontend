import { useCallback } from "react";
import ProgressBar from "../components/onboarding-components/ProgressBar";
import AuthHeader from "../components/shared/AuthHeader";
import AuthInputField from "../components/shared/AuthInputField";
import SelectInputField from "../components/shared/SelectInputField";
import ButtonGroupField from "../components/shared/ButtonGroupField";
import useOnboardingStore from "../store/onboardingStore";
import { educationLevelOptions, relevanceOfEducationOptions } from "../constants/onboardingData";
import { onboardingStep1 } from "../constants/onboardingProgressBarSteps";

const OnboardingStudyInformationPage = () => {
  const studyState = useOnboardingStore((state) => state.onboardingState.resume.study_information);
  const updateSection = useOnboardingStore((state) => state.updateSection);
  const setStep = useOnboardingStore((state) => state.setStep);
  const step = useOnboardingStore((state) => state.step);

  // Helper to update a single field in study_information
  const handleFieldChange = useCallback(
    (field, value) => {
      updateSection(`resume.study_information.${field}`, () => value);
    },
    [updateSection]
  );

  // Certificates list handlers
  const handleCertificateChange = (idx, value) => {
    const newList = [...(studyState.certificates_list || [])];
    newList[idx] = value;
    handleFieldChange("certificates_list", newList);
  };
  const handleAddCertificate = () => {
    handleFieldChange("certificates_list", [...(studyState.certificates_list || []), ""]);
  };
  const handleRemoveCertificate = (idx) => {
    const newList = [...(studyState.certificates_list || [])];
    newList.splice(idx, 1);
    handleFieldChange("certificates_list", newList);
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
            <h3 className="text-xl font-bold text-[#766ee4] mb-1">Study & Certifications</h3>
            <p className="text-sm text-[#737373] mb-6">Fill study related information in the following fields.</p>
          </div>

          <div className="space-y-5">
            {/* Highest Level of Education Completed */}
            <SelectInputField
              label="Highest Level of Education Completed"
              name="highest_level_of_education"
              placeholder="What is your highest level of formal education completed?"
              value={studyState.highest_level_of_education}
              options={educationLevelOptions}
              onChange={(value) => handleFieldChange("highest_level_of_education", value)}
              required
            />
            {/* Field of Study */}
            <AuthInputField
              label="Field of Study"
              placeholder="What was your major or field of study?"
              type="text"
              name="field_of_study"
              value={studyState.field_of_study}
              onChange={(e) => handleFieldChange("field_of_study", e.target.value)}
              required
            />
            {/* Institution Name */}
            <AuthInputField
              label="Institution Name"
              placeholder="What is the name of the institution where you completed your highest education?"
              type="text"
              name="institute_name"
              value={studyState.institute_name}
              onChange={(e) => handleFieldChange("institute_name", e.target.value)}
              required
            />
            {/* Relevance of Education */}
            <ButtonGroupField
              label="Relevance of Education"
              name="relevance_of_education"
              value={studyState.relevance_of_education}
              options={relevanceOfEducationOptions}
              onChange={(value) => handleFieldChange("relevance_of_education", value)}
              required
            />
            {/* List of Certificates */}
            <div>
              <label className="block text-sm font-bold text-[#020817] mb-1">List of certificates</label>
              <p className="text-xs text-[#737373] mb-2">Please list any professional certifications you hold that are relevant to your current role or career path. For each, indicate its name and if it is currently active.</p>
              <div className="space-y-2">
                {(studyState.certificates_list || []).map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      className="w-full bg-[#f8fafc] px-3 py-2 border border-[#e2e8f0] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g. Lynda Certificate of Google"
                      value={cert}
                      onChange={(e) => handleCertificateChange(idx, e.target.value)}
                    />
                    <button
                      type="button"
                      className="text-red-500 text-xs px-2 py-1 border border-red-200 rounded hover:bg-red-50"
                      onClick={() => handleRemoveCertificate(idx)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 px-4 py-2 rounded bg-[#766ee4] text-white text-sm"
                  onClick={handleAddCertificate}
                >
                  + Add another certificate
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-8">
          <button className="px-6 py-2 rounded bg-gray-200 text-gray-700" onClick={() => setStep(step - 1)}>Back</button>
          <button className="px-6 py-2 rounded bg-[#2f279c] text-white" onClick={() => setStep(step + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStudyInformationPage; 