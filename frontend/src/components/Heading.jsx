import PropTypes from 'prop-types';

const Heading = ({ label }) => {
  return <div className="pt-4 text-4xl font-bold text-blue-400">{label}</div>;
};

Heading.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Heading;
