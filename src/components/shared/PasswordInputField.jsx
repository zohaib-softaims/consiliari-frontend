import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

function PasswordInputField({ label, name, value, onChange, error, required = false, forgotLink, placeholder = "" }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={name} className="block text-sm font-bold text-[#020817] mb-1">
          {label}
        </label>
        {forgotLink && (
          <Link to={forgotLink} className="text-sm text-[#2f279c] font-medium hover:underline">
            Forgot Password?
          </Link>
        )}
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full bg-[#f8fafc] px-3 py-2 pr-10 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {showPassword ? <EyeOff className="h-6 w-6 text-[#2f279c]" /> : <Eye className="h-6 w-6 text-[#2f279c]" />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default PasswordInputField;
