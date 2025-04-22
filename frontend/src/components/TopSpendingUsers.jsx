import PropTypes from 'prop-types';
import { AudioLines, IndianRupee } from 'lucide-react';
import { useState } from 'react';

const TopSpendingUsers = ({ transactions }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = index => {
    setExpanded(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const topSpendingUsers = transactions
    .filter(txn => txn.amount < 0) // Filter only expenses
    .sort((a, b) => b.amount - a.amount) // Sort by highest expense
    .slice(0, 2); // Take top 2

  return (
    <div className="flex flex-col gap-4 rounded-lg border-2 border-gray-300 px-6 py-4 shadow-md">
      <h2 className="flex items-baseline gap-2 text-lg font-semibold text-gray-700">
        <AudioLines className="text-rose-500" />
        Top <span className="text-2xl">2</span> Transactions
      </h2>
      <div className="flex flex-col gap-4">
        {topSpendingUsers.map((txn, index) => {
          const words = txn.description.split(' ');
          const isExpanded = expanded[index];
          const visibleDescription = isExpanded
            ? txn.description
            : words.slice(0, 3).join(' ') + (words.length > 3 ? '...' : '');

          return (
            <div
              key={index}
              className="flex items-center justify-between rounded-md border border-gray-300 p-4 shadow-sm"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700">{txn.merchant}</span>
                <span className="text-sm text-gray-500">
                  {visibleDescription}
                  {words.length > 3 && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className="ml-2 cursor-pointer text-blue-500 underline"
                    >
                      {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1 font-bold text-rose-500">
                <IndianRupee size={16} />{' '}
                {Math.abs(txn.amount).toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

TopSpendingUsers.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      merchant: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TopSpendingUsers;
