import { ArrowDownUp } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import BarChart from './BarChart';
import ToggleSwitch from './ToggleSwitch';

const CashFlow = () => {
  const { summary, loading, error } = useSelector(state => state.analytics);

  console.log('cashflow', summary);

  const [last7Days, setLast7Days] = useState(true);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="error-message">No data available</div>
      </div>
    );
  }

  let income = 0;
  let expense = 0;

  last7Days
    ? summary.weeklyIncomeExpense.forEach(item => {
        income += item.income;
        expense += item.expense;
      })
    : summary.monthlyIncomeExpense.forEach(item => {
        income += item.income;
        expense += item.expense;
      });

  return (
    <div className="flex gap-4 rounded-lg border-2 border-gray-300 px-6 py-4 text-gray-700 shadow-md dark:text-white">
      <div className="flex h-full w-2/3 flex-col gap-6">
        <h2 className="flex gap-3 text-xl font-semibold">
          <ArrowDownUp className="text-pink-700" size={24} /> Cash Flow
        </h2>
        <div>
          <BarChart last7Days={last7Days} />
        </div>
      </div>
      <div className="flex w-1/3 flex-col gap-6">
        <div className="flex">
          <div className="ml-auto">
            <ToggleSwitch last7Days={last7Days} setLast7Days={setLast7Days} />
          </div>
        </div>
        <div className="flex flex-1 flex-col border-l-2 border-gray-200 pl-8">
          <div className="flex flex-1 items-center gap-8 p-4">
            <div className="rounded-md bg-rose-700 p-2 text-white">
              <ArrowDownUp size={40} />
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-xl">Income</div>
              <div className="flex items-center text-4xl">
                <div className="font-semibold">
                  ₹
                  {income.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
          </div>
          <hr className="border-t-2 border-gray-200" />
          <div className="flex flex-1 items-center gap-8 p-4">
            <div className="rounded-md bg-gray-950 p-2 text-white dark:bg-gray-700">
              <ArrowDownUp size={40} />
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-xl">Expense</div>
              <div className="flex items-center text-4xl">
                <div className="font-semibold">
                  ₹
                  {expense.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlow;
