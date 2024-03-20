import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBox({ placeholder, type, value }) {
  return (
    <div className="flex items-center h-full w-full">
      <input
        className="w-full focus:border-r-0 focus:outline-none focus:border-blue-400 py-2 px-3 rounded-md rounded-tr-none rounded-br-none border-2 border-r-0"
        type={type}
        placeholder={placeholder}
        value={value}
      />
      <div className="flex items-center justify-center font-bold bg-blue-400 text-white rounded-md px-4 h-full rounded-bl-none rounded-tl-none">
        <FiSearch />
      </div>
    </div>
  );
}
