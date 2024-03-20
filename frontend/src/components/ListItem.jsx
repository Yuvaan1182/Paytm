import React from "react";
import Button from "./Button";

export default function ListItem({ name }) {
  return (
    <div className="flex items-center justify-between rounded-md shadow-sm border-gray-300 border-2 p-2">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 text-white bg-blue-400 rounded-full flex items-center justify-center">
          {name[0]}
        </div>
        <div className="text-base font-sans font-semibold">{name}</div>
      </div>
      <div>
        <Button label={"Send Money"} type={"submit"} color={"blue"} />
      </div>
    </div>
  );
}
