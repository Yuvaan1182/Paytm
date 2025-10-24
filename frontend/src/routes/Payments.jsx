import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categories } from '../assets/tests/categories';
import DropDownView from '../components/DropDownView';
import GlassCard from '../components/GlassCard';
import { updateSearchState } from '../features/payer/payerSlice';
import { fetchUserList, updateBalance } from '../features/thunks/thunks';
import { setLoading } from '../features/ui/uiSlice';

const Payments = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const payers = useSelector(state => state.payers);
  const [searchResText, setSearchResText] = useState('');
  const { loading, userList, search } = payers;
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

  const handleAmount = e => {
    e.preventDefault();
    const value = e.target.value;
    setAmount(value);
  };

  const transferMoney = e => {
    e.preventDefault();
    // Handle the transfer money event here
    const to = selectedUser._id;
    dispatch(updateBalance({ to: to, amount: amount, category: selectedCategory }));
    setAmount(0); // Reset the amount after transfer
  };

  const selectUser = user => {
    setSelectedUser(user);
  };

  //   const scrollRef = useRef(null);

  //   const scroll = direction => {
  //     const { current } = scrollRef;
  //     if (!current) return;

  //     const scrollAmount = 250; // pixels per click
  //     if (direction === 'left') {
  //       current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  //     } else {
  //       current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  //     }
  //   };

  const handleSelect = val => {
    setSelectedCategory(val);
  };

  const fullName = selectedUser
    ? selectedUser?.firstName + ' ' + selectedUser?.lastName
    : 'No User Selected';

  useEffect(() => {
    if (!search) {
      setSearchResText('Search for a user');
    } else {
      if (userList.length === 0) {
        setSearchResText('No such user found.');
        dispatch(updateSearchState(false));
      }
    }
  }, [search, userList, dispatch]);

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="rounded-md p-4 text-4xl shadow-sm dark:text-white dark:shadow-gray-700">
        Payments
      </div>
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex h-full gap-5">
          <GlassCard className="flex w-1/3 flex-col gap-5 p-4">
            <div className="border-b text-3xl text-pink-700">Search</div>
            <div className="relative">
              <div className="">
                <input
                  type="text"
                  placeholder="Search via first name, last name or email"
                  className="peer w-full rounded-md border-2 border-gray-300 py-2 pr-4 pl-15 text-xl text-gray-500 transition duration-200 ease-in-out placeholder:italic focus:border-blue-400 focus:outline-none dark:focus:text-gray-300"
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  value={searchText}
                />
              </div>
              <span className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400 peer-focus:hidden">
                <Search size={18} />
              </span>
            </div>
            <div className="border-green flex flex-col gap-5">
              <div className="flex h-full flex-col gap-2 overflow-y-auto px-2 py-1">
                {loading && <div>Loading...</div>}
                {userList.length === 0 ? (
                  <div className="flex items-center text-xl dark:text-gray-300">
                    {searchResText}
                  </div>
                ) : (
                  userList.map(user => {
                    return (
                      <div
                        key={user._id}
                        className="group flex gap-5 rounded-md ring-2 ring-gray-300 hover:ring-gray-400"
                        onClick={() => selectUser(user)}
                      >
                        <div className="rounded-tl-md rounded-bl-md px-6 py-4 text-2xl font-bold ring-2 ring-gray-300 group-hover:ring-gray-400 dark:text-white">
                          {user.firstName[0].toUpperCase()}
                        </div>
                        <div className="flex flex-col justify-center">
                          <div className="font-semibold text-gray-700 capitalize dark:text-gray-300">
                            {user.firstName + ' ' + user.lastName}
                          </div>
                          <div className="text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </GlassCard>
          {selectedUser && (
            <GlassCard className="flex h-full w-2/3 flex-col items-center gap-5 p-4 dark:bg-gray-700">
              <div className="mb-auto flex h-full w-2/3 flex-col items-center justify-center gap-5">
                <div className="place-items-center bg-gradient-to-r from-rose-700 to-gray-900 bg-clip-text py-4 text-8xl font-bold text-transparent underline">
                  Velora Pay
                </div>
                <div className="flex w-full items-center gap-10 font-bold text-gray-700">
                  <div className="bg-red text-700-200 flex h-24 w-24 items-center justify-center rounded-full text-5xl font-bold text-rose-600 shadow-xs inset-shadow-sm inset-shadow-gray-400 text-shadow-md dark:shadow-gray-400 dark:inset-shadow-gray-700">
                    {fullName[0].toUpperCase()}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-3xl capitalize dark:text-white">{fullName}</div>
                    <div>{selectedUser?.email}</div>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-gray-200">
                      <DropDownView label="Category" options={categories} onSelect={handleSelect} />
                    </span>
                  </div>
                </div>
                <input
                  type="text"
                  value={amount}
                  onChange={e => handleAmount(e)}
                  placeholder="Enter Amount"
                  className={`w-full rounded-md p-4 text-2xl outline-2 outline-gray-600 focus:outline-red-600 ${selectedUser === null ? 'cursor-not-allowed' : ''} dark:text-gray-100 dark:placeholder:text-gray-300`}
                  disabled={selectedUser === null ? true : false}
                />
                <button
                  onClick={e => transferMoney(e)}
                  className={`flex w-full items-center justify-center rounded-lg ${selectedUser === null ? 'cursor-not-allowed bg-gray-500' : 'bg-gradient-to-r from-rose-700 to-gray-900'} py-4 text-2xl text-white transition-colors duration-300 hover:from-gray-700 hover:to-rose-700`}
                  disabled={selectedUser === null}
                >
                  Initiate Transfer
                </button>
              </div>
            </GlassCard>
          )}
        </div>
        {/* <GlassCard className="flex flex-col p-4">
          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-3 px-4 py-2 text-2xl text-gray-700">
              <span>
                <ClockFading className="text-yellow-400" />
              </span>
              <span> Recent Transactions with {'Aryan'}</span>
            </div>
          </div>
          <div className="relative w-full">
            <div
              ref={scrollRef}
              className="no-scrollbar flex gap-4 overflow-x-auto overscroll-contain scroll-smooth p-2 px-4"
            >
              {categories.map((category, idx) => {
                return (
                  <div
                    key={idx}
                    className={`group flex w-48 flex-shrink-0 flex-col justify-evenly gap-10 p-6 ${category.color} rounded-md ring-1 hover:shadow-md`}
                  >
                    <div className="w-ful text-2xl font-bold">
                      <CategoryTag categoryKey={category['key']} />
                      <div className="w-full text-sm text-gray-500">3rd May{"'"} 25</div>
                    </div>
                    <div className="w-full text-2xl font-bold text-gray-800">₹ 99.99</div>
                  </div>
                );
              })}
            </div>
            <div
              onClick={() => scroll('left')}
              className="absolute top-1/2 left-0 z-10 flex h-full -translate-y-1/2 cursor-pointer items-center justify-center bg-white/40 hover:bg-white/80"
            >
              <MdArrowLeft size={40} />
            </div>
            <div
              onClick={() => scroll('right')}
              className="absolute top-1/2 right-0 z-10 flex h-full -translate-y-1/2 cursor-pointer items-center justify-center bg-white/40 hover:bg-white/80"
            >
              <MdArrowRight size={40} />
            </div>
          </div>
        </GlassCard> */}
      </div>
    </div>
  );
};

export default Payments;
