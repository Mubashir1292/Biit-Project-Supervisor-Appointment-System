import React from "react";

function Card(props) {
  return (
    <>
      <div
        {...props.rest}
        className="flex flex-col w-[240px] justify-around pl-2 rounded-xl h-[110px] relative z-10   bg-gray-300"
      >
        <div className=" flex flex-row  justify-around text-black">
          <div className="w-4/12 h-20 rounded-full flex justify-center items-center bg-gray-200 border-blue-900 border-2 shadow-xl text-blue-900">
            {props.icon}
          </div>
          <div className="flex flex-col">
            <h1 className="text-md font-medium underline cursor-pointer">
              {props.title}
            </h1>
            <h1 className="text-sm font-medium">{props.desc}</h1>
          </div>
        </div>
        <h1 className="text-md text-black ml-2 mb-1">{props.footer}</h1>
      </div>
    </>
  );
}

export default Card;
