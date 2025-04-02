import NavOptions from "../components/NavOptions";
import SearchBox from "../components/SearchBox";
import ListItem from "../components/ListItem";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchUserList } from "../features/dashboard/dashboardSlice";
import { LuLogOut } from "react-icons/lu";
import { logout } from "../features/auth/authSlice";

function Dashboard() {
  const { balance } = useSelector((state) => state.balance);
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(fetchUserList(searchText));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const userList = useSelector((state) => state.dashboard.userList);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 shadow-md">
      <div className="flex gap-2 items-center px-4 font-bold bg-slate-800 text-white rounded-md py-2" onClick={handleLogout}>
          <LuLogOut /> <span>Logout</span>
        </div>
        <div className="flex items-center text-blue-400 text-2xl font-bold">
        UPay
        </div>
        <div>
          <NavOptions />
        </div>
      </div>

      <div className="flex flex-col p-4">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-4xl font-sans font-bold text-gray-700">
            Dashboard
          </h1>
          <div className="text-gray-700 font-semibold flex items-baseline shadow-sm rounded-md py-2">
            <span className="pr-2">Balance</span>
            <span className="text-green-700 font-extrabold text-3xl">
              ${balance}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <SearchBox
            placeholder={"Search users..."}
            type={"text"}
            value={searchText}
            handleChange={handleChange}
            handleClick={handleClick}
          />
        </div>

        <div className="flex flex-col gap-1 py-4">
          {userList.map((user) => (
            <ListItem key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
