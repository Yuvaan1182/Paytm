import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircle2 } from 'lucide-react';
import { incrementProgress, setDone } from '../features/progressbar/progressSlice'; // Import actions

const CircularLoaderWithCheck = () => {
  const dispatch = useDispatch();
  const progress = useSelector(state => state.progress.value);
  const done = useSelector(state => state.progress.done);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => dispatch(setDone(true)), 500); // Add slight delay before showing check
    } else {
      const interval = setInterval(() => {
        dispatch(incrementProgress());
      }, 50);

      return () => clearInterval(interval);
    }
  }, [progress, dispatch]);

  return (
    <div className="mt-10 flex flex-col items-center transition-all duration-500">
      {done ? (
        <CheckCircle2 className="animate-ping-once h-24 w-24 text-green-500" />
      ) : (
        <>
          <svg className="h-24 w-24 -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              className="text-gray-300"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            <circle
              className="text-blue-500 transition-all duration-300"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <p className="mt-2 text-xl">{progress}%</p>
        </>
      )}
    </div>
  );
};

export default CircularLoaderWithCheck;
