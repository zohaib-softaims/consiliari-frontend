import { useCallback } from "react";
import ProgressBar from "../components/onboarding-components/ProgressBar";
import AuthHeader from "../components/shared/AuthHeader";
import AuthInputField from "../components/shared/AuthInputField";
import SelectInputField from "../components/shared/SelectInputField";
import ButtonGroupField from "../components/shared/ButtonGroupField";
import AuthTextAreaField from "../components/shared/AuthTextAreaField";
import useOnboardingStore from "../store/onboardingStore";
import { proficiencyLevelOptions, currentRoleExperienceOptions } from "../constants/onboardingData";
import { onboardingStep1 } from "../constants/onboardingProgressBarSteps";

const OnboardingSkillProfilePage = () => {
  const skillsState = useOnboardingStore((state) => state.onboardingState.resume.skills_information);
  const updateSection = useOnboardingStore((state) => state.updateSection);
  const setStep = useOnboardingStore((state) => state.setStep);
  const step = useOnboardingStore((state) => state.step);

  // Helper to update a single field in skills_information
  const handleFieldChange = useCallback(
    (field, value) => {
      updateSection(`resume.skills_information.${field}`, () => value);
    },
    [updateSection]
  );

  // Key Professional Skills handlers (top_skills is an array of { name: "", proficiency: "" })
  const handleSkillChange = (idx, field, value) => {
    const newSkills = [...(skillsState.top_skills || [])];
    newSkills[idx] = {
      ...(newSkills[idx] || { name: "", proficiency: "" }),
      [field]: value,
    };
    handleFieldChange("top_skills", newSkills);
  };

  const handleAddSkill = () => {
    handleFieldChange("top_skills", [...(skillsState.top_skills || []), { name: "", proficiency: "" }]);
  };

  const handleRemoveSkill = (idx) => {
    const newSkills = [...(skillsState.top_skills || [])];
    newSkills.splice(idx, 1);
    handleFieldChange("top_skills", newSkills);
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
              <div className="space-y-2">
                {(skillsState.top_skills || []).map((skill, idx) => (
                  <div key={idx} className="flex items-end gap-2">
                    <div className="flex-grow">
                      <label className="block text-sm text-[#020817] mb-1">{idx + 1}. Skill Name</label>
                      <input
                        type="text"
                        className="w-full bg-[#f8fafc] px-3 py-2 border border-[#e2e8f0] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter your skill here"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(idx, "name", e.target.value)}
                      />
                    </div>
                    <div className="w-1/3">
                      <SelectInputField
                        label="Proficiency"
                        name={`proficiency-${idx}`}
                        placeholder="Select Proficiency"
                        value={skill.proficiency}
                        options={proficiencyLevelOptions}
                        onChange={(value) => handleSkillChange(idx, "proficiency", value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="text-red-500 text-xs px-2 py-1 border border-red-200 rounded hover:bg-red-50"
                      onClick={() => handleRemoveSkill(idx)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" className="mt-2 px-4 py-2 rounded bg-[#766ee4] text-white text-sm" onClick={handleAddSkill}>
                  + Add Skill
                </button>
              </div>
            </div>

            {/* Quantifiable Achievements */}
            <AuthTextAreaField
              label="Quantifiable Achievements (2-3 examples)"
              placeholder="Please describe 2-3 of your most significant quantifiable achievements in your current or recent roles (within the last 3-5 years). For each, specify the outcome and your role in it (e.g., 'Led a project that increased sales by 15% in 6 months')"
              rows={5}
              name="achievements"
              value={skillsState.achievements}
              onChange={(e) => handleFieldChange("achievements", e.target.value)}
            />

            {/* Performance Recognition */}
            <AuthTextAreaField
              label="Performance Recognition"
              placeholder="How have you received any formal recognition for your performance in the last 3-5 years? (e.g., awards, promotions, rise in pay, bonuses, consistently high ratings, significant increases?) Please provide details."
              rows={5}
              name="performance_recognition"
              value={skillsState.performance_recognition}
              onChange={(e) => handleFieldChange("performance_recognition", e.target.value)}
            />

            {/* Current Role Experience */}
            <ButtonGroupField
              label="Current Role Experience"
              name="current_role_experience"
              value={skillsState.current_role_experience}
              options={currentRoleExperienceOptions}
              onChange={(value) => handleFieldChange("current_role_experience", value)}
              required
            />
          </div>
        </div>
        <div className="flex justify-between mb-8">
          <button className="px-6 py-2 rounded bg-gray-200 text-gray-700" onClick={() => setStep(step - 1)}>
            Back
          </button>
          <button className="px-6 py-2 rounded bg-[#2f279c] text-white" onClick={() => setStep(step + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSkillProfilePage;
