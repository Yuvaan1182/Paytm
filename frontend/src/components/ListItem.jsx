import Button from "./Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function ListItem({ user }) {
  const name = user.firstName + " " + user.lastName;
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/transfer", { state: { user } });
  };

  return (
    <div className="flex items-center justify-between rounded-md shadow-sm border-gray-300 border-2 p-2 relative group">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 text-white bg-blue-400 rounded-full flex items-center justify-center">
          {name[0]}
        </div>
        <div className="text-base font-sans font-semibold">{name}</div>
      </div>
      <div>
        <Button
          label={"Send Money"}
          type={"submit"}
          color={"blue"}
          handleClick={handleClick}
        />
      </div>
      <div className="absolute bottom-full left-10 mt-1 bg-gray-100 text-gray-700 text-sm p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
        {user.email}
      </div>
    </div>
  );
}

ListItem.propTypes = {
  user: PropTypes.object.isRequired,
};
