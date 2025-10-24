import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Table = ({ className }) => {
  const recentTransactions = useSelector(state => state.analytics.summary.recentTransactions);

  const [expandedRows, setExpandedRows] = useState({});
  const toggleExpand = index => {
    setExpandedRows(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!recentTransactions || recentTransactions.length === 0) {
    return <div>No data available</div>;
  }

  // Filter and map headers: convert _id to ID, remove _v
  const headers = Object.keys(recentTransactions[0]);

  const updateHeader = header => {
    if (header === '_id') return 'Transaction ID';
    if (header === 'senderId') return 'Sender ID';
    if (header === 'receiverId') return 'Receiver ID';
    if (header === 'createdAt') return 'Created At';
    if (header === 'updatedAt') return 'Updated At';
    if (header === 'senderEmail') return 'Sender Email';
    if (header === 'receiverEmail') return 'Receiver Email';
    if (header === 'transactionType') return 'Transaction Type';
    if (header === 'senderName') return 'Sender Name';
    if (header === 'receiverName') return 'Receiver Name';
    return header;
  };

  const formatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <div className="flex text-sm font-semibold text-gray-700 uppercase dark:text-white">
        {headers.map(header => (
          <div
            key={header}
            className="min-w-80 border-y-2 border-gray-200 px-4 py-3 text-left tracking-widest first:pl-10"
          >
            {updateHeader(header)}
          </div>
        ))}
      </div>
      <div className="h-56 overscroll-contain">
        {recentTransactions.map((row, index) => (
          <div key={index} className="text-md flex text-gray-600 hover:bg-gray-50">
            {headers.map((header, idx) => {
              // Map 'ID' header back to '_id' for row access
              const dataKey = header;
              return (
                <div
                  key={idx}
                  className="flex min-w-80 items-center overflow-hidden border-b border-gray-300 px-4 py-4 tracking-wider whitespace-nowrap text-gray-500 first:pl-10"
                >
                  <span
                    className={`flex items-center ${
                      header.toLowerCase() !== 'status' ? 'font-semibold' : ''
                    } ${header.toLowerCase() === 'amount' && 'text-lg'} ${
                      header.toLowerCase() === 'amount' && row[dataKey] < 0 && 'text-rose-500'
                    } ${header.toLowerCase() === 'amount' && row[dataKey] > 0 && 'text-green-500'} `}
                  >
                    {/* {text for amount } */}
                    {header.toLowerCase() === 'amount' &&
                      Math.abs(row[dataKey]).toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}

                    {header.toLowerCase() === 'amount' && row[dataKey] > 0 && (
                      <ArrowDownLeft size={20} />
                    )}

                    {header.toLowerCase() === 'amount' && row[dataKey] < 0 && (
                      <ArrowUpRight size={20} />
                    )}

                    {/* {text for ID createdAt or updatedAt} */}
                    {(header.toLowerCase() === 'createdat' ||
                      header.toLowerCase() === 'updatedat') &&
                      formatter.format(new Date(row[dataKey]))}

                    {/* {text for headers other than amount and status } */}
                    {header.toLowerCase() !== 'amount' &&
                      header.toLowerCase() !== 'status' &&
                      header.toLowerCase() !== 'createdat' &&
                      header.toLowerCase() !== 'updatedat' && (
                        <span className="break-words whitespace-normal">
                          {expandedRows[index]
                            ? row[dataKey].length === 0 ||
                              row[dataKey] === null ||
                              row[dataKey] === undefined
                              ? 'N/A'
                              : row[dataKey]
                            : row[dataKey]?.length > 25
                              ? `${row[dataKey]?.slice(0, 10)}...`
                              : row[dataKey] === null ||
                                  row[dataKey] === undefined ||
                                  row[dataKey].length === 0
                                ? 'N/A'
                                : row[dataKey]}
                          {row[dataKey]?.length > 50 ? (
                            <button
                              onClick={() => toggleExpand(index)}
                              className="ml-2 cursor-pointer text-sm text-blue-500 underline"
                            >
                              {expandedRows[index] ? 'Read Less' : 'Read More'}
                            </button>
                          ) : (
                            row[dataKey]?.length == 0 && 'N/A'
                          )}
                        </span>
                      )}

                    {/* {text for status header} */}
                    {header.toLowerCase() === 'status' && (
                      <span
                        className={`w-28 rounded-lg py-2 text-center ${
                          row[dataKey].toLowerCase() === 'completed'
                            ? 'border-green-400 bg-green-100 text-green-600'
                            : row[dataKey].toLowerCase() === 'pending'
                              ? 'bg-gray-100 text-gray-600'
                              : 'border-red-400 bg-red-200 text-red-600'
                        }`}
                      >
                        {row[dataKey] === null || row[dataKey] === undefined ? 'N/A' : row[dataKey]}
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

Table.propTypes = {
  className: PropTypes.string,
};

export default Table;
