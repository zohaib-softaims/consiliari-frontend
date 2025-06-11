import OnboardingCvUploadPage from "./OnboardingCvUploadPage";
import OnboardingJobInformationPage from "./OnboardingJobInformationPage";
import OnboardingStudyInformationPage from "./OnboardingStudyInformationPage";
import useOnboardingStore from "../store/onboardingStore";

const OnboardingPage = () => {
  const step = useOnboardingStore((state) => state.step);
  const onboardingState = useOnboardingStore((state) => state.onboardingState);
  console.log("onboarding state", onboardingState);
  if (step === 1) return <OnboardingCvUploadPage />;
  if (step === 2) return <OnboardingJobInformationPage />;
  if (step === 3) return <OnboardingStudyInformationPage />;
  return <OnboardingCvUploadPage />;
};

export default OnboardingPage;
