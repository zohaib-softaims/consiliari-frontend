import { useEffect } from "react";
import OnboardingCvUploadPage from "./OnboardingCvUploadPage";
import OnboardingJobInformationPage from "./OnboardingJobInformationPage";
import OnboardingStudyInformationPage from "./OnboardingStudyInformationPage";
import OnboardingSkillProfilePage from "./OnboardingSkillProfilePage";
import OnboardingGoalsPage from "./OnboardingGoalsPage";
import OnboardingLeadershipPage from "./OnboardingLeadershipPage";
import OnboardingMomentumPage from "./OnboardingMomentumPage";
import OnboardingMarketViewPage from "./OnboardingMarketViewPage";
import OnboardingWorkStylePage from "./OnboardingWorkStylePage";
import useOnboardingStore from "../store/onboardingStore";

const OnboardingPage = () => {
  const step = useOnboardingStore((state) => state.step);
  const onboardingState = useOnboardingStore((state) => state.onboardingState);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);
  console.log("onboarding state", onboardingState);
  if (step === 1) return <OnboardingCvUploadPage />;
  if (step === 2) return <OnboardingJobInformationPage />;
  if (step === 3) return <OnboardingStudyInformationPage />;
  if (step === 4) return <OnboardingSkillProfilePage />;
  if (step === 5) return <OnboardingGoalsPage />;
  if (step === 6) return <OnboardingLeadershipPage />;
  if (step === 7) return <OnboardingMomentumPage />;
  if (step === 8) return <OnboardingMarketViewPage />;
  if (step === 9) return <OnboardingWorkStylePage />;
  return <OnboardingCvUploadPage />;
};

export default OnboardingPage;
