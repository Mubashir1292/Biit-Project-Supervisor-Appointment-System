import { ArrowRight } from "lucide-react";
import React from "react";

function MessageCard(props) {
  return (
    <>
      <div
        {...props.rest}
        className="flex flex-col w-3/12  pl-2 rounded-xl drop-shadow h-5/6  bg-white"
      >
        <div className=" flex flex-col  justify-around text-black">
          <h1 className="text-4xl font-bold text-center">02</h1>
          <h1 className="text-md font-thin">Unread Messages</h1>
        </div>
        <div className=" flex flex-col justify-around text-black m-2">
          <div className="flex flex-row justify-around bg-green-500 p-3 mt-2 rounded-md cursor-pointer">
            <h1>Sir Zahid</h1>
            <ArrowRight />
          </div>
          <div className="flex flex-row justify-around bg-green-500 p-3 mt-2 rounded-md cursor-pointer">
            <h1>Sir Umar</h1>
            <ArrowRight />
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageCard;
