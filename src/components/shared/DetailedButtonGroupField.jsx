import React from "react";

function DetailedButtonGroupField({ label, value, onChange, error, options = [] }) {
  return (
    <div>
      <label className="block text-sm font-bold text-[#020817] mb-1">{label}</label>
      <div className="flex flex-col">
        {options.map((option) => {
          const isSelected = value === option.main_heading;
          return (
            <button
              key={option.main_heading}
              type="button"
              onClick={() => onChange(option.main_heading)}
              className={`flex items-center w-full space-x-4 mb-2 text-left rounded-md transition-colors`}
            >
              <div
                className={`rounded-md px-4 py-2 font-semibold text-sm transition-colors duration-200
      ${
        isSelected
          ? "bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white border"
          : "bg-[#f8fafc] text-[#393c41] border border-[#e2e8f0] hover:bg-[#eef2ff] hover:border-[#2f279c]"
      }`}
              >
                {option.main_heading}
              </div>
              <div className="text-xs text-[#64748b] leading-snug">{option.description}</div>
            </button>
          );
        })}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default DetailedButtonGroupField;
