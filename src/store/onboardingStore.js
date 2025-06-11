import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOnboardingStore = create(
  persist(
    (set) => ({
      step: 1,
      setStep: (step) => set({ step }),
    }),
    {
      name: "onboarding-step-storage",
    }
  )
);

export default useOnboardingStore; 