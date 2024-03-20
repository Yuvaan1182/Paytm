import React from "react";

export default function NavOptions({ name }) {
  return (
    <>
      <ul className="flex justify-evenly items-center gap-1">
        <li>Hello, {name}</li>
        <li>
          <div className="w-8 h-8 flex items-center justify-center rounded-full p-2 font-bold bg-blue-400 text-white">
            {name[0]}
          </div>
        </li>
      </ul>
    </>
  );
}
