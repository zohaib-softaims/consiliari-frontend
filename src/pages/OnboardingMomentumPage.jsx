import { useCallback, useState } from "react";
import ProgressBar from "../components/onboarding-components/ProgressBar";
import AuthHeader from "../components/shared/AuthHeader";
import AuthTextAreaField from "../components/shared/AuthTextAreaField";
import RatingSliderField from "../components/shared/RatingSliderField";
import ButtonGroupField from "../components/shared/ButtonGroupField";
import useOnboardingStore from "../store/onboardingStore";
import { onboardingStep2 } from "../constants/onboardingProgressBarSteps";
import { momentumSchema } from "../validations/careerBluePrintValidations";
import { validateForm } from "../utils/validateForm";
import { industryGrowthTrajectoryPerceptionOptions } from "../constants/onboardingData";
import YesNoButtonGroupField from "../components/shared/YesNoButtonGroupField";

const OnboardingMomentumPage = () => {
  const momentumState = useOnboardingStore((state) => state.onboardingState.career_blueprint.momentum);
  const updateSection = useOnboardingStore((state) => state.updateSection);
  const setStep = useOnboardingStore((state) => state.setStep);
  const step = useOnboardingStore((state) => state.step);
  const [errors, setErrors] = useState({});

  const handleFieldChange = useCallback(
    (field, value) => {
      updateSection(`career_blueprint.momentum.${field}`, () => value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [updateSection]
  );

  const handleNestedFieldChange = useCallback(
    (parentField, field, value) => {
      updateSection(`career_blueprint.momentum.${parentField}.${field}`, () => value);
      setErrors((prev) => ({ ...prev, [parentField]: undefined }));
    },
    [updateSection]
  );
  console.log("errors", errors);
  const handleNext = () => {
    const fieldErrors = validateForm(momentumSchema, momentumState);
    // console.log("errors", fieldErrors);
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
      <div className="max-w-5xl mx-auto pt-8 px-6">
        <div className="text-center mt-8 mb-8">
          <div className="text-sm text-[#2f279c] mb-3">Step 2/2</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Crafting Your Career Blueprint</h2>
        </div>

        <ProgressBar steps={onboardingStep2} offset={5} />

        <div className="space-y-6 mt-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-[#766ee4] mb-1">Your Career Momentum & Engagement</h3>
            <p className="text-sm text-[#737373] mb-6">This section assesses your current progression and future development</p>
          </div>

          <div className="space-y-5">
            <AuthTextAreaField
              label="Growth in responsibility"
              placeholder="Describe how your responsibilities and autonomy have grown in your current role or recent roles."
              rows={5}
              name="growth_in_responsibility"
              value={momentumState.growth_in_responsibility}
              onChange={(e) => handleFieldChange("growth_in_responsibility", e.target.value)}
              error={errors.growth_in_responsibility}
            />

            <AuthTextAreaField
              label="Recent Development & Continuous Learning"
              placeholder="Thinking about the last 6-12 months, what new skills, knowledge, or expertise have you developed? How have you applied these in your work?"
              rows={5}
              name="recent_skill_development"
              value={momentumState.recent_skill_development}
              onChange={(e) => handleFieldChange("recent_skill_development", e.target.value)}
              error={errors.recent_skill_development}
            />

            <AuthTextAreaField
              label="Proactive Career Engagement Activities"
              placeholder="What steps have you taken to actively manage your career progression (e.g., networking, mentorship, courses, conferences, informational interviews)?"
              rows={5}
              name="proactive_career_activities"
              value={momentumState.proactive_career_activities}
              onChange={(e) => handleFieldChange("proactive_career_activities", e.target.value)}
              error={errors.proactive_career_activities}
            />

            <AuthTextAreaField
              label="Learning Agility & Adaptability"
              placeholder="How do you adapt to significant changes in your professional environment or responsibilities? Provide an example of a time you quickly learned a new skill or adapted to a new challenge."
              rows={5}
              name="learning_agility"
              value={momentumState.learning_agility}
              onChange={(e) => handleFieldChange("learning_agility", e.target.value)}
              error={errors.learning_agility}
            />

            <AuthTextAreaField
              label="Proactive learning example"
              placeholder="Provide an example of your initiative and how it has lead you to new skills or a change in your behavior."
              rows={5}
              name="proactive_learning_example"
              value={momentumState.proactive_learning_example}
              onChange={(e) => handleFieldChange("proactive_learning_example", e.target.value)}
              error={errors.proactive_learning_example}
            />

            <RatingSliderField
              label="Personal Alignment Fulfilment"
              name="personal_alignment_fulfilment.rating"
              value={momentumState.personal_alignment_fulfilment?.rating}
              onChange={(value) => handleNestedFieldChange("personal_alignment_fulfilment", "rating", value)}
              error={errors.personal_alignment_fulfilment?.rating}
              minLabel="Completely unfulfilled"
              maxLabel="Total clarity"
            />

            <AuthTextAreaField
              label="Explanation for Alignment Rating"
              placeholder="Describe how your current role or career path aligns with your personal values and aspirations."
              rows={5}
              name="personal_alignment_fulfilment.explaination"
              value={momentumState.personal_alignment_fulfilment?.explaination}
              onChange={(e) => handleNestedFieldChange("personal_alignment_fulfilment", "explaination", e.target.value)}
              error={errors.personal_alignment_fulfilment?.explaination}
            />

            <YesNoButtonGroupField
              label="Are you perceived as highly skilled and technically proficient in your area of expertise within your team or broader organization?"
              name="seniority_perception.isTrue"
              value={momentumState.seniority_perception?.isTrue}
              onChange={(value) => handleNestedFieldChange("seniority_perception", "isTrue", value)}
              error={errors.seniority_perception?.isTrue}
            />

            <AuthTextAreaField
              label="Explanation for Seniority Perception"
              placeholder="Explain why you are not perceived as highly skilled."
              rows={5}
              name="seniority_perception.explaination"
              value={momentumState.seniority_perception?.explaination}
              onChange={(e) => handleNestedFieldChange("seniority_perception", "explaination", e.target.value)}
              error={errors.seniority_perception?.explaination}
            />

            <ButtonGroupField
              label="How do you perceive the future growth trajectory of your current industry or field?"
              name="industry_growth_trajectory_perception"
              value={momentumState.industry_growth_trajectory_perception}
              options={industryGrowthTrajectoryPerceptionOptions}
              onChange={(value) => handleFieldChange("industry_growth_trajectory_perception", value)}
              error={errors.industry_growth_trajectory_perception}
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

export default OnboardingMomentumPage;
