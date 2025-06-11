import React from "react";

function SimpleSliderField({ label, name, value, onChange, error, min = 1, max = 100, step = 1, required = false }) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-bold text-[#020817] mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative mb-6">
        {/* Display current value above thumb */}
        <div className="absolute text-sm font-semibold text-[#2F279C] -top-6 transform -translate-x-1/2" style={{ left: `${percentage}%` }}>
          {value}
        </div>

        <input
          type="range"
          id={name}
          name={name}
          min={min}
          max={max}
          step={step}
          value={value || min}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #2F279C 0%, #766EE4 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`,
            WebkitAppearance: "none",
          }}
        />

        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: white;
            border: 2px solid #766ee4;
            cursor: pointer;
            margin-top: -8px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          }

          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: white;
            border: 2px solid #766ee4;
            cursor: pointer;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          }

          input[type="range"]::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            background: transparent;
            border-radius: 5px;
          }

          input[type="range"]::-moz-range-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            background: transparent;
            border-radius: 5px;
          }
        `}</style>
      </div>

      {/* Min/Max Labels */}
      <div className="flex justify-between items-start text-xs font-medium mt-1">
        <span className="text-sm text-[#737373]">{min}</span>
        <span className="text-sm text-[#737373]">{max}</span>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default SimpleSliderField;
