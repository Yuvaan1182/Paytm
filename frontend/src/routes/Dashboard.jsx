import {
  Activity,
  ArrowUp,
  ArrowUpDown,
  Ellipsis,
  GitPullRequestArrow,
  IndianRupee,
  ListFilter,
  Plus,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CashFlow from '../components/CashFlow';
import GlassCard from '../components/GlassCard';
import ProgressBar from '../components/ProgressBar';
import Table from '../components/Table';
import TopSpendingUsers from '../components/TopSpendingUsers';
import TransactionStatusAnalysis from '../components/TransactionStatusAnalysis';
import { logout } from '../features/auth/authSlice';

function Dashboard() {
  const { balance } = useSelector(state => state.balance);
  const [loading, setLoading] = useState(true); // Add loading state
  const { isAuthenticated } = useSelector(state => state.auth);
  const userList = useSelector(state => state.dashboard.userList);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('users', userList);
  }, [userList, dispatch]);

  useEffect(() => {
    setLoading(false);
    if (!isAuthenticated) {
      dispatch(logout());
    }
  }, [isAuthenticated, dispatch]);

  const sampleTransactions = [
    {
      id: 1,
      date: '2023-10-01',
      description:
        'Grocery Shopping fdsajflsk adjfklj asklfjalkjsdlkfj as;ldfjsladkfjslakfjslakfj sldkfjaslk jsldfkjasdlkfjaslkfj aslkfj askldfjsdlk fjsadklfjlaskdf jl',
      amount: -1500,
      type: 'Expense',
      status: 'Completed',
      category: 'Food',
      paymentMethod: 'Credit Card',
      merchant: 'SuperMart',
      location: 'Cityville',
      referenceId: 'TXN123456',
    },
    {
      id: 2,
      date: '2023-10-02',
      description: 'Salary',
      amount: 50000,
      type: 'Income',
      status: 'Completed',
      category: 'Salary',
      paymentMethod: 'Bank Transfer',
      merchant: 'TechCorp',
      location: 'Cityville',
      referenceId: 'TXN123457',
    },
    {
      id: 3,
      date: '2023-10-03',
      description: 'Electricity Bill',
      amount: -2000,
      type: 'Expense',
      status: 'Pending',
      category: 'Utilities',
      paymentMethod: 'Net Banking',
      merchant: 'PowerGrid',
      location: 'Townsville',
      referenceId: 'TXN123458',
    },
    {
      id: 4,
      date: '2023-10-04',
      description: 'Freelance Payment',
      amount: 12000,
      type: 'Income',
      status: 'Completed',
      category: 'Freelance',
      paymentMethod: 'PayPal',
      merchant: 'Client A',
      location: 'Online',
      referenceId: 'TXN123459',
    },
    {
      id: 5,
      date: '2023-10-05',
      description: 'Dining Out',
      amount: -2500,
      type: 'Expense',
      status: 'Failed',
      category: 'Entertainment',
      paymentMethod: 'Debit Card',
      merchant: 'Foodies',
      location: 'Metropolis',
      referenceId: 'TXN123460',
    },
    {
      id: 6,
      date: '2023-10-06',
      description: 'Gym Membership',
      amount: -3000,
      type: 'Expense',
      status: 'Completed',
      category: 'Health',
      paymentMethod: 'Credit Card',
      merchant: 'FitLife Gym',
      location: 'Uptown',
      referenceId: 'TXN123461',
    },
    {
      id: 7,
      date: '2023-10-07',
      description: 'Stock Dividend',
      amount: 2000,
      type: 'Income',
      status: 'Completed',
      category: 'Investment',
      paymentMethod: 'Bank Transfer',
      merchant: 'StockBroker',
      location: 'Online',
      referenceId: 'TXN123462',
    },
    {
      id: 8,
      date: '2023-10-08',
      description: 'Car Repair',
      amount: -8000,
      type: 'Expense',
      status: 'Completed',
      category: 'Automobile',
      paymentMethod: 'Cash',
      merchant: 'AutoFix',
      location: 'Suburbia',
      referenceId: 'TXN123463',
    },
    {
      id: 9,
      date: '2023-10-09',
      description: 'Gift Received',
      amount: 5000,
      type: 'Income',
      status: 'Completed',
      category: 'Gift',
      paymentMethod: 'Cash',
      merchant: 'Friend',
      location: 'Cityville',
      referenceId: 'TXN123464',
    },
    {
      id: 10,
      date: '2023-10-10',
      description: 'Online Course',
      amount: -10000,
      type: 'Expense',
      status: 'Completed',
      category: 'Education',
      paymentMethod: 'Credit Card',
      merchant: 'EduPlatform',
      location: 'Online',
      referenceId: 'TXN123465',
    },
  ];

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <div className="flex h-full flex-col gap-4 pb-6">
      <div className="flex items-center justify-between gap-4 rounded-lg bg-pink-700 px-8 py-6 text-white">
        <div className="flex flex-col gap-3">
          <div className="text-gray-100">Total Balance</div>
          <div className="flex items-center text-4xl font-bold">
            <IndianRupee size={36} />{' '}
            {balance.toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex cursor-pointer items-center justify-between gap-2 rounded-xl bg-white px-4 py-2 text-sm text-pink-700">
            <Plus size={16} /> <span>Add</span>
          </div>
          <GlassCard className="flex cursor-pointer items-center justify-between gap-2 rounded-md bg-slate-700 px-4 py-2 text-sm text-slate-100">
            <ArrowUp size={16} /> <span>Send</span>
          </GlassCard>
          <GlassCard className="flex cursor-pointer items-center justify-between gap-2 rounded-md bg-slate-700 px-4 py-2 text-sm text-slate-100">
            <GitPullRequestArrow size={16} /> <span>Request</span>
          </GlassCard>
          <GlassCard className="flex cursor-pointer items-center justify-between gap-2 rounded-md bg-slate-700 p-2 text-sm text-slate-100">
            <Ellipsis size={16} />
          </GlassCard>
        </div>
      </div>

      <CashFlow />

      <div className="flex gap-4">
        <div className="flex max-w-2/3 flex-2/3 flex-col rounded-lg border-2 border-gray-300 pb-4 shadow-md">
          <div className="flex items-center justify-between px-10 py-6">
            <div className="flex gap-2 text-lg font-semibold text-gray-700">
              <Activity className="text-rose-500" size={24} /> Recent Activity
            </div>
            <div className="flex items-center gap-4">
              <GlassCard className="flex cursor-pointer items-center justify-between gap-2 rounded-md border px-4 py-2 text-sm">
                <ListFilter size={16} /> <span>Filter</span>
              </GlassCard>
              <GlassCard className="flex cursor-pointer items-center justify-between gap-2 rounded-md border px-4 py-2 text-sm">
                <ArrowUpDown size={16} /> <span>Sort</span>
              </GlassCard>
              <GlassCard className="flex cursor-pointer items-center justify-between gap-2 rounded-md border p-2 text-sm">
                <Ellipsis size={16} />
              </GlassCard>
            </div>
          </div>
          <Table data={sampleTransactions} className="h-full w-full" />
        </div>
        <div className="flex flex-1/3 flex-col gap-4">
          <TransactionStatusAnalysis transactions={sampleTransactions} />

          {/* Top Spending Users Section */}
          <TopSpendingUsers transactions={sampleTransactions} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
