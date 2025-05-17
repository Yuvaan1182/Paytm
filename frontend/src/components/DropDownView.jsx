import { ChevronLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import propTypes from 'prop-types';
import { useState } from 'react';

const DropDownView = ({ label = 'Menu', options = [], onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(label);

  const toggleDropdown = () => setOpen(!open);

  const handleSelect = value => {
    onSelect(value);
    setSelectedValue(value);
    setOpen(false);
  };

  return (
    <div className="relative z-10 inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex rounded bg-gray-50 px-4 py-2 text-rose-500 hover:bg-gray-900 dark:bg-gray-700"
      >
        {selectedValue} <ChevronLeft size={24} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, x: -150, y: -50 }}
            animate={{ opacity: 1, x: -170 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 h-70 w-40 overflow-auto rounded border border-gray-200 bg-white shadow-lg"
          >
            {options.map(opt => (
              <li
                key={opt.key}
                onClick={() => handleSelect(opt.key)}
                className="z-50 cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                {opt.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDownView;

DropDownView.propTypes = {
  label: propTypes.string,
  options: propTypes.array,
  onSelect: propTypes.func,
};
