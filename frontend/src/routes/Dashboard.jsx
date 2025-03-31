import NavOptions from "../components/NavOptions";
import SearchBox from "../components/SearchBox";
import ListItem from "../components/ListItem";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchUserList } from "../features/account/accountSlice";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const navigationState = location.state; // Access the state sent in navigation
  console.log(navigationState, "state from navigation");

  const { userInfo } = useSelector((state) => state.user);

  const firstName = userInfo?.firstName || "User";
  const lastName = userInfo?.lastName || "User";
  const userName =
    firstName[0].toUpperCase() +
    firstName.substring(1, firstName.length) +
    " " +
    lastName[0].toUpperCase() +
    lastName.substring(1, lastName.length);
  const balance = userInfo?.balance || 0;

  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value, "value in search box");
    setSearchText(value);
  };

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(fetchUserList(searchText));
  }

  const userList = useSelector((state) => state.account.userList);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 shadow-md">
        <div className="text-blue-400 text-lg font-bold">Payments App</div>
        <div>
          <NavOptions name={userName} />
        </div>
      </div>

      <div className="flex flex-col p-4">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-4xl font-sans font-bold text-gray-700">
            Dashboard
          </h1>
          <div className="text-gray-700 font-semibold flex items-baseline shadow-sm rounded-md py-2">
            <span className="text-green-700 font-extrabold text-3xl">
              ${balance}
            </span>
            <span className="pl-2">Balance</span>
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
            <ListItem
              key={user._id}
              user={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
