import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const MultiSelectCheckbox = ({ selectedOptions, setSelectedOptions }) => {
  const { transactions } = useSelector(state => state.transactions);

  const transactionKeys = transactions[0] ? Object.keys(transactions[0]) : [];

  const updatedKeys = transactionKeys.map(key => {
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
  });

  const options = updatedKeys;

  const handleCheckboxChange = event => {
    const { value, checked } = event.target;

    setSelectedOptions(prevSelected =>
      checked ? [...prevSelected, value] : prevSelected.filter(option => option !== value)
    );
  };

  return (
    <div className="">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Select Fields</h2>

      <div className="flex flex-wrap gap-5">
        {options.map(option => (
          <label
            key={option}
            className="flex cursor-pointer items-center space-x-3 rounded-md px-4 py-2 transition hover:bg-gray-700"
          >
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700 dark:text-white">{option}</span>
          </label>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="mb-2 text-lg font-medium text-gray-700">Selected:</h3>
        <div className="flex flex-wrap gap-2">
          {selectedOptions.length > 0 ? (
            selectedOptions.map(item => (
              <span
                key={item}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
              >
                {item}
              </span>
            ))
          ) : (
            <p className="text-gray-500 italic dark:text-amber-300">None selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSelectCheckbox;

MultiSelectCheckbox.propTypes = {
  selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedOptions: PropTypes.func.isRequired,
};
