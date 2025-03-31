import { LuLogOut } from "react-icons/lu";
import PropTypes from "prop-types";

export default function NavOptions({name}) {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      <ul className="flex justify-evenly items-center gap-2">
        <li onClick={handleLogout}><LuLogOut /></li>
        <li>Hello, {name}</li>
        <li>
          <div className="w-8 h-8 flex items-center justify-center rounded-full p-2 font-bold bg-blue-400 text-white">
            {name[0]}
          </div>
        </li>
      </ul>
    </>
  );
}

NavOptions.propTypes = {
  name: PropTypes.string.isRequired,
};