import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function PasswordInputField({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label} {name === 'password' && <span className="text-gray-500">(8 characters min)</span>}
        </label>
        {/* Optional: Add Forgot password link here if needed, or keep it outside */}
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-3 py-2 pr-10 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default PasswordInputField; 