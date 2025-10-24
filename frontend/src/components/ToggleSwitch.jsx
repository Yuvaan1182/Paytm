import PropTypes from 'prop-types';

export default function ToggleSwitch({ last7Days, setLast7Days }) {
  return (
    <div
      className="relative flex cursor-pointer items-center rounded-lg dark:bg-gray-700"
      onClick={() => setLast7Days(!last7Days)}
    >
      <div className="flex dark:text-white">
        <div
          className={`flex items-center justify-center rounded-tl-md rounded-bl-md p-2 ${last7Days ? 'inset-shadow-sm inset-shadow-gray-500' : 'shadow-md'} transition-shadow delay-500`}
        >
          Last 7 Days
        </div>
        <div
          className={`flex-1 rounded-tr-md rounded-br-md p-2 ${last7Days ? 'shadow' : 'inset-shadow-sm inset-shadow-gray-500'} transition-shadow delay-500`}
        >
          Monthly
        </div>
      </div>
    </div>
  );
}

ToggleSwitch.propTypes = {
  last7Days: PropTypes.bool.isRequired,
  setLast7Days: PropTypes.func.isRequired,
};
