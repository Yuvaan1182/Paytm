import { useState } from 'react';
import { setLoading } from '../features/ui/uiSlice';
import { fetchUserList } from '../features/dashboard/dashboardSlice';
import { useDispatch } from 'react-redux';
import { Search } from 'lucide-react';

const Payments = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setSearchText(value);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.target.value;
      setSearchText(value);
      setLoading(true);
      dispatch(fetchUserList(value)).finally(() => setLoading(false));
    }
  };
  return (
    <div className='flex flex-col gap-5'>
      <div>Payments</div>
      <div className='flex gap-5'>
        <div className='flex-1 border-2'>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="peer w-full rounded-md border-2 border-gray-300 px-4 py-2 text-gray-500 transition duration-200 ease-in-out focus:border-rose-500 focus:outline-none"
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              value={searchText}
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 peer-focus:hidden">
              <Search size={18} />
            </span>
          </div>
          <div>
            <div>
                
            </div>
          </div>
        </div>
      <div className='flex-1 border-2'></div>
      </div>
    </div>
  );
};

export default Payments;
