import { Landmark, Loader, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useSelector } from 'react-redux';

const TransactionStatusAnalysis = () => {
  const statusCounts = useSelector(state => state.analytics.summary.statusCounts);

  return (
    <div className="rounded-lg border-2 border-gray-300 p-6 shadow-md">
      <h2 className="mb-4 flex items-center justify-between py-4 text-lg tracking-tight">
        <div className="flex gap-4 font-semibold text-gray-700 dark:text-white">
          <Landmark className="text-green-400" />
          Transaction Status Analysis
        </div>
      </h2>
      <div className="flex justify-between">
        {statusCounts &&
          statusCounts.map(({ status, count }) => (
            <div
              key={status}
              className={`flex items-center gap-2 ${status === 'completed' ? 'order-first text-green-600' : status === 'pending' ? 'text-gray-600' : 'text-red-600'}`}
            >
              <span
                className={`grid h-14 w-14 place-items-center rounded-lg border p-2 text-xl font-bold ${status === 'completed' ? 'border-green-400' : status === 'pending' ? 'border-gray-400' : 'border-red-400'}`}
              >
                {count}
              </span>{' '}
              <div className="flex flex-col items-center justify-center gap-2">
                <span className="flex text-lg font-bold">
                  {status === 'completed' && <ThumbsUp />}
                  {status === 'pending' && <Loader />}
                  {status === 'failed' && <ThumbsDown />}
                </span>{' '}
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TransactionStatusAnalysis;
