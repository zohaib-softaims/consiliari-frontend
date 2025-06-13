import React, { useState, useEffect } from "react";

const MultiSelectButtonGroupField = ({ label, description, options, value = [], onChange, error }) => {
  const [selectedOptions, setSelectedOptions] = useState(value);

  useEffect(() => {
    setSelectedOptions(value);
  }, [value]);

  const handleButtonClick = (option) => {
    let newSelection;
    if (selectedOptions.includes(option)) {
      newSelection = selectedOptions.filter((item) => item !== option);
    } else {
      newSelection = [...selectedOptions, option];
    }
    onChange(newSelection);
  };

  return (
    <div>
      <label className="block text-sm font-bold text-[#020817] mb-1">{label}</label>
      {description && <p className="text-xs text-[#737373] mb-2">{description}</p>}

      <div className="grid grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleButtonClick(option)}
            className={`w-full px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200
              ${
                selectedOptions.includes(option)
                  ? "bg-gradient-to-r from-[#2F279C] to-[#766EE4] text-white"
                  : "bg-[#f8fafc] text-[#393c41] border border-[#e2e8f0] hover:bg-[#eef2ff] hover:border-[#2f279c]"
              }
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            {option}
          </button>
        ))}
      </div>

      {error && !Array.isArray(error) && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default MultiSelectButtonGroupField;
