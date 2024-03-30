import React from "react";

function Card(props) {
  return (
    <>
      <div
        {...props.rest}
        className="flex flex-col w-[240px] justify-around pl-2 rounded-xl drop-shadow-2xl h-[110px] relative  inset-0   bg-white"
      >
        <div className=" flex flex-row  justify-around text-black">
          <div className="w-4/12 h-20 rounded-full flex justify-center items-center bg-gray-200 border-blue-900 border-2 shadow-xl text-blue-900">
            {props.icon}
          </div>
          <div className="flex flex-col">
            <h1 className="text-md font-semibold">{props.title}</h1>
            <h1 className="text-sm font-semibold">{props.desc}</h1>
          </div>
        </div>
        <h1 className="text-md text-black ml-2 mb-1">{props.footer}</h1>
      </div>
    </>
  );
}

export default Card;
