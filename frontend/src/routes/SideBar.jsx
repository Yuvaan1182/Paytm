import {
  ArrowRightLeft,
  CircleUserRound,
  LayoutDashboard,
  Menu,
  Moon,
  NotebookTabs,
  Settings,
  Sun,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { logout } from '../features/auth/authSlice';
import { toggleTheme } from '../features/theme/themeSlice';
import { toggleSidebar } from '../features/ui/uiSlice';

const navItems = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: 'Payments',
    to: '/transfer',
    icon: <ArrowRightLeft size={20} />,
  },
  {
    label: 'transactions',
    to: '/transaction',
    icon: <NotebookTabs size={20} />,
  },
];

export default function Sidebar() {
  const collapsed = useSelector(state => state.ui.isSidebarOpen);
  const uiState = useSelector(state => state.ui);

  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.mode);
  const { isAuthenticated } = useSelector(state => state.auth);

  const toggleMenu = () => {
    dispatch(toggleSidebar(!collapsed));
  };

  return (
    isAuthenticated && (
      <GlassCard
        className={`h-screen text-slate-50 ${
          collapsed ? 'w-16' : 'w-64'
        } flex flex-col shadow-lg transition-all duration-300`}
      >
        <div className="flex items-center justify-between border-b border-gray-300 p-4">
          {!collapsed && (
            <div className="flex text-lg font-bold text-rose-700 uppercase transition-all duration-400">
              ₹ Velora
            </div>
          )}
          <button
            onClick={() => toggleMenu()}
            className={`cursor-pointer rounded p-1 text-pink-700 shadow-sm shadow-gray-700 transition-colors duration-300`}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-1 flex-col justify-between space-y-1 border-b border-gray-300 p-2">
          <div className="flex flex-col space-y-1">
            {!collapsed && (
              <p className="px-3 py-2 text-gray-500 transition-all duration-300">General</p>
            )}
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md py-3 pr-2 pl-3 font-medium transition-colors ${
                    isActive
                      ? 'bg-pink-700 text-pink-100'
                      : 'text-gray-600 hover:bg-pink-900 hover:text-white'
                  }`
                }
              >
                {item.icon}
                {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </NavLink>
            ))}
          </div>
          <div className="flex flex-col space-y-1">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md p-3 font-medium transition-colors ${
                  isActive
                    ? 'bg-pink-700 text-pink-100'
                    : 'text-gray-600 hover:bg-pink-900 hover:text-white'
                }`
              }
            >
              <Settings size={20} />
              {!collapsed && <span className="whitespace-nowrap">Settings</span>}
            </NavLink>
            <div
              onClick={() => dispatch(toggleTheme())}
              className="flex cursor-pointer items-center gap-3 rounded-md p-3 font-medium text-gray-600 transition hover:bg-pink-900 hover:text-white"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              {!collapsed && (
                <span className="whitespace-nowrap capitalize">
                  {theme === 'dark' ? 'light' : 'dark'} Mode
                </span>
              )}
            </div>
          </div>
        </nav>
        <div className="flex flex-col space-y-1 p-2">
          <div
            onClick={() => dispatch(logout())}
            className={`flex items-center ${
              collapsed ? 'p-3' : 'gap-3 p-3'
            } cursor-pointer rounded-md border-2 border-gray-300 font-medium shadow-xs shadow-gray-300 transition`}
          >
            <CircleUserRound size={20} className="text-pink-700" />
            {!collapsed && (
              <div>
                <div className="whitespace-nowrap text-gray-700">Demon God</div>
                <div className="text-primary text-sm text-gray-600">darkmode@gmail.com</div>
              </div>
            )}
          </div>
        </div>
        {!collapsed && (
          <div className="py-1 text-center text-xs text-gray-700">©2025 ₹ Velora India.</div>
        )}
      </GlassCard>
    )
  );
}
