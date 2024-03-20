import React from "react";
import InputBox from "./InputBox";
import Button from "./Button";

export default function Modal({ name }) {
  return (
    <div className="h-full flex items-center justify-center font-sans">
      <div className="w-120 flex flex-col gap-10 p-10 shadow-md">
        <div className="font-sans font-extrabold text-gray-700 text-3xl self-center">
          Send Money
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <div className="h-12 w-12 text-white text-start text-base font-bold bg-green-400 flex items-center justify-center rounded-full">
              {name[0]}
            </div>
            <div className="text-3xl font-bold justify-self-end text-gray-500">
              {name}
            </div>
          </div>
          <div>
            <InputBox
              label={"Amount (in Rs)"}
              placeholder={"Enter Amount"}
              type={"text"}
              value={""}
            />
          </div>
          <div className="w-full">
            <Button
              label={"Initiate Transfer"}
              type={"submit"}
              color={"green"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
