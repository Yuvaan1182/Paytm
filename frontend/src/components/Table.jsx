import { ArrowDownRight, ArrowUpLeft, IndianRupee } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Table = ({ data, className }) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleExpand = index => {
    setExpandedRows(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <div className="flex text-sm font-semibold text-gray-500 uppercase">
        {headers.map(header => (
          <div
            key={header}
            className="min-w-50 border-y-2 border-gray-200 px-4 py-3 text-left tracking-widest first:pl-10"
          >
            {header}
          </div>
        ))}
      </div>
      <div className="h-56">
        {data.map((row, index) => (
          <div key={index} className="text-md flex text-gray-600 hover:bg-gray-50">
            {headers.map(header => (
              <div
                key={header}
                className="flex min-w-50 items-center overflow-hidden border-b border-gray-300 px-4 py-4 tracking-wider whitespace-nowrap first:pl-10"
              >
                <span
                  className={`flex items-center ${
                    header.toLowerCase() !== 'status' ? 'font-semibold' : ''
                  } ${header.toLowerCase() === 'amount' && 'text-lg'} ${
                    header.toLowerCase() === 'amount' && row[header] < 0 && 'text-rose-500'
                  } ${header.toLowerCase() === 'amount' && row[header] > 0 && 'text-green-500'} `}
                >
                  {/* {Icon for amount} */}
                  {header.toLowerCase() === 'amount' && <IndianRupee size={16} />}
                  {/* {text for amount } */}
                  {header.toLowerCase() === 'amount' &&
                    row[header].toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}

                  {header.toLowerCase() === 'amount' && row[header] > 0 && (
                    <ArrowUpLeft size={20} />
                  )}

                  {header.toLowerCase() === 'amount' && row[header] < 0 && (
                    <ArrowDownRight size={20} />
                  )}

                  {/* {text for headers other than amount and status } */}
                  {header.toLowerCase() !== 'amount' && header.toLowerCase() !== 'status' && (
                    <span className="break-words whitespace-normal">
                      {expandedRows[index]
                        ? row[header]
                        : row[header]?.length > 25
                          ? `${row[header].slice(0, 10)}...`
                          : row[header]}
                      {row[header]?.length > 50 && (
                        <button
                          onClick={() => toggleExpand(index)}
                          className="ml-2 cursor-pointer text-sm text-blue-500 underline"
                        >
                          {expandedRows[index] ? 'Read Less' : 'Read More'}
                        </button>
                      )}
                    </span>
                  )}

                  {/* {text for status header} */}
                  {header.toLowerCase() === 'status' && (
                    <span
                      className={`w-28 rounded-lg py-2 text-center ${
                        row[header].toLowerCase() === 'completed'
                          ? 'border-green-400 bg-green-100 text-green-600'
                          : row[header].toLowerCase() === 'pending'
                            ? 'bg-gray-100 text-gray-600'
                            : 'border-red-400 bg-red-200 text-red-600'
                      }`}
                    >
                      {row[header]}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
};

export default Table;
