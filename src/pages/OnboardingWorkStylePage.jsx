import { useCallback, useState } from "react";
import ProgressBar from "../components/onboarding-components/ProgressBar";
import AuthHeader from "../components/shared/AuthHeader";
import AuthTextAreaField from "../components/shared/AuthTextAreaField";
import ButtonGroupField from "../components/shared/ButtonGroupField";
import useOnboardingStore from "../store/onboardingStore";
import { onboardingStep2 } from "../constants/onboardingProgressBarSteps";
import { workStyleSchema } from "../validations/careerBluePrintValidations";
import { validateForm } from "../utils/validateForm";
import { preferredCoachingStyleOptions, accountabilityOptions, reactionToSetbackOptions } from "../constants/onboardingData";
import DetailedButtonGroupField from "../components/shared/DetailedButtonGroupField";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserStore } from "../store/userStore";
import MultiSelectButtonGroupField from "../components/shared/MultiSelectButtonGroupField";
import AuthInputField from "../components/shared/AuthInputField";

const OnboardingWorkStylePage = () => {
  const workStyleState = useOnboardingStore((state) => state.onboardingState.career_blueprint.work_style);
  const updateSection = useOnboardingStore((state) => state.updateSection);
  const setStep = useOnboardingStore((state) => state.setStep);
  const step = useOnboardingStore((state) => state.step);
  const onboardingState = useOnboardingStore((state) => state.onboardingState);
  const { user, setUser } = useUserStore();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Add loading state for submission
  const [loading, setLoading] = useState(false);

  const [selectedPredefinedMethods, setSelectedPredefinedMethods] = useState(() => {
    const initialMethods = workStyleState.accountability_methods || [];
    return initialMethods.filter((method) => accountabilityOptions.includes(method));
  });

  const [otherMotivationMethod, setOtherMotivationMethod] = useState(() => {
    const initialMethods = workStyleState.accountability_methods || [];
    const otherValue = initialMethods.find((method) => !accountabilityOptions.includes(method));
    return otherValue || "";
  });

  const updateMotivationMethodsInStore = useCallback(
    (predefined, other) => {
      let combinedValue = [...predefined];
      if (other.trim() !== "") {
        combinedValue.push(other.trim());
      }
      updateSection(`career_blueprint.work_style.accountability_methods`, () => combinedValue);
      setErrors((prev) => ({ ...prev, accountability_methods: "" }));
    },
    [updateSection]
  );

  const handlePredefinedMethodsChange = useCallback(
    (newPredefinedSelections) => {
      setSelectedPredefinedMethods(newPredefinedSelections);
      updateMotivationMethodsInStore(newPredefinedSelections, otherMotivationMethod);
    },
    [updateMotivationMethodsInStore, otherMotivationMethod]
  );

  const handleOtherMotivationMethodChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      setOtherMotivationMethod(newValue);
      updateMotivationMethodsInStore(selectedPredefinedMethods, newValue);
    },
    [updateMotivationMethodsInStore, selectedPredefinedMethods]
  );

  const handleFieldChange = useCallback(
    (field, value) => {
      updateSection(`career_blueprint.work_style.${field}`, () => value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [updateSection]
  );

  const handleNext = async () => {
    const fieldErrors = validateForm(workStyleSchema, workStyleState);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    try {
      setLoading(true);
      const response = await apiClient.post("/onboarding/completed", onboardingState);
      if (response.success) {
        setUser({ ...user, is_onboarding_completed: true });
        localStorage.removeItem("onboarding-data-storage");
        navigate("/");
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <AuthHeader />
      <div className="max-w-5xl mx-auto pt-8 px-6">
        <div className="text-center mt-8 mb-8">
          <div className="text-sm text-[#2f279c] mb-3">Step 6/6</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Your Work Style & Preferences</h2>
        </div>

        <ProgressBar steps={onboardingStep2} offset={5} />

        <div className="space-y-6 mt-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-[#766ee4] mb-1">Your Work Style & Preferences</h3>
            <p className="text-sm text-[#737373] mb-6">
              This section helps us tailor your ConsiliAri experience, especially the AI Coach interactions.
            </p>
          </div>

          <DetailedButtonGroupField
            label="Preferred Guidance/Coaching Style:"
            description="When it comes to receiving guidance or coaching, how would you like your ConsiliAri AI Coach to communicate with you?"
            options={preferredCoachingStyleOptions}
            name="preferred_coaching_style"
            value={workStyleState.preferred_coaching_style}
            onChange={(value) => handleFieldChange("preferred_coaching_style", value)}
            error={errors.preferred_coaching_style}
            isMultiSelect={false}
          />

          <MultiSelectButtonGroupField
            label="Motivation & Accountability Methods:"
            description="What helps you best stay motivated and accountable for your goals? (Select all that apply)"
            options={accountabilityOptions}
            name="accountability_methods"
            value={selectedPredefinedMethods}
            onChange={handlePredefinedMethodsChange}
            error={errors.accountability_methods}
          />

          <AuthInputField
            label="Other (Motivation & Accountability Methods)"
            placeholder="e.g., Self-reflection, mentorship, etc."
            type="text"
            name="other_accountability_method"
            value={otherMotivationMethod}
            onChange={handleOtherMotivationMethodChange}
            // All validation for motivation_and_accountability_methods (including 'other')
            // is handled by the `workStyleSchema` in `careerBluePrintValidations.js`.
            // The error prop here will display any error message from the schema validation
            // related to the overall motivation_and_accountability_methods array.
            error={errors.accountability_methods}
          />

          <ButtonGroupField
            label="Typical Reaction to Setbacks:"
            description="When facing a setback or when things don't go as planned, what's your typical Red reaction or approach? (Select one that best describes you)"
            options={reactionToSetbackOptions}
            name="reaction_to_setback"
            value={workStyleState.reaction_to_setback}
            onChange={(value) => handleFieldChange("reaction_to_setback", value)}
            error={errors.reaction_to_setback}
            isMultiSelect={false}
          />

          <AuthTextAreaField
            label="Excitement about ConsiliAri (Optional):"
            placeholder="Is there anything specific you're hoping ConsiliAri can help you with that you haven't mentioned? (Optional)"
            rows={5}
            name="excitement_about_consiliari"
            value={workStyleState.excitement_about_consiliari}
            onChange={(e) => handleFieldChange("excitement_about_consiliari", e.target.value)}
            error={errors.excitement_about_consiliari}
          />
        </div>
        <div className="flex justify-between mb-8">
          <button className="px-6 py-2 rounded bg-gray-200 text-gray-700" onClick={handleBack} disabled={loading}>
            Back
          </button>
          <button className="px-6 py-2 rounded bg-[#2f279c] text-white" onClick={handleNext} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWorkStylePage;
