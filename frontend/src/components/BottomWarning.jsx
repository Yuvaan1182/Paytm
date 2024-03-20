import React from "react";
import { Link } from "react-router-dom";

function BottomWarning({ to, label, warningText }) {
  return (
    <div className="w-full text-xs font-semibold">
      <span className="text-xs ">{warningText}</span>
      <Link className="text-blue-700 underline px-1" to={to}>
        {label}
      </Link>
    </div>
  );
}

export default BottomWarning;
