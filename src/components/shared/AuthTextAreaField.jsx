import React from "react";

function AuthTextAreaField({ label, name, value, onChange, error, placeholder = "", required = false, rows = 3 }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-bold text-[#020817] mb-2">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={`w-full bg-[#f8fafc] px-3 py-2 border ${
          error ? "border-red-500" : "border-[#e2e8f0]"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
        placeholder={placeholder}
      ></textarea>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default AuthTextAreaField;
