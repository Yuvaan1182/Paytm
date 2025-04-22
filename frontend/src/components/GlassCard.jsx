import PropTypes from 'prop-types';

const GlassCard = ({ children, className }) => {
  return (
    <div className={`rounded-lg bg-white/10 shadow-lg backdrop-blur-lg ${className}`}>
      {children}
    </div>
  );
};

GlassCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

GlassCard.defaultProps = {
  className: '',
};

export default GlassCard;
