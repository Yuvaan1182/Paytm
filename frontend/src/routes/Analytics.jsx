import { NavLink } from 'react-router-dom';
import { Home, User, Settings } from 'lucide-react'; // Optional icons

const navItems = [
  { label: 'Home', to: '/', icon: <Home size={18} /> },
  { label: 'Profile', to: '/profile', icon: <User size={18} /> },
  { label: 'Settings', to: '/settings', icon: <Settings size={18} /> },
];

const Analytics = () => {
  return (
    <div>
      <div>
        <aside className="bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark flex h-screen w-64 flex-col shadow-lg">
          <div className="border-border-light dark:border-border-dark border-b p-6 text-lg font-bold">
            MyApp
          </div>
          <nav className="flex-1 space-y-2 p-4">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'hover:bg-muted-light dark:hover:bg-muted-dark'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
      <div></div>
    </div>
  );
};

export default Analytics;
