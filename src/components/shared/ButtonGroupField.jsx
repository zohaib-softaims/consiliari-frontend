import React from "react";

function ButtonGroupField({ label, name, value, onChange, error, options = [], required = false }) {
  return (
    <div>
      <label className="block text-sm font-bold text-[#020817] mb-1">{label}</label>
      <div className="grid grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange({ target: { name, value: option } })}
            className={`w-full px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200
              ${
                value === option
                  ? "bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white"
                  : "bg-[#f8fafc] text-[#393c41] border border-[#e2e8f0] hover:bg-[#eef2ff] hover:border-[#2f279c]"
              }
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            {option}
          </button>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {required && !value && <p className="text-red-500 text-xs mt-1">This field is required</p>}
    </div>
  );
}

export default ButtonGroupField;
