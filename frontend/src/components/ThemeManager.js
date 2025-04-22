import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ThemeManager = ({ children }) => {
  const mode = useSelector(state => state.theme.mode);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);
  }, [mode]);

  return children; // This component does not render anything
};

export default ThemeManager;
