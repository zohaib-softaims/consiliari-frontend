import React from "react";

function AuthCurrencyInputField({ label, type, name, value, onChange, error, placeholder = "", required = false }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-bold text-[#020817] mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full bg-[#f8fafc] pl-7 pr-3 py-2 border ${
            error ? "border-red-500" : "border-[#e2e8f0]"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default AuthCurrencyInputField;
