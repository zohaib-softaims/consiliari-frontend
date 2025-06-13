import { useCallback, useState } from "react";
import ProgressBar from "../components/onboarding-components/ProgressBar";
import AuthHeader from "../components/shared/AuthHeader";
import AuthTextAreaField from "../components/shared/AuthTextAreaField";
import AuthCurrencyInputField from "../components/shared/AuthCurrencyInputField";
import useOnboardingStore from "../store/onboardingStore";
import { onboardingStep2 } from "../constants/onboardingProgressBarSteps";
import { marketViewSchema } from "../validations/careerBluePrintValidations";
import { validateForm } from "../utils/validateForm";

const OnboardingMarketViewPage = () => {
  const marketState = useOnboardingStore((state) => state.onboardingState.career_blueprint.market_view);
  const updateSection = useOnboardingStore((state) => state.updateSection);
  const setStep = useOnboardingStore((state) => state.setStep);
  const step = useOnboardingStore((state) => state.step);
  const [errors, setErrors] = useState({});

  const handleFieldChange = useCallback(
    (field, value) => {
      updateSection(`career_blueprint.market_view.${field}`, () => value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [updateSection]
  );

  const handleNext = () => {
    const fieldErrors = validateForm(marketViewSchema, marketState);
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
  console.log("errors", errors);
  return (
    <div className="min-h-screen bg-white">
      <AuthHeader />
      <div className="max-w-5xl mx-auto pt-8 px-6">
        <div className="text-center mt-8 mb-8">
          <div className="text-sm text-[#2f279c] mb-3">Step 2/2</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Your Market View</h2>
        </div>

        <ProgressBar steps={onboardingStep2} offset={5} />

        <div className="space-y-6 mt-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-[#766ee4] mb-1">Your Market View</h3>
            <p className="text-sm text-[#737373] mb-6">This section considers your Salary</p>
          </div>

          <div className="space-y-5">
            <AuthCurrencyInputField
              label="Salary Currency :"
              type="number"
              placeholder="Enter your total annual compensation"
              name="annual_salary"
              value={marketState.annual_salary}
              onChange={(e) => handleFieldChange("annual_salary", e.target.value)}
              error={errors.annual_salary}
            />
            <AuthCurrencyInputField
              label="Annual Bonus Currency (Optional)"
              type="number"
              placeholder="Enter your annual bonus"
              name="annual_bonus"
              value={marketState.annual_bonus}
              onChange={(e) => handleFieldChange("annual_bonus", e.target.value)}
              error={errors.annual_bonus}
            />
            <AuthCurrencyInputField
              label="Equity Currency (Optional, if salary provided):"
              type="number"
              placeholder="Enter your equity"
              name="equity"
              value={marketState.equity}
              onChange={(e) => handleFieldChange("equity", e.target.value)}
              error={errors.equity}
            />
            <AuthCurrencyInputField
              label="Other Compensation (Optional):"
              type="number"
              placeholder="Enter your total annual compensation"
              name="other_compensation"
              value={marketState.other_compensation}
              onChange={(e) => handleFieldChange("other_compensation", e.target.value)}
              error={errors.other_compensation}
            />
            <AuthTextAreaField
              label="Describe your compensation growth trajectory over the last three years"
              placeholder="Describe here"
              rows={5}
              name="compensation_growth_trajectory"
              value={marketState.compensation_growth_trajectory}
              onChange={(e) => handleFieldChange("compensation_growth_trajectory", e.target.value)}
              error={errors.compensation_growth_trajectory}
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

export default OnboardingMarketViewPage;
