import React, { useState, useEffect } from "react";
import biitSas from "../../../assets/extra/biitSAS.png";
import Dropdown from "../../../components/dropdown/Dropdown";
import { useNavigate } from "react-router-dom";
import { Accordion } from "react-bootstrap";

function AnotherHelpRequest() {
  const [toggle, setToggle] = useState(false);
  const [scheduleText, setScheduleText] = useState("Reschedule Meeting");
  const [currentDate, setCurrentDate] = useState("");
  const [day, setDay] = useState("");
  const [helpRequests, setHelpRequests] = useState([]);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate();
  const [timeSlotsOptions, setTimeSlots] = useState([]);
  const fetchAllTimesSlot = async (selectedDay) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas_Supervisor_Expert/GetAllTimeSlots?teacher_id=${user.tid}&day=${selectedDay}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        const expertListData = result?.map((item) => ({
          label: item.id,
          value: item.start_time.slice(0, 5) + "-" + item.end_time.slice(0, 5),
        }));
        setTimeSlots(expertListData);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //! fetch all notifications of help requests
  const fetchAllHelpRequests = async (user) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas_Supervisor_Expert/GetAllHelpRequests?teacher_id=${user.tid}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setHelpRequests(result);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllHelpRequests(user);
  }, []);

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
    fetchAllTimesSlot(selectedDay);
  };

  const handleTimeSlotSelection = (option) => {
    setSelectedTimeSlot(option);
    console.log(option);
  };
  const handleSubmit = async (request) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas_Supervisor_Expert/ApproveTheAppointment?aid=${request.aid}&date=${currentDate}&timeSlot=${selectedTimeSlot.label}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      alert(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center py-6 min-[320px]:w-[320px]">
      <div className="flex justify-center w-full mb-4">
        <img
          src={biitSas}
          alt="Biit Logo"
          className="w-3/12 max-[320px]:w-4/6"
        />
      </div>
      <h1 className="text-2xl font-bold mb-4 text-green-500">Help Request</h1>
      {helpRequests && helpRequests.length > 0 ? (
        <>
          <Accordion defaultActiveKey={0} className="min-[320px]:w-[320px]">
            {helpRequests?.map((request, index) => (
              <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header>
                  {request?.student?.username}
                </Accordion.Header>
                <Accordion.Body>
                  <div className="bg-gray-100 w-full max-w-2xl p-6 rounded-lg shadow-md">
                    <table className="table-auto w-full">
                      <tbody>
                        <tr>
                          <td className="font-semibold text-sm py-2">
                            Arid Number:
                          </td>
                          <td>{request.student.st_id}</td>
                        </tr>
                        <tr>
                          <td className="font-semibold text-sm py-2">Name:</td>
                          <td>{request.student.username}</td>
                        </tr>
                        <tr>
                          <td className="font-semibold py-2">Technology:</td>
                          <td>{request.student.name}</td>
                        </tr>
                        <tr>
                          <td className="font-semibold py-2">Date:</td>
                          <td>
                            {!toggle ? (
                              <span className="font-semibold">
                                {currentDate || request.schedule.date}
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
                            <span className="font-normal">
                              {day || request.schedule.Day}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="font-bold py-2">Time:</td>
                          <td className="font-bold">
                            {!toggle ? (
                              <span>
                                {request.TimeSlot.start_time ||
                                  (selectedTimeSlot && selectedTimeSlot.value)}
                              </span>
                            ) : (
                              <Dropdown
                                options={timeSlotsOptions}
                                value={selectedTimeSlot}
                                OnSelect={handleTimeSlotSelection}
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
                    <div className="flex space-x-4 mt-4">
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        onClick={() => handleSubmit(request)}
                      >
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
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </>
      ) : (
        <span>No Help Request</span>
      )}
    </div>
  );
}

export default AnotherHelpRequest;
