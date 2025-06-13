import { useCallback, useState } from "react";
import ProgressBar from "../components/onboarding-components/ProgressBar";
import AuthHeader from "../components/shared/AuthHeader";
import AuthInputField from "../components/shared/AuthInputField";
import SelectInputField from "../components/shared/SelectInputField";
import ButtonGroupField from "../components/shared/ButtonGroupField";
import AuthTextAreaField from "../components/shared/AuthTextAreaField";
import useOnboardingStore from "../store/onboardingStore";
import { proficiencyLevelOptions, currentRoleExperienceOptions } from "../constants/onboardingData";
import { onboardingStep1 } from "../constants/onboardingProgressBarSteps";
import { skillsInformationSchema } from "../validations/resumeFormsValidations";
import { validateForm } from "../utils/validateForm";

const OnboardingSkillProfilePage = () => {
  const skillsState = useOnboardingStore((state) => state.onboardingState.resume.skills_information);
  const updateSection = useOnboardingStore((state) => state.updateSection);
  const setStep = useOnboardingStore((state) => state.setStep);
  const step = useOnboardingStore((state) => state.step);
  const [errors, setErrors] = useState({});
  const [currentSkill, setCurrentSkill] = useState({ name: "", proficiency: "" }); // Local state for the new skill input

  // Helper to update a single field in skills_information
  const handleFieldChange = useCallback(
    (field, value) => {
      updateSection(`resume.skills_information.${field}`, () => value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [updateSection]
  );

  // Key Professional Skills handlers (top_skills is an array of { name: "", proficiency: "" })
  const handleCurrentSkillChange = (field, value) => {
    setCurrentSkill((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined })); // Clear error for current skill input
  };

  const handleAddSkill = () => {
    if ((skillsState.top_skills || []).length >= 7) {
      setErrors((prev) => ({
        ...prev,
        top_skills: "You cannot add more than 7 skills",
      }));
      return;
    }
    if (currentSkill.name && currentSkill.proficiency) {
      const newSkills = [...(skillsState.top_skills || []), currentSkill];
      handleFieldChange("top_skills", newSkills);
      setCurrentSkill({ name: "", proficiency: "" });
      setErrors((prev) => ({ ...prev, top_skills: "" }));
    }
    return;
  };

  const handleRemoveSkill = (idx) => {
    const newSkills = [...(skillsState.top_skills || [])];
    newSkills.splice(idx, 1);
    handleFieldChange("top_skills", newSkills);
  };

  const handleNext = () => {
    const fieldErrors = validateForm(skillsInformationSchema, skillsState);
    console.log("errors", fieldErrors);
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
            <h3 className="text-xl font-bold text-[#766ee4] mb-1">Your Skill Profile</h3>
            <p className="text-sm text-[#737373] mb-6">Fill your skills information in the following fields for better results.</p>
          </div>

          <div className="space-y-5">
            {/* Key Professional Skills */}
            <div>
              <label className="block text-sm font-bold text-[#020817] mb-1">Key Professional Skills (Top 5-7)</label>
              <p className="text-xs text-[#737373] mb-2">
                What are your top 5-7 key professional skills? (e.g., Project Management, Python, Digital Marketing, Leadership, Data
                Analysis)
              </p>

              <div className="space-y-2 mb-4">
                {(skillsState.top_skills || []).map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <p className="font-bold text-md text-[#5B5757]">
                      {idx + 1}. {skill.name} - {skill.proficiency}
                    </p>
                    <button
                      type="button"
                      className="text-red-500 text-xs px-2 py-1 border border-red-200 rounded hover:bg-red-50"
                      onClick={() => handleRemoveSkill(idx)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Input for new skill */}
              <div className="flex items-end gap-2">
                <div className="flex-grow">
                  <AuthInputField
                    label="Skill Name"
                    placeholder="Enter your skill here"
                    type="text"
                    name="new_skill_name"
                    value={currentSkill.name}
                    onChange={(e) => handleCurrentSkillChange("name", e.target.value)}
                    error={errors.currentSkill?.name}
                  />
                </div>
                <div className="w-1/3">
                  <SelectInputField
                    label="Proficiency"
                    name="new_skill_proficiency"
                    placeholder="Select Proficiency"
                    value={currentSkill.proficiency}
                    options={proficiencyLevelOptions}
                    onChange={(value) => handleCurrentSkillChange("proficiency", value)}
                    error={errors.currentSkill?.proficiency}
                  />
                </div>
              </div>
              <div className="flex flex-row items-end justify-end mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border border-[#2F279C] text-[#2F279C] text-sm"
                  onClick={handleAddSkill}
                >
                  Add Skill
                </button>
              </div>

              {errors.top_skills && !Array.isArray(errors.top_skills) && <p className="text-red-500 text-xs mt-1">{errors.top_skills}</p>}
            </div>

            {/* Quantifiable Achievements */}
            <AuthTextAreaField
              label="Quantifiable Achievements (2-3 examples)"
              placeholder={`Please describe 2-3 of your most significant quantifiable achievements in your current or recent roles (within the last 3-5 years). For each, specify the outcome and your role in it (e.g., "Led a project that increased sales by 15% in 6 months)`}
              rows={5}
              name="achievements"
              value={skillsState.achievements}
              onChange={(e) => handleFieldChange("achievements", e.target.value)}
              error={errors.achievements}
            />

            {/* Performance Recognition */}
            <AuthTextAreaField
              label="Performance Recognition"
              placeholder={`Have you received any formal recognition for your performance in the last 3-5 years (e.g., awards, promotions due to performance, consistently high ratings, significant bonuses)? Please provide details.`}
              rows={5}
              name="performance_recognition"
              value={skillsState.performance_recognition}
              onChange={(e) => handleFieldChange("performance_recognition", e.target.value)}
              error={errors.performance_recognition}
            />

            {/* Current Role Experience */}
            <ButtonGroupField
              label="Current Role Experience"
              name="current_role_experience"
              value={skillsState.current_role_experience}
              options={currentRoleExperienceOptions}
              onChange={(value) => handleFieldChange("current_role_experience", value)}
              error={errors.current_role_experience}
              description="Which description best captures your current professional experience?"
              required
            />
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

export default OnboardingSkillProfilePage;
