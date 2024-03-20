import React from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

function SignUp() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-80 shadow-lg p-4 bg-white-400 flex flex-col items-center rounded-sm">
        <Heading label="Sign Up" />
        <SubHeading label={"Enter Your information to create an account"} />
        <div className="w-full py-2">
          <InputBox
            label={"First Name"}
            placeholder={"John"}
            type={"text"}
            value={""}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Doe"}
            type={"text"}
            value={""}
          />
          <InputBox
            label={"Email"}
            placeholder={"johndoe@example.com"}
            type={"text"}
            value={""}
          />
          <InputBox
            label={"Password"}
            placeholder={"******"}
            type={"password"}
            value={""}
          />
        </div>
        <div className="w-full py-2">
          <Button label={"Register"} type={"submit"} color={"blue"} />
        </div>
        <div className="w-full py-2 text-right">
          <BottomWarning
            warningText={"Already have an account?"}
            to={"/login"}
            label={"Login"}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
