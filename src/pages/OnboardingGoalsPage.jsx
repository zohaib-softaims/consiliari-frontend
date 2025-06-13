import { useCallback, useState } from "react";
import ProgressBar from "../components/onboarding-components/ProgressBar";
import AuthHeader from "../components/shared/AuthHeader";
import AuthTextAreaField from "../components/shared/AuthTextAreaField";
import ButtonGroupField from "../components/shared/ButtonGroupField";
import RatingSliderField from "../components/shared/RatingSliderField";
import useOnboardingStore from "../store/onboardingStore";
import { onboardingStep2 } from "../constants/onboardingProgressBarSteps";
import { goalsSchema } from "../validations/careerBluePrintValidations";
import { validateForm } from "../utils/validateForm";
import { readinessForNextRoleOptions } from "../constants/onboardingData";
import ToggleSwitch from "../components/shared/ToggleSwitch";

const OnboardingGoalsPage = () => {
  const goalsState = useOnboardingStore((state) => state.onboardingState.career_blueprint.goals);
  const updateSection = useOnboardingStore((state) => state.updateSection);
  const setStep = useOnboardingStore((state) => state.setStep);
  const step = useOnboardingStore((state) => state.step);
  const [errors, setErrors] = useState({});

  // Helper to update a single field in goals
  const handleFieldChange = useCallback(
    (field, value) => {
      updateSection(`career_blueprint.goals.${field}`, () => value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [updateSection]
  );

  const handleNext = () => {
    const fieldErrors = validateForm(goalsSchema, goalsState);
    console.log("errors", fieldErrors);
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

        {/* Form Content */}
        <div className="space-y-6 mt-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-[#766ee4] mb-1">Aspiration & Goals</h3>
            <p className="text-sm text-[#737373] mb-6">
              This section helps us understand your ambitions and where you see yourself heading
            </p>
          </div>

          <div className="space-y-5">
            {/* Short Term Goal */}
            <div className="relative">
              <AuthTextAreaField
                label="Short Term Career Goal (next 6-12 months)"
                placeholder="Thinking about the next 6-12 months, what is the single most important career outcome you want to achieve? Be as specific as possible."
                rows={5}
                name="short_term_goal"
                value={goalsState.short_term_goal}
                onChange={(e) => handleFieldChange("short_term_goal", e.target.value)}
                error={errors.short_term_goal}
              />
              {goalsState.no_goals && (
                <div className="absolute inset-0 bg-white/50 pointer-events-auto cursor-not-allowed z-10 rounded-md"></div>
              )}
            </div>

            {/* I don't have goals checkbox */}
            <ToggleSwitch
              label="I don't have goals right and need guidance"
              name="no_goals"
              checked={goalsState.no_goals}
              onChange={(e) => handleFieldChange("no_goals", e.target.checked)}
            />

            {/* Long Term/Career future */}
            <AuthTextAreaField
              label="Long Term Career future (3-5 years)"
              placeholder="Describe your long-term career vision for the next 3-5 years. What kind of work are you doing? What impact are you making? What does success feel like for you?"
              rows={5}
              name="long_term_goal"
              value={goalsState.long_term_goal}
              onChange={(e) => handleFieldChange("long_term_goal", e.target.value)}
              error={errors.long_term_goal}
            />

            {/* Readiness for Next Role */}
            <ButtonGroupField
              label="Readiness for Next Role"
              name="readiness_for_next_goal"
              value={goalsState.readiness_for_next_goal}
              options={readinessForNextRoleOptions}
              onChange={(value) => handleFieldChange("readiness_for_next_goal", value)}
              error={errors.readiness_for_next_goal}
              required
            />

            {/* Development for Your Next Role */}
            <AuthTextAreaField
              label="Development for Next Role"
              placeholder="Have you completed any specific development goals or received feedback (e.g., from a manager or mentor) regarding your readiness for this next step? Please describe."
              rows={5}
              name="development_for_next_role"
              value={goalsState.development_for_next_role}
              onChange={(e) => handleFieldChange("development_for_next_role", e.target.value)}
              error={errors.development_for_next_role}
            />

            {/* Biggest current challenge/obstacle */}
            <AuthTextAreaField
              label="Biggest Challenge/Obstacle"
              placeholder="What do you see as the biggest challenge or obstacle currently standing between you and your career goals? (This could be internal like lack of confidence, or external like limited opportunities)."
              rows={5}
              name="challenges_for_goals"
              value={goalsState.challenges_for_goals}
              onChange={(e) => handleFieldChange("challenges_for_goals", e.target.value)}
              error={errors.challenges_for_goals}
            />

            {/* Clarity on overcoming obstacle */}
            <RatingSliderField
              label="Clarity on overcoming obstacles"
              name="clarity_on_overcoming_obstacle"
              description="On a scale of 1 (Not at all clear) to 5 (Very clear), how clear are you on the steps you need to take to overcome your main obstacle?"
              value={goalsState.clarity_on_overcoming_obstacle}
              onChange={(value) => handleFieldChange("clarity_on_overcoming_obstacle", value)}
              error={errors.clarity_on_overcoming_obstacle}
              minLabel="No clarity at all"
              maxLabel="Total clarity"
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

export default OnboardingGoalsPage;
