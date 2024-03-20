import React from "react";

function InputBox({ label, type, value, placeholder }) {
  return (
    <div className="w-full pt-2">
      <label className="w-full font-semibold text-sm" htmlFor={label}>
        {label}
      </label>
      <input
        className="w-full px-3 py-2 text-base border"
        type={type}
        value={value}
        placeholder={placeholder}
        id={label}
      />
    </div>
  );
}

export default InputBox;
