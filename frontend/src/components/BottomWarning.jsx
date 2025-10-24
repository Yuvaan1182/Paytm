import React from 'react';
import { Link } from 'react-router-dom';

function BottomWarning({ to, label, warningText }) {
  return (
    <div className="w-full text-xs font-semibold">
      <span className="text-xs">{warningText}</span>
      <Link className="px-1 text-blue-700 underline" to={to}>
        {label}
      </Link>
    </div>
  );
}

export default BottomWarning;
