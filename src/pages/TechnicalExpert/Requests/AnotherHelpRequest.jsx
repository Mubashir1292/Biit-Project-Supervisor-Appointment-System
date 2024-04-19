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
        <div className="bg-gray-100 w-3/4 mt-3 p-4">
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className="font-bold">Arid Number:</td>
                <td>{request.AridNo || "Arid Number"}</td>
              </tr>
              <tr>
                <td className="font-bold">Name:</td>
                <td>{request.name || "name"}</td>
              </tr>
              <tr>
                <td className="font-bold">Technology:</td>
                <td>{request.technology || "technology"}</td>
              </tr>
              <tr>
                <td className="font-bold">Date:</td>
                <td>
                  {!toggle ? (
                    <span className="font-bold">
                      {currentDate || request.date}
                    </span>
                  ) : (
                    <input
                      type="date"
                      name="schedule"
                      id="schedule"
                      value={currentDate}
                      onChange={handleSelectDate}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-bold">Day:</td>
                <td>
                  {!toggle ? (
                    <span className="font-normal">{day || request.day}</span>
                  ) : (
                    <span className="font-bold">{day || "----"}</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-bold">Time:</td>
                <td>
                  {!toggle ? (
                    <span>
                      {request.TimeSlot ||
                        (SelectedTimeSlot && SelectedTimeSlot.value)}
                    </span>
                  ) : (
                    <Dropdown
                      options={TimeSlotsOptions}
                      value={SelectedTimeSlot}
                      OnSelect={handleTimeSlotSelection}
                      className="relative w-3/12 -mt-2"
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-bold">Message:</td>
                <td>{request.message || "message"}</td>
              </tr>
            </tbody>
          </table>
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
