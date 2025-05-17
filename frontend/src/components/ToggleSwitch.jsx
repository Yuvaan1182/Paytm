import { useState } from 'react';

export default function ToggleSwitch() {
  const [isDaily, setIsDaily] = useState(true);

  return (
    <div
      className="relative flex cursor-pointer items-center rounded-lg dark:bg-gray-700"
      onClick={() => setIsDaily(!isDaily)}
    >
      <div className="flex">
        <div
          className={`flex-1 rounded-tl-md rounded-bl-md p-2 ${isDaily ? 'shadow-md' : 'inset-shadow-sm inset-shadow-gray-500'} transition-shadow delay-500`}
        >
          Daily
        </div>
        <div
          className={`flex-1 rounded-tr-md rounded-br-md p-2 ${isDaily ? 'inset-shadow-sm inset-shadow-gray-500' : 'shadow'} transition-shadow delay-500`}
        >
          Weekly
        </div>
      </div>
    </div>
  );
}
