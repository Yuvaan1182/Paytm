import { Activity, IndianRupee } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CashFlow from '../components/CashFlow';
import ProgressBar from '../components/ProgressBar';
import Table from '../components/Table';
import TopSpendingUsers from '../components/TopSpendingUsers';
import TransactionStatusAnalysis from '../components/TransactionStatusAnalysis';
import { logout } from '../features/auth/authSlice';
import { getSummary } from '../features/thunks/thunks';
import WalletMoney from '../components/WalletMoney';

function Dashboard() {
  const { balance } = useSelector(state => state.balance);
  const [loading, setLoading] = useState(true); // Add loading state
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
    if (!isAuthenticated) {
      dispatch(logout());
    }
    dispatch(getSummary());
  }, [isAuthenticated, dispatch]);

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <div className="flex h-full flex-col gap-4 pb-6">
      <div className="flex gap-5">
        <div className="flex flex-1/3 items-center justify-between gap-4 rounded-lg bg-pink-700 px-8 py-6 text-white">
          <div className="flex flex-col gap-3">
            <div className="text-3xl text-gray-100">Total Balance</div>
            <div className="flex items-center text-7xl font-bold">
              <IndianRupee size={36} />{' '}
              {balance.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* <div
              onClick={() => showWallet}
              className="flex cursor-pointer items-center justify-between gap-2 rounded-xl bg-white px-4 py-2 text-sm text-pink-700"
            >
              <Plus size={16} /> <span>Add</span>
            </div> */}
            {/* <GlassCard className="flex cursor-pointer items-center justify-between gap-2 rounded-md bg-slate-700 px-4 py-2 text-sm text-slate-100">
            <ArrowUp size={16} /> <span>Send</span>
          </GlassCard> */}
            {/* <GlassCard className="flex cursor-pointer items-center justify-between gap-2 rounded-md bg-slate-700 px-4 py-2 text-sm text-slate-100">
            <GitPullRequestArrow size={16} /> <span>Request</span>
          </GlassCard> */}
            {/* <GlassCard className="flex cursor-pointer items-center justify-between gap-2 rounded-md bg-slate-700 p-2 text-sm text-slate-100">
            <Ellipsis size={16} />
          </GlassCard> */}
          </div>
        </div>
        <div className="flex flex-2/3 flex-col items-center justify-between gap-4 rounded-lg bg-slate-700 px-8 py-6 text-white">
          <WalletMoney />
        </div>
      </div>

      <CashFlow />

      <div className="flex gap-4">
        <div className="flex max-w-2/3 flex-2/3 flex-col rounded-lg border-2 border-gray-300 pb-4 shadow-md">
          <div className="flex items-center justify-between px-10 py-6">
            <div className="flex gap-2 text-lg font-semibold text-gray-700 dark:text-white">
              <Activity className="text-rose-500" size={24} /> Recent Activity
            </div>
          </div>
          <Table className="h-full w-full" />
        </div>
        <div className="flex flex-1/3 flex-col gap-4">
          {/* Transaction Status Analysis Section> */}
          <TransactionStatusAnalysis />

          {/* Top Spending Users Section */}
          <TopSpendingUsers />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
