import * as icons from 'lucide-react';
import PropTypes from 'prop-types';
import { categories } from '../assets/tests/categories';

const CategoryTag = ({ categoryKey }) => {
  const category = categories.find(c => c.key === categoryKey);
  const Icon = icons[category?.icon] || icons.HelpCircle;

  return (
    <span className={`inline-flex items-center gap-1 py-1 text-2xl font-medium ${category.color}`}>
      <Icon className="h-4 w-4" />
      {category.label}
    </span>
  );
};

CategoryTag.propTypes = {
  categoryKey: PropTypes.string.isRequired,
};

export default CategoryTag;
