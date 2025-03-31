import Button from "./Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function ListItem({ user }) {
  console.log("user in listitem", user);
  
  const name = user.firstName + " " + user.lastName;
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/transfer", { state: { user } });
  };

  return (
    <div className="flex items-center justify-between rounded-md shadow-sm border-gray-300 border-2 p-2">
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
    </div>
  );
}

ListItem.propTypes = {
  user: PropTypes.object.isRequired,
};
