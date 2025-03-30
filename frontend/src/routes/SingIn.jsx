import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/authSlice"; // Adjust the path if needed

function SignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user)); // Dispatch the login action
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-80 shadow-lg p-4 bg-white-400 flex flex-col items-center rounded-sm">
        <Heading label="Login" />
        <SubHeading label={"Enter your credentials to access your account"} />
        <form className="w-full py-2" onSubmit={handleSubmit}>
          <InputBox
            label={"Email"}
            placeholder={"johndoe@example.com"}
            type={"text"}
            value={user.email}
            name={"email"}
            handleChange={handleChange}
          />
          <InputBox
            label={"Password"}
            placeholder={"******"}
            type={"password"}
            value={user.password}
            name={"password"}
            handleChange={handleChange}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="w-full py-2">
            <Button
              label={loading ? "Logging in..." : "Login"}
              type={"submit"}
              color={"blue"}
              disabled={loading}
            />
          </div>
        </form>
        <div className="w-full py-2 text-right">
          <BottomWarning
            warningText={"Don't have an account?"}
            to={"/register"}
            label={"Register"}
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;