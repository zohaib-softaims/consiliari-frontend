export default function ProgressBar() {
  const steps = [
    { name: "Upload Resume", completed: true },
    { name: "Job Information", completed: true },
    { name: "Study Experience", completed: false },
    { name: "Your Skill Profile", completed: false },
  ];
  const lastCompletedIndex = steps.reduce((lastIndex, step, index) => {
    return step.completed ? index : lastIndex;
  }, -1);
  return (
    <div className="flex max-w-2xl mx-auto my-4 bg-[#f5f5f5] rounded-r-md rounded-l-md">
      <div className="flex w-full rounded-md overflow-hidden">
        {steps.map((step, index) => (
          <div
            key={step.name}
            className={`flex-1 px-4 py-2.5 text-sm font-medium text-center ${
              step.completed && index === lastCompletedIndex
                ? "bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white rounded-r-md"
                : step.completed
                ? "bg-[#2f279c] text-white"
                : " text-[#c4c3c3]"
            } ${index === 0 ? "rounded-l-md" : ""} ${index === steps.length - 1 ? "rounded-r-md" : ""}`}
          >
            {step.name}
          </div>
        ))}
      </div>
    </div>
  );
}
