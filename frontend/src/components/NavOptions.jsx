import { getWithExpiry } from '../features/utility/utility';

export default function NavOptions() {
  const userInfo = getWithExpiry('user');
  const firstName = userInfo?.firstName || 'User';
  const name = firstName[0].toUpperCase() + firstName.substring(1, firstName.length);

  return (
    <>
      <ul className="flex items-center justify-evenly gap-2">
        <li>
          Hello, <span className="font-bold">{name}</span>
        </li>
        <li>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 p-2 font-bold text-white">
            {name[0]}
          </div>
        </li>
      </ul>
    </>
  );
}
