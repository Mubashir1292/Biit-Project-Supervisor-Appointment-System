import React, { useState } from "react";
import biitSas from "../../../assets/extra/biitSAS.png";
import Dropdown from "../../../components/dropdown/Dropdown";

function AnotherHelpRequest() {
  const [toggle, setToggle] = useState(false);
  const [scheduleText, setScheduleText] = useState("Reschedule Meeting");
  const [currentDate, setCurrentDate] = useState("");
  const [day, setDay] = useState("");
  const [timeSlotsOptions] = useState([
    { label: 1, value: "08:30-09:30" },
    { label: 2, value: "09:30-10:30" },
    { label: 3, value: "10:30-11:30" },
  ]);
  const [request, setRequest] = useState({
    name: "Mubashir Liaqat",
    aridNo: "2020-Arid-3675",
    technology: "Web",
    message: "A0A Sir, I have an issue about the API Integration",
    date: "04/04/2024",
    day: "Monday",
    timeSlot: "08:30-09:30",
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const handleToggleDateTime = () => {
    setToggle((prevToggle) => !prevToggle);
    setScheduleText(toggle ? "Reschedule Meeting" : "Save Now");
  };

  const handleSelectDate = (event) => {
    const selectedDate = new Date(event.target.value);
    const options = { weekday: "long" };
    const selectedDay = selectedDate.toLocaleDateString("en-US", options);
    setCurrentDate(event.target.value);
    setDay(selectedDay);
  };

  const handleTimeSlotSelection = (option) => {
    setSelectedTimeSlot(option);
  };

  return (
    <div className="flex flex-col items-center py-6">
      <div className="flex justify-center w-full mb-4">
        <img
          src={biitSas}
          alt="Biit Logo"
          className="w-3/12 max-[320px]:w-4/6"
        />
      </div>
      <h1 className="text-2xl font-bold mb-4 text-green-500">Help Request</h1>
      <div className="bg-gray-100 w-full max-w-2xl p-6 rounded-lg shadow-md">
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td className="font-semibold text-sm py-2">Arid Number:</td>
              <td>{request.aridNo}</td>
            </tr>
            <tr>
              <td className="font-semibold text-sm py-2">Name:</td>
              <td>{request.name}</td>
            </tr>
            <tr>
              <td className="font-semibold py-2">Technology:</td>
              <td>{request.technology}</td>
            </tr>
            <tr>
              <td className="font-semibold py-2">Date:</td>
              <td>
                {!toggle ? (
                  <span className="font-semibold">
                    {currentDate || request.date}
                  </span>
                ) : (
                  <input
                    type="date"
                    name="schedule"
                    id="schedule"
                    value={currentDate}
                    onChange={handleSelectDate}
                    className="border p-1 rounded"
                  />
                )}
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-2">Day:</td>
              <td>
                <span className="font-normal">{day || request.day}</span>
              </td>
            </tr>
            <tr>
              <td className="font-bold py-2">Time:</td>
              <td className="font-bold">
                {!toggle ? (
                  <span>
                    {request.timeSlot ||
                      (selectedTimeSlot && selectedTimeSlot.value)}
                  </span>
                ) : (
                  <Dropdown
                    options={timeSlotsOptions}
                    value={selectedTimeSlot}
                    onSelect={handleTimeSlotSelection}
                    className="w-full"
                  />
                )}
              </td>
            </tr>
            <tr>
              <td className="font-bold py-2">Message:</td>
              <td>{request.message}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex space-x-4 mt-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Confirm
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleToggleDateTime}
        >
          {scheduleText}
        </button>
      </div>
    </div>
  );
}

export default AnotherHelpRequest;
