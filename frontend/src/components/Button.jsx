import PropTypes from "prop-types";

function Button({ type, label, color, handleClick, disabled }) {
  return (
    <button
      className={`w-full px-3 bg-${color}-400 text-white py-2 font-bold rounded-md`}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

Button.propTypes = {  
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
