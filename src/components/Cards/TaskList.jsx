import { ArrowRight } from "lucide-react";
import React from "react";

function TaskList(props) {
  return (
    <>
      <div
        {...props.rest}
        className="flex flex-col w-3/12  pl-2 rounded-xl shadow-2xl h-5/6  bg-white"
      >
        <div className=" flex flex-col  justify-around text-black border-b border-green-500">
          <h1 className="text-xl font-bold text-center">Upcoming Tasks</h1>
        </div>
        <div className=" flex flex-col justify-around text-black m-2">
          <div className="flex flex-row justify-around bg-green-500 p-3 mt-2 rounded-md cursor-pointer">
            <h1>Complete Mockups</h1>
            <ArrowRight />
          </div>
          <div className="flex flex-row justify-around bg-green-500 p-3 mt-2 rounded-md cursor-pointer">
            <h1>Real Screens</h1>
            <ArrowRight />
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskList;
