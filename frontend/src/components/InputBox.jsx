import PropTypes from "prop-types";

function InputBox({ label, type, value, placeholder, name, handleChange }) {
  
  return (
    <div className="w-full pt-2">
      <label className="w-full font-semibold text-sm" htmlFor={label}>
        {label}
      </label>
      <input
        className="w-full px-3 py-2 text-base border"
        type={type}
        value={value}
        placeholder={placeholder}  
        id={label}
        onChange={handleChange}
        name={name}
      />
    </div>
  );
}

InputBox.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  name: PropTypes.string.isRequired,
};

export default InputBox;
