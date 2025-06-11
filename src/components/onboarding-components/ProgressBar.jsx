import useOnboardingStore from "../../store/onboardingStore";

export default function ProgressBar({ steps }) {
  const step = useOnboardingStore((state) => state.step);
  console.log("step is", step);
  const currentIndex = step - 1;

  return (
    <div className="flex max-w-2xl mx-auto my-4 bg-[#f5f5f5] rounded-md">
      <div className="flex w-full overflow-hidden rounded-md">
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isLastCompleted = index === currentIndex;

          return (
            <div
              key={step.id}
              className={`flex-1 px-4 py-2.5 text-sm font-medium text-center transition-all ${
                isCompleted && isLastCompleted
                  ? "bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white rounded-r-md"
                  : isCompleted
                  ? "bg-[#2f279c] text-white"
                  : "text-[#c4c3c3]"
              } ${index === 0 ? "rounded-l-md" : ""} ${index === steps.length - 1 ? "rounded-r-md" : ""}`}
            >
              {step.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
