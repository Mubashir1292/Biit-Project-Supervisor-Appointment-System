import React, { useEffect, useState } from "react";
import biitSas from "../../../assets/extra/biitSAS.png";
import Dropdown from "../../../components/dropdown/Dropdown";
function AnotherHelpRequest() {
  const [toggle, setToggle] = useState(false);
  const [scheduleText, setScheduleText] = useState("Reschedule Meeting");
  const [currentDate, setCurrentDate] = useState("");
  const [day, setDay] = useState("");
  const [TimeSlotsOptions, setTimeSlotsOptions] = useState([
    {
      label: 1,
      value: "08:30-09:30",
    },
    {
      label: 2,
      value: "08:30-09:30",
    },
    {
      label: 3,
      value: "08:30-09:30",
    },
  ]);
  const [request, setRequest] = useState({
    name: "Mubashir Liaqat",
    AridNo: "2020-Arid-3675",
    technology: "Web",
    message: "A0A Sir,I have an issue about the Api Integration",
    date: "04/04/2024",
    day: "Monday",
    TimeSlot: "08:30--09:30",
  });

  const [SelectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const handleToggleDateTime = () => {
    setToggle((curr) => !curr);
    if (toggle) {
      setScheduleText("Reschedule Meeting");
    } else {
      setScheduleText("Save Now");
    }
  };
  const handleSelectDate = (event) => {
    event.preventDefault();
    const selectedDate = new Date(event.target.value);
    const options = { weekday: "long" };
    const selectedDay = selectedDate.toLocaleDateString("en-US", options);
    setCurrentDate(event.target.value);
    setDay(selectedDay);
  };
  const handleTimeSlotSelection = (option) => {
    setSelectedTimeSlot(option);
    console.log(option);
  };
  return (
    <>
      <div className="w-full flex flex-col justify-around items-center">
        <div className="flex justify-center">
          <img src={biitSas} alt="Biit Logo" className="w-4/6" />
        </div>
        <h1 className="text-xl text-center font-bold font-serif">
          Help Request
        </h1>
        <div className="bg-gray-100 w-3/4 justify-center flex flex-col space-y-3 mt-3">
          <div className="flex justify-center space-x-2">
            <label>Arid Number:</label>
            <h1>{request.AridNo || "Arid Number"}</h1>
          </div>
          <div className="flex justify-center space-x-2">
            <label>Name:</label>
            <h1>{request.name || "name"}</h1>
          </div>
          <div className="flex justify-center space-x-2">
            <label>Technology:</label>
            <h1>{request.technology || "technology"}</h1>
          </div>
          <div className="flex justify-center space-x-2">
            <label>Date:</label>
            {!toggle ? (
              <>
                <h1 className="font-bold">{currentDate || request.date}</h1>
              </>
            ) : (
              <>
                <input
                  type="date"
                  name="schedule"
                  id="schedule"
                  value={currentDate}
                  onChange={handleSelectDate}
                />
              </>
            )}
          </div>
          <div className="flex justify-center space-x-2">
            <label>Day:</label>
            {!toggle ? (
              <>
                <h1 className="font-normal">{day || request.day}</h1>
              </>
            ) : (
              <>
                <h1 className="font-bold">{day || "----"}</h1>
              </>
            )}
          </div>
          <div className="flex justify-center space-x-2">
            {!toggle ? (
              <>
                <label className="font-bold">Time:</label>
                <h1>
                  {request.TimeSlot || [
                    SelectedTimeSlot && SelectedTimeSlot.value,
                  ]}
                </h1>
              </>
            ) : (
              <>
                <label className="font-bold">Select Time Slot:</label>
                <Dropdown
                  options={TimeSlotsOptions}
                  value={SelectedTimeSlot}
                  OnSelect={handleTimeSlotSelection}
                  className="relative w-3/12 -mt-2"
                />
              </>
            )}
          </div>
          <div className="flex justify-center space-x-0">
            <label className="font-bold">Message:</label>
            <h1>{request.message || "message"}</h1>
          </div>
        </div>

        <div className="flex justify-center space-x-3 mt-3">
          <button className="bg-green-600 p-3 rounded text-white">
            Confirm
          </button>
          <button
            className="bg-green-600 p-3 rounded text-white"
            onClick={handleToggleDateTime}
          >
            {scheduleText}
          </button>
        </div>
      </div>
    </>
  );
}

export default AnotherHelpRequest;
