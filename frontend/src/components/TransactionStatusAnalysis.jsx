import { Landmark, Loader, ThumbsDown, ThumbsUp } from 'lucide-react';
import PropTypes from 'prop-types';

const TransactionStatusAnalysis = ({ transactions }) => {
  const statusCounts = transactions.reduce(
    (acc, transaction) => {
      const status = transaction.status.toLowerCase();
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    { completed: 0, pending: 0, failed: 0 }
  );

  return (
    <div className="rounded-lg border-2 border-gray-300 p-6 shadow-md">
      <h2 className="mb-4 flex items-center justify-between py-4 text-lg tracking-tight">
        <div className="flex gap-4 font-semibold text-gray-700">
          <Landmark className="text-green-400" />
          Transaction Status Analysis
        </div>
        <div className="text-gray-400">Today{"'"}s</div>
      </h2>
      <div className="flex justify-between">
        <div className="flex items-center gap-2 text-green-600">
          <span className="rounded-lg border border-green-400 px-4 py-2">
            {statusCounts.completed}
          </span>{' '}
          <div className="flex flex-col">
            <span className="flex gap-2 text-lg font-bold">
              <ThumbsUp />
            </span>{' '}
            Completed
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="rounded-lg border border-gray-400 px-4 py-2">
            {statusCounts.pending}
          </span>{' '}
          <div className="flex flex-col">
            <span className="flex gap-2 text-lg font-bold">
              <Loader />
            </span>{' '}
            Pending
          </div>
        </div>
        <div className="flex items-center gap-2 text-red-600">
          <span className="rounded-lg border border-red-400 px-4 py-2">{statusCounts.failed}</span>{' '}
          <div className="flex flex-col">
            <span className="flex gap-2 text-lg font-bold">
              <ThumbsDown />
            </span>{' '}
            Failed
          </div>
        </div>
      </div>
    </div>
  );
};

TransactionStatusAnalysis.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TransactionStatusAnalysis;
