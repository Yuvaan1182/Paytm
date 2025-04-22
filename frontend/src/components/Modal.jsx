import InputBox from './InputBox';
import Button from './Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBalance } from '../features/account/accountSlice';
import { useLocation } from 'react-router-dom';

export default function Modal() {
  const location = useLocation();

  const { user } = location.state || {};
  const firstName = user?.firstName || 'John';
  const lastName = user?.lastName || 'Doe';
  const name = `${firstName} ${lastName}`;

  const [amount, setAmount] = useState('');

  const handleChange = e => {
    e.preventDefault();
    // Handle the change event for the input box
    const { value } = e.target;
    setAmount(value);
  };

  const dispatch = useDispatch();
  const transferMoney = e => {
    e.preventDefault();
    // Handle the transfer money event here
    const to = user._id;
    dispatch(updateBalance({ to: to, amount: amount }));
    setAmount(0); // Reset the amount after transfer
  };

  return (
    <div className="flex h-full items-center justify-center font-sans">
      <div className="flex w-120 flex-col gap-10 p-10 shadow-md">
        <div className="self-center font-sans text-3xl font-extrabold text-gray-700">
          Send Money
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-400 text-start text-base font-bold text-white">
              {name[0]}
            </div>
            <div className="justify-self-end text-3xl font-bold text-gray-500">{name}</div>
          </div>
          <div>
            <InputBox
              label={'Amount (in Rs)'}
              placeholder={'Enter Amount'}
              type={'text'}
              value={amount.toString()} // Ensure value is a string
              handleChange={handleChange}
              name={'amount'}
            />
          </div>
          <div className="w-full">
            <Button
              label={'Initiate Transfer'}
              type={'submit'}
              color={'green'}
              handleClick={transferMoney}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
