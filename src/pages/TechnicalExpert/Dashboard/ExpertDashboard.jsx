import React, { useEffect, useState } from "react";
import biitlogo from "../../../assets/extra/biitSAS.png";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";
import Calendar from "react-calendar";
import "../../../assets/css/style.css";
import "react-calendar/dist/Calendar.css";

function TeacherDashboard() {
  const [helpRequests, setHelpRequests] = useState([]);
  const [value, setValue] = useState(new Date());
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [allMeetings, setAllMeetings] = useState([]);
  const [selectedMeetings, setSelectedMeetings] = useState([]);

  //! Fetch all notifications of help requests
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

  // Fetch all appointments for the teacher
  const getAllAppointments = async () => {
    try {
      const response = await fetch(
        `http://localhost/officialpsas/api/psas_supervisor_expert/GetAllAppointments?teacher_id=${user.tid}`
      );
      const result = await response.json();
      if (Array.isArray(result) || typeof result === "object") {
        setAllMeetings(result);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllHelpRequests(user);
    getAllAppointments();
  }, []);

  // Update meetings when the selected date changes
  useEffect(() => {
    const selectedDate = new Date(value);
    const supervisorMeetingsOnDate = allMeetings.filter((meeting) =>
      meeting.date
        ? new Date(meeting.date).toDateString() === selectedDate.toDateString()
        : meeting.day ===
          selectedDate.toLocaleString("en-US", { weekday: "long" })
    );
    setSelectedMeetings(supervisorMeetingsOnDate);
  }, [value, allMeetings]);

  const handleSelectDate = (date) => {
    setValue(date);
  };

  return (
    <>
      <div className="w-full h-full p-1 bg-gray-50">
        <div className="flex justify-center">
          <img src={biitlogo} alt="biit Logo" className="max-[320px] w-9/12" />
        </div>
        <div className="container w-full h-auto flex flex-row justify-evenly mt-2">
          <Card className="w-[16rem]">
            <Card.Header className="font-bold text-[13px] text-center">
              Help Requests
            </Card.Header>
            <Card.Body>
              <Card.Title className="flex justify-center items-center">
                <span className="text-4xl">{helpRequests.length}</span>
                <span>
                  {helpRequests && helpRequests.length > 0 ? (
                    <ArrowUpWideNarrow className="text-2xl" />
                  ) : (
                    <ArrowDownWideNarrow className="text-2xl" />
                  )}
                </span>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="container w-full h-auto mt-2">
          <div>
            <Calendar
              value={value}
              onChange={handleSelectDate}
              className="w-full"
              tileContent={({ date }) => {
                const appointmentMeetingsOnDate = allMeetings.filter(
                  (meeting) =>
                    meeting.date
                      ? new Date(meeting.date).toDateString() ===
                        date.toDateString()
                      : meeting.day ===
                        date.toLocaleString("en-US", { weekday: "long" })
                );
                return (
                  appointmentMeetingsOnDate.length > 0 && (
                    <div className="flex flex-row justify-center items-center">
                      {appointmentMeetingsOnDate.map((meeting, index) => (
                        <div
                          key={index}
                          className="dot bg-blue-400 ml-1 w-1 h-1 rounded-full"
                        ></div>
                      ))}
                    </div>
                  )
                );
              }}
            />
          </div>
          <h3 className="text-center text-xl">Meetings</h3>
          <div className="grid max-[320px] grid-cols-1">
            <div className="h-full">
              <div className="bg-gray-200 overflow-auto h-80 flex flex-col items-center justify-around">
                {selectedMeetings.map((item, index) => (
                  <Card key={index} className="w-[16rem] h-40 mt-2 border">
                    <Card.Header className="text-center">
                      <span>{item.title}</span>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title className="text-center">
                        <span className="text-xs">{item.username}</span>
                      </Card.Title>
                      <Card.Subtitle className="flex justify-evenly items-center space-x-2">
                        <span className="text-sm">
                          {item.date.split("T")[0]}
                        </span>
                        <span>{`${item.start_time} - ${item.end_time}`}</span>
                      </Card.Subtitle>
                      <Card.Text className="text-center">
                        {item.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
