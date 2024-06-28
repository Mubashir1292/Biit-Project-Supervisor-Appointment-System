import React, { useEffect, useState } from "react";
import biitlogo from "../../../assets/extra/biitSAS.png";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";
import Calendar from "react-calendar";
import "../../../assets/css/style.css";
import "react-calendar/dist/Calendar.css";

function TeacherDashboard() {
  const userString = localStorage.getItem("user");
  const userFounded = userString ? JSON.parse(userString) : null;
  const [isUser, setIsUser] = useState(userFounded);
  const [allGroupRequests, setAllGroupRequests] = useState([]);
  const [value, setValue] = useState(new Date());
  const navigate = useNavigate();

  const [allSupervisorMeetings, setAllSupervisorMeetings] = useState([]);
  const [allAppointmentMeetings, setAllAppointmentMeetings] = useState([]);
  const [allMeetings, setAllMeetings] = useState([]);
  const [projectCommetieeApprovals, setProjectCommettieeAprovals] = useState(
    []
  );
  const handleNavigate = (path) => {
    navigate(path);
  };

  // Fetch all meetings for the logged-in user
  const fetchAllMeetings = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas_Supervisor_Expert/AllMeetingsOfTeacher?teacher_id=${isUser.uid}`
      );
      const result = await response.json();
      if (result && result !== "No Meetings Founded") {
        setAllSupervisorMeetings(result?.Meetings || []);
        setAllAppointmentMeetings(result?.AllMeetings || []);
        console.log(result);
      } else {
        alert("No meetings found.");
      }
    } catch (error) {
      console.log("Error fetching meetings:", error);
    }
  };

  // Fetch group requests for projects
  const fetchGroupRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost/officialPSAS/api/PSAS_Supervisor_Expert/GroupRequests?teacher_id=${isUser.uid}`
      );
      const data = await response.json();
      if (data) {
        setAllGroupRequests(data || []);
      }
    } catch (error) {
      console.log("Error fetching group requests:", error);
    }
  };

  // Fetch project committee approvals
  const fetchProjectCommetieeApproval = async () => {
    try {
      const response = await fetch(
        `http://localhost/officialPSAS/api/PSAS_Supervisor_Expert/ProjectCommittieeAproval?teacher_id=${isUser.uid}`
      );
      const data = await response.json();
      if (data) {
        setProjectCommettieeAprovals(data || []);
      }
    } catch (error) {
      console.log("Error fetching project committee approvals:", error);
    }
  };

  useEffect(() => {
    if (isUser) {
      fetchGroupRequests();
      fetchProjectCommetieeApproval();
      fetchAllMeetings();
    } else {
      navigate("/");
    }
  }, [isUser]);

  // Ensure proper useEffect dependencies and API call handling

  useEffect(() => {
    const fetchAllMeetings = async () => {
      try {
        const response = await fetch(
          `http://localhost/OfficialPSAS/api/psas_Supervisor_Expert/AllMeetingsOfTeacher?teacher_id=${isUser.uid}`
        );
        const result = await response.json();
        if (result && result !== "No Meetings Founded") {
          setAllSupervisorMeetings(result?.Meetings || []);
          setAllAppointmentMeetings(result?.AllMeetings || []); // Update appointment meetings
        } else {
          alert("No meetings found.");
        }
      } catch (error) {
        console.log("Error fetching meetings:", error);
      }
    };

    if (isUser) {
      fetchGroupRequests();
      fetchProjectCommetieeApproval();
      fetchAllMeetings();
    } else {
      navigate("/");
    }
  }, [isUser]); // Ensure correct dependency array for useEffect

  // Update meetings when the selected date changes
  useEffect(() => {
    const selectedDate = new Date(value);
    const supervisorMeetingsOnDate = allSupervisorMeetings.filter((meeting) => {
      return meeting.date
        ? new Date(meeting.date).toDateString() === selectedDate.toDateString()
        : meeting.day ===
            selectedDate.toLocaleString("en-US", { weekday: "long" });
    });

    const appointmentMeetingsOnDate = allAppointmentMeetings.filter(
      (meeting) => {
        return meeting.date
          ? new Date(meeting.date).toDateString() ===
              selectedDate.toDateString()
          : meeting.day ===
              selectedDate.toLocaleString("en-US", { weekday: "long" });
      }
    );

    setAllMeetings([...supervisorMeetingsOnDate, ...appointmentMeetingsOnDate]);
  }, [allSupervisorMeetings, allAppointmentMeetings, value]);
  const handleSelectDate = (date) => {
    setValue(date);
  };

  return (
    <div className="w-full h-full p-1 bg-gray-50">
      <div className="flex justify-center">
        <img src={biitlogo} alt="biit Logo" className="md:w-2/6 " />
      </div>
      <div className="container w-full grid xl:grid-cols-4 lg:grid-cols-4 grid-cols-2 gap-2 mt-2">
        <Card className="w-full">
          <Card.Header className="font-semibold text-[10px] text-center">
            Group Requests
          </Card.Header>
          <Card.Body>
            <Card.Title className="flex justify-center items-center">
              <span className="text-lg">{allGroupRequests.length}</span>
              <span>
                {allGroupRequests.length > 0 ? (
                  <ArrowUpWideNarrow className="w-[10px]" />
                ) : (
                  <ArrowDownWideNarrow className="w-[10px]" />
                )}
              </span>
            </Card.Title>
          </Card.Body>
        </Card>
        <Card className="w-full">
          <Card.Header className="font-semibold text-[10px] text-center">
            Project Committee Messages
          </Card.Header>
          <Card.Body>
            <Card.Title className="flex justify-center items-center">
              <span className="text-lg">
                {projectCommetieeApprovals.length}
              </span>
              <span>
                {projectCommetieeApprovals.length > 0 ? (
                  <ArrowUpWideNarrow className="w-[10px]" />
                ) : (
                  <ArrowDownWideNarrow className="w-[10px]" />
                )}
              </span>
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
      <div className="container mt-4">
        <h3 className="text-center text-xl">Meetings</h3>
        <div className="grid md:grid-cols-2 sm:grid-cols-1">
          <div>
            <Calendar
              value={value}
              onChange={handleSelectDate}
              className="w-full"
              tileContent={({ date }) => {
                const supervisorMeetingsOnDate = allSupervisorMeetings.filter(
                  (meeting) =>
                    meeting.date
                      ? new Date(meeting.date).toDateString() ===
                        date.toDateString()
                      : meeting.day ===
                        date.toLocaleString("en-US", { weekday: "long" })
                );
                const appointmentMeetingsOnDate = allAppointmentMeetings.filter(
                  (meeting) =>
                    meeting.date
                      ? new Date(meeting.date).toDateString() ===
                        date.toDateString()
                      : meeting.day ===
                        date.toLocaleString("en-US", { weekday: "long" })
                );
                const totalMeetings = [
                  ...supervisorMeetingsOnDate,
                  ...appointmentMeetingsOnDate,
                ];
                return totalMeetings.length > 0 ? (
                  <div className="flex justify-center items-center">
                    {supervisorMeetingsOnDate.length > 0 && (
                      <div className="dot bg-green-400 ml-1 w-2 h-2 rounded-full"></div>
                    )}
                    {appointmentMeetingsOnDate.length > 0 && (
                      <div className="dot bg-blue-400 ml-1 w-2 h-2 rounded-full"></div>
                    )}
                    {[...Array(totalMeetings.length - 1)].map((_, index) => (
                      <div
                        key={index}
                        className="dot bg-gray-400 ml-1 w-2 h-2 rounded-full"
                      ></div>
                    ))}
                  </div>
                ) : null;
              }}
            />
          </div>
          <div className="h-full bg-gray-200 overflow-auto p-3">
            {allMeetings.map((item, index) => (
              <Card key={index} className="w-full mb-2">
                <Card.Header className="text-center">{item.title}</Card.Header>
                <Card.Body>
                  <Card.Title className="text-center">
                    {item.username}
                  </Card.Title>
                  <Card.Subtitle className="flex justify-evenly items-center space-x-2">
                    <span>
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : item.day}
                    </span>
                    <span>{`${item.start_time || ""} - ${
                      item.end_time || ""
                    }`}</span>
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
  );
}

export default TeacherDashboard;
