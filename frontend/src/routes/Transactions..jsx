import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GlassCard from '../components/GlassCard';
import MultiSelectCheckbox from '../components/MultiSelectCheckbox';
import { getUserTransactions } from '../features/thunks/thunks';

const Transactions = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const transactions = useSelector(state => state.transactions.transactions);
  const dispatch = useDispatch();

  function updateKey(key) {
    if (key === '_id') {
      return 'ID';
    }
    if (key === 'amount') {
      return 'Amount';
    }
    if (key === 'category') {
      return 'Category';
    }
    if (key === 'transactionType') {
      return 'Type';
    }
    if (key === 'createdAt') {
      return 'Timestamp';
    }
    if (key === 'receiverEmail') {
      return 'Receiver Email';
    }
    if (key === 'senderEmail') {
      return 'Sender Email';
    }
    if (key === 'receiverName') {
      return 'Receiver Name';
    }
    if (key === 'senderName') {
      return 'Sender Name';
    }
    if (key === 'status') {
      return 'Status';
    }
    return key;
  }

  useEffect(() => {
    dispatch(getUserTransactions());
  }, [dispatch]);

  return (
    <GlassCard className="z-1 flex flex-col gap-4 dark:text-white">
      <GlassCard className="p-4">
        <h1 className="text-4xl font-semibold text-gray-700 dark:text-white">
          Transactions History
        </h1>
      </GlassCard>
      <GlassCard className="p-4">
        <GlassCard className="mb-4 p-4">
          {/* Filters    */}
          <MultiSelectCheckbox
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        </GlassCard>
        {/* Table */}
        <GlassCard className="p-4">
          {selectedOptions.length === 0 ? (
            'Please select at least one field to display.'
          ) : (
            <div className="overflow-x-auto">
              <div className="mb-2 flex gap-2">
                {selectedOptions.map(option => (
                  <div
                    key={option}
                    className="min-w-96 border-4 bg-gray-100 px-4 py-2 text-left text-lg font-semibold whitespace-nowrap uppercase dark:bg-transparent"
                  >
                    {option}
                  </div>
                ))}
              </div>
              {transactions.map(transaction => (
                <div key={transaction._id} className="mb-2 flex gap-2">
                  {selectedOptions.map(option => {
                    // Find the original key for this label
                    const originalKey = Object.keys(transaction).find(k => updateKey(k) === option);
                    let value = originalKey ? transaction[originalKey] : '';
                    if (
                      originalKey === 'createdAt' &&
                      typeof value === 'string' &&
                      value.includes('T')
                    ) {
                      const date = new Date(value);
                      const options = {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      };
                      value = date.toLocaleString('en-IN', options);
                    } else if (originalKey === 'amount' && typeof value === 'number') {
                      value = `₹${value}`;
                    }
                    return (
                      <div
                        key={originalKey}
                        className={`min-w-96 border px-4 py-2 whitespace-nowrap capitalize dark:text-gray-300 ${originalKey === 'amount' && transaction.transactionType === 'debit' ? 'text-red-300' : originalKey === 'amount' && transaction.transactionType === 'credit' ? 'text-green-300' : ''}`}
                        style={{ textTransform: 'capitalize' }}
                      >
                        {value ? value.toString() : '-'}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </GlassCard>
        <p className="p-4 text-sm text-gray-500">Total Transactions: {transactions.length}</p>
      </GlassCard>
    </GlassCard>
  );
};

export default Transactions;
