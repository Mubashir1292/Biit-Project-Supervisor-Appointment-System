import React, { useEffect, useState } from "react";
import biitSas from "../../../assets/extra/biitSAS.png";
import Dropdown from "../../../components/dropdown/Dropdown";
function HelpRequests() {
  const [request, setRequest] = useState({
    id: "2020-Arid-3675",
    name: "Mubashir Liaqat",
    title: "ERD Issue",
    description: "I have an issue..",
    date: "4/15/2024",
    day: "Monday",
    startTime: "08:30",
    endTime: "09:30",
  });
  const [TimeSlotsOptions, setTimeSlotsOptions] = useState([]);
  const [SelectedTimeSlot, setSelectedTimeSlot] = useState(null);
  //   const [selectedDate, setSelectedDate] = useState(null);
  const AvailableTimeSlots = [
    {
      day: 1,
      startTime: "08:30",
      endTime: "09:30",
    },
    {
      day: 1,
      startTime: "09:30",
      endTime: "10:30",
    },
    {
      day: 1,
      startTime: "10:30",
      endTime: "11:30",
    },
    {
      day: 1,
      startTime: "11:30",
      endTime: "12:30",
    },
    {
      day: 2,
      startTime: "11:30",
      endTime: "12:30",
    },
  ];

  //   useEffect(() => {
  //     const filteredTimeSlots = AvailableTimeSlots.filter(
  //       (slot) => slot.day === selectedDate.getDay()
  //     );

  //     const options = filteredTimeSlots.map((slot, index) => ({
  //       label: index,
  //       value: `${slot.startTime}--${slot.endTime}`,
  //     }));
  //     setTimeSlotsOptions(options);
  //   }, []);
  //* setting up the Date and Time
  const [isPremitted, setIsPremitted] = useState(true);
  const handleTimeSlotSelection = (option) => {
    setSelectedTimeSlot(option);
    console.log(option);
  };
  return (
    <>
      {!isPremitted ? (
        <>
          <div className="flex flex-col justify-center items-center">
            <div className="flex">
              <img src={biitSas} alt="Biit logo" className="w-11/12 " />
            </div>
            <h1 className="text-4xl text-green-600">Help Request</h1>
            <div className="bg-gray-200 p-3 mt-3 w-8/12">
              <h1 className="text-2xl">Request Details:</h1>
              <div className="flex justify-center items-center space-x-3">
                <h1 className="text-xl">Title :</h1>
                <h1 className="text-xl">{request.title}</h1>
              </div>
              <div className="flex justify-center items-center space-x-3">
                <h1 className="text-xl">Description:</h1>
                <p>{request.description}</p>
              </div>
            </div>
            <div className="bg-gray-200 p-3 mt-3 w-8/12">
              <h1 className="text-2xl">Student Details:</h1>
              <div className="flex justify-center items-center space-x-3">
                <h1 className="text-xl">Name :</h1>
                <h1 className="text-xl">{request.name}</h1>
              </div>
              <div className="flex justify-center items-center space-x-3">
                <h1 className="text-xl">Arid Number:</h1>
                <p>{request.id}</p>
              </div>
            </div>
            <div className="bg-gray-200 p-3 mt-3 w-8/12">
              <h1 className="text-2xl">Date Time Details:</h1>
              <div className="flex justify-center items-center space-x-3">
                <h1 className="text-xl">Date :</h1>
                <h1 className="text-xl">{request.date}</h1>
              </div>
              <div className="flex justify-center items-center space-x-3">
                <h1 className="text-xl">Day :</h1>
                <h1 className="text-xl">{request.day}</h1>
              </div>
              <div className="flex justify-center items-center space-x-3">
                <h1 className="text-xl">Time :</h1>
                <p>
                  {request.startTime}--{request.endTime}
                </p>
              </div>
            </div>
            <div className="flex space-x-3 mt-3">
              <button className="bg-black text-white justify-center items-center px-4 py-2 rounded-lg border border-black hover:bg-white hover:text-black hover:font-bold transition-all ease-in-out">
                Ok
              </button>
              <button className="bg-green-600 text-white border border-green-600 hover:bg-white hover:text-green-600 px-3 py-2 rounded-lg hover:font-bold transition-all ease-in-out">
                Update Time
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl text-center">Update Date and Time</h1>
            <div className="bg-gray-200  mt-3 w-8/12">
              <h1 className="text-2xl text-center m-3">Date Time Details</h1>
              <div className="flex justify-center items-center space-x-3">
                <h1 className="text-xl">Date :</h1>
                <h1 className="text-xl">{request.date}</h1>
              </div>
              <div className="flex justify-center items-center space-x-3">
                <h1 className="text-xl">Day :</h1>
                <h1 className="text-xl">{request.day}</h1>
              </div>
              <div className="flex justify-center items-center space-x-3">
                <h1 className="text-xl">Time :</h1>
                <p>
                  {request.startTime}--{request.endTime}
                </p>
              </div>
            </div>

            <div className="bg-gray-200 py-0 mt-3 w-8/12">
              <h1 className="text-2xl text-center m-3">Update Date & Time</h1>
              <div className="flex justify-center items-center space-x-3">
                <h1 className="text-xl">Date :</h1>
                <input type="date" name="selectedDate" id="selectedDate" />
              </div>
              <div className="flex justify-center items-center space-x-3">
                <h1 className="text-xl">Time :</h1>
                <Dropdown
                  options={TimeSlotsOptions}
                  value={SelectedTimeSlot}
                  OnSelect={handleTimeSlotSelection}
                  className="relative w-3/12"
                />
                <p>
                  {request.startTime}--{request.endTime}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HelpRequests;
