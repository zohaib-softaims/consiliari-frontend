import OnboardingCvUploadPage from "./OnboardingCvUploadPage";
import OnboardingJobInformationPage from "./OnboardingJobInformationPage";
import OnboardingStudyInformationPage from "./OnboardingStudyInformationPage";
import OnboardingSkillProfilePage from "./OnboardingSkillProfilePage";
import OnboardingGoalsPage from "./OnboardingGoalsPage";
import OnboardingLeadershipPage from "./OnboardingLeadershipPage";
import OnboardingMomentumPage from "./OnboardingMomentumPage";
import useOnboardingStore from "../store/onboardingStore";

const OnboardingPage = () => {
  const step = useOnboardingStore((state) => state.step);
  const onboardingState = useOnboardingStore((state) => state.onboardingState);
  console.log("onboarding state", onboardingState);
  if (step === 1) return <OnboardingCvUploadPage />;
  if (step === 2) return <OnboardingJobInformationPage />;
  if (step === 3) return <OnboardingStudyInformationPage />;
  if (step === 4) return <OnboardingSkillProfilePage />;
  if (step === 5) return <OnboardingGoalsPage />;
  if (step === 6) return <OnboardingLeadershipPage />;
  if (step === 7) return <OnboardingMomentumPage />;
  return <OnboardingCvUploadPage />;
};

export default OnboardingPage;
