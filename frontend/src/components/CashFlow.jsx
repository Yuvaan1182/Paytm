import { ArrowDownUp } from 'lucide-react';
import BarChart from './BarChart';
import ToggleSwitch from './ToggleSwitch';
import { useSelector } from 'react-redux';

const CashFlow = () => {
  const { balance } = useSelector(state => state.balance);

  return (
    <div className="flex gap-4 rounded-lg border-2 border-gray-300 px-6 py-4 text-gray-700 shadow-md">
      <div className="flex h-full w-2/3 flex-col gap-6">
        <h2 className="flex gap-3 text-xl font-semibold">
          <ArrowDownUp className="text-pink-700" size={24} /> Cash Flow
        </h2>
        <div>
          <BarChart />
        </div>
      </div>
      <div className="flex w-1/3 flex-col gap-6">
        <div className="flex">
          <div className="ml-auto">
            <ToggleSwitch />
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
                  {balance.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
          </div>
          <hr className="border-t-2 border-gray-200" />
          <div className="flex flex-1 items-center gap-8 p-4">
            <div className="rounded-md bg-gray-950 p-2 text-white">
              <ArrowDownUp size={40} />
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-xl">Expense</div>
              <div className="flex items-center text-4xl">
                <div className="font-semibold">
                  ₹
                  {balance.toLocaleString('en-IN', {
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
