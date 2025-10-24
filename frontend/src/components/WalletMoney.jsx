import { useEffect, useState } from 'react';
import { errorHandler } from './ErrorHandler';
import { addToWallet } from '../features/thunks/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateSuccess } from '../features/balance/balanceSlice';
import { Wallet } from 'lucide-react';

const WalletMoney = () => {
  const [amount, setAmount] = useState(''); // State for amount input
  const dispatch = useDispatch();
  const { success } = useSelector(state => state.balance);

  const addMoney = e => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      errorHandler('Please enter a valid amount to add.');
      return;
    }
    const transfer = {
      amount: parseFloat(amount),
    };
    dispatch(addToWallet(transfer));
  };

  useEffect(() => {
    if (success) {
      toast.success(`${amount} ₹ added to your wallet successfully!`);
      dispatch(updateSuccess(false)); // Reset success state after showing toast
      setAmount(''); // Clear the input after adding money
    }
  }, [success, amount, dispatch]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-gray-800 p-6 text-white shadow-lg">
      <div className="flex items-center gap-2 text-4xl font-bold">
        <span className="flex h-full items-center justify-center rounded-md bg-gray-500 p-2">
          <Wallet size={24} />
        </span>
        <span>Wallet</span>
      </div>
      <div className="text-lg">Add money to your wallet to start making transactions.</div>
      <div className="mt-4 flex flex-col gap-4">
        <input
          className="rounded-md border-2 border-gray-300 bg-transparent px-4 py-2 text-xl text-gray-100 outline-none focus:border-white focus:text-white"
          type="text"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="0"
        />
        <button
          className="min-w-full rounded-md bg-gray-100 px-6 py-2 text-lg font-semibold text-gray-900 transition-colors duration-200 hover:bg-gray-900 hover:text-white"
          onClick={e => addMoney(e)}
        >
          Add Money
        </button>
      </div>
    </div>
  );
};

export default WalletMoney;
