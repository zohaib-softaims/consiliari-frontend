import { useCallback, useState } from "react";
import ProgressBar from "../components/onboarding-components/ProgressBar";
import AuthHeader from "../components/shared/AuthHeader";
import AuthInputField from "../components/shared/AuthInputField";
import SelectInputField from "../components/shared/SelectInputField";
import ButtonGroupField from "../components/shared/ButtonGroupField";
import useOnboardingStore from "../store/onboardingStore";
import { educationLevelOptions, relevanceOfEducationOptions } from "../constants/onboardingData";
import { onboardingStep1 } from "../constants/onboardingProgressBarSteps";
import { studyInformationSchema } from "../validations/resumeFormsValidations";
import { validateForm } from "../utils/validateForm";

const OnboardingStudyInformationPage = () => {
  const studyState = useOnboardingStore((state) => state.onboardingState.resume.study_information);
  const updateSection = useOnboardingStore((state) => state.updateSection);
  const setStep = useOnboardingStore((state) => state.setStep);
  const step = useOnboardingStore((state) => state.step);
  const [errors, setErrors] = useState({});
  const [currentCertificate, setCurrentCertificate] = useState({ name: "", isActive: false }); // Local state for new certificate

  // Helper to update a single field in study_information
  const handleFieldChange = useCallback(
    (field, value) => {
      updateSection(`resume.study_information.${field}`, () => value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [updateSection]
  );

  const handleAddCertificate = () => {
    if (currentCertificate.name.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        currentCertificate: { name: "Certificate name is required" },
      }));
      return;
    }

    if ((studyState.certificates_list || []).length >= 10) {
      setErrors((prev) => ({
        ...prev,
        certificates_list: "You cannot add more than 10 certificates.",
      }));
      return;
    }

    const newCertificates = [...(studyState.certificates_list || []), currentCertificate];
    handleFieldChange("certificates_list", newCertificates);
    setCurrentCertificate({ name: "", isActive: false }); // Clear input fields
    setErrors((prev) => ({ ...prev, currentCertificate: undefined, certificates_list: undefined })); // Clear any previous errors related to adding
  };

  const handleRemoveCertificate = (idx) => {
    const newList = [...(studyState.certificates_list || [])];
    newList.splice(idx, 1);
    handleFieldChange("certificates_list", newList);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (newErrors.certificates_list) {
        // If the removed item was the last one, clear the array error
        if (newList.length === 0) {
          newErrors.certificates_list = undefined;
        } else if (Array.isArray(newErrors.certificates_list)) {
          // If it's an array of errors, remove the specific index error
          newErrors.certificates_list.splice(idx, 1);
        }
      }
      return newErrors;
    });
  };

  const handleNext = () => {
    const fieldErrors = validateForm(studyInformationSchema, studyState);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({}); // Clear any previous errors on successful validation
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
            <h3 className="text-xl font-bold text-[#766ee4] mb-1">Study & Certifications</h3>
            <p className="text-sm text-[#737373] mb-6">Fill study related information in the following fields.</p>
          </div>

          <div className="space-y-7">
            {/* Highest Level of Education Completed */}
            <SelectInputField
              label="Highest Level of Education Completed"
              name="highest_level_of_education"
              placeholder="What is your highest level of formal education completed?"
              value={studyState.highest_level_of_education}
              options={educationLevelOptions}
              onChange={(value) => handleFieldChange("highest_level_of_education", value)}
              error={errors.highest_level_of_education}
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
              error={errors.field_of_study}
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
              error={errors.institute_name}
              required
            />
            {/* Relevance of Education */}
            <ButtonGroupField
              label="Relevance of Education"
              name="relevance_of_education"
              value={studyState.relevance_of_education}
              options={relevanceOfEducationOptions}
              onChange={(value) => handleFieldChange("relevance_of_education", value)}
              error={errors.relevance_of_education}
              description="How relevant is your highest level of education to your current career field?"
            />
            {/* List of Certificates */}
            <div>
              <label className="block text-sm font-bold text-[#020817] mb-1">List of certificates</label>
              <p className="text-xs text-[#737373] mb-2">
                Please list any professional certifications you hold that are relevant to your current role or career path. For each,
                indicate its name and if it is currently active.
              </p>
              <div className="space-y-2">
                {(studyState.certificates_list || []).map((cert, idx) => (
                  <div key={idx} className="flex items-center justify-between border p-3 rounded-md border-[#e2e8f0]">
                    <p className="font-bold text-md text-[#5B5757]">
                      {idx + 1}. {cert.name} - {cert.isActive ? "Active" : "Not Active"}
                    </p>
                    <button
                      type="button"
                      className="text-red-500 text-xs px-2 py-1 border border-red-200 rounded hover:bg-red-50"
                      onClick={() => handleRemoveCertificate(idx)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {/* Input for new certificate */}
                <div className="border p-3 rounded-md border-[#e2e8f0]">
                  <div className="mb-3">
                    <AuthInputField
                      label="Certificate Name"
                      placeholder="Enter certificate name here"
                      type="text"
                      name="new_certificate_name"
                      value={currentCertificate.name}
                      onChange={(e) => setCurrentCertificate((prev) => ({ ...prev, name: e.target.value }))}
                      error={errors.currentCertificate?.name}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="new_certificate_active"
                      checked={currentCertificate.isActive}
                      onChange={(e) => setCurrentCertificate((prev) => ({ ...prev, isActive: e.target.checked }))}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="new_certificate_active" className="ml-2 block text-sm text-gray-900">
                      Currently Active
                    </label>
                  </div>
                </div>
                {errors.certificates_list && !Array.isArray(errors.certificates_list) && (
                  <p className="text-red-500 text-xs mt-1">{errors.certificates_list}</p>
                )}
                <button
                  type="button"
                  className="mt-4 px-4 py-2 rounded bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white text-sm"
                  onClick={handleAddCertificate}
                >
                  Add Certificate
                </button>
              </div>
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

export default OnboardingStudyInformationPage;
