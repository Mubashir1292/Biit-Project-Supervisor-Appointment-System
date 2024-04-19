import React, { useState } from "react";
import biitSas from "../../../assets/extra/biitSAS.png";
import Dropdown from "../../../components/dropdown/Dropdown";
function AnotherHelpRequest() {
  const [toggle, setToggle] = useState(false);
  const [scheduleText, setScheduleText] = useState("Reschedule Meeting");
  const [currentDate, setCurrentDate] = useState("04/05/2024");
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
            <h1>2020-Arid-3675</h1>
          </div>
          <div className="flex justify-center space-x-2">
            <label>Name:</label>
            <h1>Mubashir Liaqat</h1>
          </div>
          <div className="flex justify-center space-x-2">
            <label>Technology:</label>
            <h1>Web</h1>
          </div>
          <div className="flex justify-center space-x-2">
            <label>Date:</label>
            {!toggle ? (
              <>
                <h1 className="font-bold">{currentDate}</h1>
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
                <h1 className="font-normal">{day}</h1>
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
                <label>Time:</label>
                <h1>{SelectedTimeSlot && SelectedTimeSlot.value}</h1>
              </>
            ) : (
              <>
                <label>Select Time Slot:</label>
                <Dropdown
                  options={TimeSlotsOptions}
                  value={SelectedTimeSlot}
                  OnSelect={handleTimeSlotSelection}
                  className="relative w-3/12 -mt-2"
                />
              </>
            )}
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
