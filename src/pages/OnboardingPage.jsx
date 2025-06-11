import OnboardingCvUploadPage from "./OnboardingCvUploadPage";
import OnboardingJobInformationPage from "./OnboardingJobInformationPage";
import OnboardingStudyInformationPage from "./OnboardingStudyInformationPage";
import OnboardingSkillProfilePage from "./OnboardingSkillProfilePage";
import OnboardingGoalsPage from "./OnboardingGoalsPage";
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
  return <OnboardingCvUploadPage />;
};

export default OnboardingPage;
