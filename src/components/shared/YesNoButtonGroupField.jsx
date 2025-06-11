import React from "react";

function YesNoButtonGroupField({ label, value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-bold text-[#020817] mb-1">{label}</label>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`w-full px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200
            ${
              value === true
                ? "bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white"
                : "bg-[#f8fafc] text-[#393c41] border border-[#e2e8f0] hover:bg-[#eef2ff] hover:border-[#2f279c]"
            }
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`w-full px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200
            ${
              value === false
                ? "bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white"
                : "bg-[#f8fafc] text-[#393c41] border border-[#e2e8f0] hover:bg-[#eef2ff] hover:border-[#2f279c]"
            }
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          No
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default YesNoButtonGroupField;
