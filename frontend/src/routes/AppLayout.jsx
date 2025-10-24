import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getUserBalance, userProfile } from '../features/thunks/thunks';
import Sidebar from './SideBar';

export default function AppLayout() {
  const { user } = useSelector(state => state.profile);
  const { balance } = useSelector(state => state.balance);
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(userProfile());
    }
    if (!balance) {
      dispatch(getUserBalance());
    }
  }, [balance, dispatch, user]);

  return isAuthenticated ? (
    <div className="flex h-screen">
      <Sidebar />
      <main className="bg-background-light dark:bg-background-dark h-full flex-1 overflow-y-auto px-6 pt-3 pb-6">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
}
