import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoEyeOff, IoEye } from 'react-icons/io5';

function PasswordInput({ label, placeholder, value, name, handleChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showBanner, setShowBanner] = useState(false);

  const getPasswordStrength = password => {
    if (password.length < 6) return 'Weak';
    if (
      password.match(/[A-Z]/) &&
      password.match(/[a-z]/) &&
      password.match(/[0-9]/) &&
      password.match(/[@$!%*?&]/) &&
      password.length >= 8
    ) {
      return 'Strong';
    }
    return 'Medium';
  };

  useEffect(() => {
    if (value) {
      const strength = getPasswordStrength(value);
      setPasswordStrength(strength);
      setShowBanner(true);
    } else {
      setPasswordStrength('');
      setShowBanner(false);
    }
  }, [value]);

  return (
    <div className="relative">
      <label className="sr-only" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={handleChange}
        maxLength={30} // Limit password to 30 characters
        className={`w-full rounded-lg px-4 py-3 font-bold text-black shadow-lg focus:border-2 bg-white ${
          passwordStrength === 'Weak'
            ? 'focus:outline-red-700'
            : passwordStrength === 'Strong'
              ? 'focus:outline-green-400'
              : passwordStrength === 'Medium'
                ? 'focus:outline-yellow-400'
                : 'focus:outline-gray-400'
        }`}
      />
      <button
        type="button"
        className="absolute top-4 right-4 text-lg" // Removed dynamic text color for icons
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <IoEye /> : <IoEyeOff />}
      </button>
    </div>
  );
}

PasswordInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PasswordInput;
