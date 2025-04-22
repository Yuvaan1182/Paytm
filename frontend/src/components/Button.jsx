import PropTypes from 'prop-types';

function Button({ type, label, color, handleClick, disabled }) {
  return (
    <button
      className={`w-full rounded-md  bg-${color}-900 p-3 rounded-md font-bold text-2xl text-white`}
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
