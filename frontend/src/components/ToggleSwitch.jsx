import { useState } from 'react';
import { motion } from 'motion/react';

export default function ToggleSwitch() {
  const [isDaily, setIsDaily] = useState(false);

  return (
    <div
      className="relative flex h-11 w-36 cursor-pointer items-center rounded-lg bg-gray-200 px-1 dark:bg-gray-700"
      onClick={() => setIsDaily(!isDaily)}
    >
      {/* Animated Background Pill */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`absolute w-[48%] ${isDaily ? 'px-2' : 'mx-1'} z-0 h-[90%] rounded-md bg-white shadow-sm dark:bg-gray-100`}
        style={{ left: isDaily ? '50%' : '0%', top: '5%' }}
      />

      {/* Labels */}
      <div className="relative z-10 flex w-full items-center justify-between px-2 text-base font-semibold">
        <span
          className={`transition-colors duration-300 ${
            isDaily ? 'text-gray-500' : 'text-gray-700'
          }`}
        >
          Weekly
        </span>
        <span
          className={`transition-colors duration-300 ${
            isDaily ? 'text-gray-700' : 'text-gray-500'
          }`}
        >
          Daily
        </span>
      </div>
    </div>
  );
}
