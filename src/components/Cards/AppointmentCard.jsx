import React from "react";

function AppointmentCard(props) {
  return (
    <>
      <div
        {...props.rest}
        className="flex flex-col w-3/12  pl-2 rounded-xl shadow h-5/6   bg-white"
      >
        <div className=" flex flex-row  justify-around text-black border-b border-green-500 pt-3">
          <h1 className="text-xl font-bold mb-3">Upcoming Meetings</h1>
        </div>
        <div className="bg-green-500 flex flex-row justify-around text-black m-2 cursor-pointer p-3 rounded-md">
          <h1>Meeting Title:</h1>
          <h1>09:30 -- 10:00</h1>
        </div>
        <div className="bg-green-500 flex flex-row justify-around text-black m-2 cursor-pointer p-3 rounded-md">
          <h1>Meeting Title:</h1>
          <h1>09:30 -- 10:00</h1>
        </div>
      </div>
    </>
  );
}

export default AppointmentCard;
