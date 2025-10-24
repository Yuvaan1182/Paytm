import Button from './Button';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function ListItem({ user }) {
  const name = user.firstName + ' ' + user.lastName;
  const navigate = useNavigate();

  const handleClick = e => {
    e.preventDefault();
    navigate('/transfer', { state: { user } });
  };

  return (
    <div className="group relative flex items-center justify-between rounded-md border-2 border-gray-300 p-2 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 text-white">
          {name[0]}
        </div>
        <div className="font-sans text-base font-semibold">{name}</div>
      </div>
      <div>
        <Button label={'Send Money'} type={'submit'} color={'blue'} handleClick={handleClick} />
      </div>
      <div className="absolute bottom-full left-10 mt-1 rounded bg-gray-100 p-2 text-sm text-gray-700 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
        {user.email}
      </div>
    </div>
  );
}

ListItem.propTypes = {
  user: PropTypes.object.isRequired,
};
