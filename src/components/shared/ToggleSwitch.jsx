import React from 'react';

const ToggleSwitch = ({ label, name, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="hidden" // Hide the default checkbox
      />
      <label htmlFor={name} className="flex items-center cursor-pointer">
        <div className="relative">
          <div
            className="block w-10 h-6 rounded-full transition-colors duration-200 ease-in-out border-2 bg-white border-[#2f279c]"
          ></div>
          <div
            className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform bg-[#2f279c] ${checked ? 'translate-x-4' : 'translate-x-0'}`}
          ></div>
        </div>
        <div className="ml-2 text-sm text-gray-900">{label}</div>
      </label>
    </div>
  );
};

export default ToggleSwitch; 