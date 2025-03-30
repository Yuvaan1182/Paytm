import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";

function SignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setUser({
      ...user,
      [name]: value,
    });
  }
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-80 shadow-lg p-4 bg-white-400 flex flex-col items-center rounded-sm">
        <Heading label="Login" />
        <SubHeading label={"Enter your credentials to access your account"} />
        <div className="w-full py-2">
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
        </div>
        <div className="w-full py-2">
          <Button label={"Login"} type={"submit"} color={"blue"} />
        </div>
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
