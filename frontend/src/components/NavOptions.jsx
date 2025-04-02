import { getWithExpiry } from "../features/utility/utility";

export default function NavOptions() {
  const userInfo = getWithExpiry("user");
  const firstName = userInfo?.firstName || "User";
  const name =
    firstName[0].toUpperCase() + firstName.substring(1, firstName.length);

  return (
    <>
      <ul className="flex justify-evenly items-center gap-2">
        <li>
          Hello, <span className="font-bold">{name}</span>
        </li>
        <li>
          <div className="w-8 h-8 flex items-center justify-center rounded-full p-2 font-bold bg-blue-400 text-white">
            {name[0]}
          </div>
        </li>
      </ul>
    </>
  );
}
