import OnboardingCvUploadPage from "./OnboardingCvUploadPage";
import OnboardingJobInformationPage from "./OnboardingJobInformationPage";
import useOnboardingStore from "../store/onboardingStore";

const OnboardingPage = () => {
  const step = useOnboardingStore((state) => state.step);

  if (step === 1) return <OnboardingCvUploadPage />;
  if (step === 2) return <OnboardingJobInformationPage />;
  return <OnboardingCvUploadPage />;
};

export default OnboardingPage;
