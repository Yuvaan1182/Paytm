import { motion } from 'framer-motion';

const DonutChart = ({
  size = 150,
  strokeWidth = 30,
  percentage = 100,
  gradientId = 'gradient',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} className="relative">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#101828" /> {/* Tailwind color: rose-700 */}
            <stop offset="100%" stopColor="#101828" /> {/* Tailwind color: rose-500 */}
          </linearGradient>
        </defs>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#612214"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
      </svg>
      {/* Percentage Label */}
      <motion.div
        className="absolute text-xl font-bold"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        {/* {percentage}% */}
        <svg
          className="h-32 w-32 text-[#fff] ml-10 mb-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
    </div>
  );
};

export default DonutChart;
