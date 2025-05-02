import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './SideBar';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserBalance, userProfile } from '../features/thunks/thunks';

export default function AppLayout() {
  const { user } = useSelector(state => state.profile);
  const { balance } = useSelector(state => state.balance);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(userProfile());
    }
    if (!balance) {
      dispatch(getUserBalance());
    }
  }, [balance, dispatch, user]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="bg-background-light dark:bg-background-dark flex-1 overflow-y-auto px-6 pt-3 pb-6">
        <Outlet />
      </main>
    </div>
  );
}