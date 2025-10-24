import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

export default function SearchBox({ placeholder, type, value, handleChange, handleClick }) {
  return (
    <div className="flex h-full items-center">
      <input
        className="rounded-md rounded-tr-none rounded-br-none border-2 border-r-0 bg-slate-900 px-3 py-2 text-slate-400 focus:border-r-0 focus:border-b-slate-800 focus:outline-none"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
      <div
        className="flex h-full items-center justify-center rounded-md rounded-tl-none rounded-bl-none bg-blue-400 px-4 font-bold text-white"
        onClick={handleClick}
      >
        <FiSearch />
      </div>
    </div>
  );
}

SearchBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};
