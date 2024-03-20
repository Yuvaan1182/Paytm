import React from "react";
import NavOptions from "../components/NavOptions";
import SearchBox from "../components/SearchBox";
import ListItem from "../components/ListItem";

function Dashboard() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 shadow-md">
        <div className="text-blue-400 text-lg font-bold">Payments App</div>
        <div>
          <NavOptions name={"Yuvaan"} />
        </div>
      </div>

      <div className="flex flex-col p-4">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-4xl font-sans font-bold text-gray-700">
            Dashboard
          </h1>
          <div className="text-gray-700 font-semibold flex items-baseline shadow-sm rounded-md py-2">
            <span className="text-green-700 font-extrabold text-3xl">
              ${5000}
            </span>
            <span className="pl-2">Balance</span>
          </div>
        </div>

        <div className="flex items-center">
          <SearchBox placeholder={"Search users..."} type={"text"} value={""} />
        </div>

        <div className="flex flex-col gap-1 py-4">
          <ListItem name={"Deep"} />
          <ListItem name={"Aditya"} />
          <ListItem name={"Sushi"} />
          <ListItem name={"Prash"} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
