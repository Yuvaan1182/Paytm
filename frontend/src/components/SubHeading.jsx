import PropTypes from 'prop-types';

const SubHeading = ({ label }) => {
  return <div className="px-4 py-2 text-center text-sm text-gray-400">{label}</div>;
};

SubHeading.propTypes = {
  label: PropTypes.string.isRequired,
};

export default SubHeading;
