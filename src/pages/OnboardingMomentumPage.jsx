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
            <p className="text-sm text-[#737373] mb-6">This section looks at your career progression and proactive development.</p>
          </div>

          <div className="space-y-5">
            <AuthTextAreaField
              label="Growth in responsibility"
              placeholder="Describe any increases in responsibility, scope, or leadership you have taken on in your current or recent roles."
              rows={5}
              name="growth_in_responsibility"
              value={momentumState.growth_in_responsibility}
              onChange={(e) => handleFieldChange("growth_in_responsibility", e.target.value)}
              error={errors.growth_in_responsibility}
            />

            <AuthTextAreaField
              label="Recent Skill Development & Continuous Learning"
              placeholder="Please list any significant courses, workshops, training programs, or substantial self-learning projects you have completed in the last 1-2 years to enhance your skills and knowledge relevant to your career."
              rows={5}
              name="recent_skill_development"
              value={momentumState.recent_skill_development}
              onChange={(e) => handleFieldChange("recent_skill_development", e.target.value)}
              error={errors.recent_skill_development}
            />

            <AuthTextAreaField
              label="Proactive Career Engagement Activities"
              placeholder="How actively do you manage your career? Please provide examples of activities such as: Networking (attending industry events, informational interviews), Seeking mentorship or mentoring others, Regularly setting and reviewing career goals, Proactively seeking feedback, Utilizing career development resources."
              rows={5}
              name="proactive_career_activities"
              value={momentumState.proactive_career_activities}
              onChange={(e) => handleFieldChange("proactive_career_activities", e.target.value)}
              error={errors.proactive_career_activities}
            />

            <AuthTextAreaField
              label="Learning Agility & Adaptability"
              placeholder="Please describe any significant new skills you have learned or complex problems you have solved in the last 1-2 years that demonstrate your ability to learn and adapt."
              rows={5}
              name="learning_agility"
              value={momentumState.learning_agility}
              onChange={(e) => handleFieldChange("learning_agility", e.target.value)}
              error={errors.learning_agility}
            />

            <AuthTextAreaField
              label="Proactive learning example"
              placeholder="Provide examples of how you proactively seek out new knowledge or adapt to changes in your field"
              rows={5}
              name="proactive_learning_example"
              value={momentumState.proactive_learning_example}
              onChange={(e) => handleFieldChange("proactive_learning_example", e.target.value)}
              error={errors.proactive_learning_example}
            />

            <RatingSliderField
              label="Personal Alignment & Fulfilment"
              name="personal_alignment_fulfilment.rating"
              description="On a scale of 1 (Low) to 5 (Very High), how well does your current role and career path align with your personal goals, values, and motivations?"
              value={momentumState.personal_alignment_fulfilment?.rating}
              onChange={(value) => handleNestedFieldChange("personal_alignment_fulfilment", "rating", value)}
              error={errors.personal_alignment_fulfilment?.rating}
              minLabel="Not at all Clear"
              maxLabel="Very Clear"
            />

            <AuthTextAreaField
              label="Explanation for Alignment Rating"
              placeholder="Briefly explain your rating for personal alignment, considering aspects like job satisfaction and sense of purpose."
              rows={5}
              name="personal_alignment_fulfilment.explaination"
              value={momentumState.personal_alignment_fulfilment?.explaination}
              onChange={(e) => handleNestedFieldChange("personal_alignment_fulfilment", "explaination", e.target.value)}
              error={errors.personal_alignment_fulfilment?.explaination}
            />

            <YesNoButtonGroupField
              label="Job Title & Seniority Perception"
              description="Do you feel your current job title and seniority level are appropriate for your years of experience and responsibilities, compared to industry norms?"
              name="seniority_perception.isTrue"
              value={momentumState.seniority_perception?.isTrue}
              onChange={(value) => handleNestedFieldChange("seniority_perception", "isTrue", value)}
              error={errors.seniority_perception?.isTrue}
            />

            <AuthTextAreaField
              label="Explanation for Seniority Perception"
              placeholder="Enter more details"
              rows={5}
              name="seniority_perception.explaination"
              value={momentumState.seniority_perception?.explaination}
              onChange={(e) => handleNestedFieldChange("seniority_perception", "explaination", e.target.value)}
              error={errors.seniority_perception?.explaination}
            />

            <ButtonGroupField
              label="Industry Growth Trajectory Perception"
              description="How would you describe the growth trajectory of your current industry or field?"
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
