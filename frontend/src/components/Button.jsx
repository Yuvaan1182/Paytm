import React from "react";

function Button({ type, label, color }) {
  return (
    <button
      className={`w-full px-3 bg-${color}-400 text-white py-2 font-bold rounded-md`}
      type={type}
    >
      {label}
    </button>
  );
}

export default Button;
