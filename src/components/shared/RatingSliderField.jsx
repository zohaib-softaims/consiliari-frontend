import React from "react";

function RatingSliderField({
  label,
  name,
  value,
  onChange,
  error,
  min = 1,
  max = 5,
  step = 1,
  minLabel = "Low",
  maxLabel = "High",
  required = false,
}) {
  const rangeMarks = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-bold text-[#020817] mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative mb-10">
        <input
          type="range"
          id={name}
          name={name}
          min={min}
          max={max}
          step={step}
          value={value || min} // Default to min if value is null/undefined
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #2F279C 0%, #766EE4 ${((value - min) / (max - min)) * 100}%, #e2e8f0 ${
              ((value - min) / (max - min)) * 100
            }%, #e2e8f0 100%)`,
            WebkitAppearance: "none",
          }}
        />
        {/* Custom styles for thumb and track (requires specific CSS) */}
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
            margin-top: -8px; /* Adjust to center vertically on a 4px track */
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
            background: transparent; /* Handled by linear-gradient on input */
            border-radius: 5px;
          }

          input[type="range"]::-moz-range-track {
            width: 100%;
            height: 4px;
            cursor: pointer;
            background: transparent; /* Handled by linear-gradient on input */
            border-radius: 5px;
          }
        `}</style>

        {/* Numbered Markers */}
        <div className="absolute w-full flex justify-between -bottom-2 text-sm">
          {rangeMarks.map((mark) => (
            <span
              key={mark}
              className="font-bold absolute transform -translate-x-1/2"
              style={{ left: `${((mark - min) / (max - min)) * 100}%` }}
            >
              {mark}
            </span>
          ))}
        </div>
      </div>

      {/* Min/Max Labels */}
      <div className="flex justify-between items-start text-xs font-medium mt-2">
        <span className="text-sm text-[#737373]">{minLabel}</span>
        <span className="text-sm text-[#737373]">{maxLabel}</span>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default RatingSliderField;
