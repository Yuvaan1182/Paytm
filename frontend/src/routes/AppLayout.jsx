// AppLayout.js
import Sidebar from './SideBar';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="bg-background-light dark:bg-background-dark flex-1 overflow-y-auto px-6 pt-3 pb-6">
        <Outlet />
      </main>
    </div>
  );
}
