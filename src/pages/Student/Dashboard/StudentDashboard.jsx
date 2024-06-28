import React, { useEffect, useState } from "react";
import biitlogo from "../../../assets/extra/biitSAS.png";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";
import Calendar from "react-calendar";
import "../../../assets/css/style.css";
import "react-calendar/dist/Calendar.css";
import { Button } from "react-bootstrap";

function StudentDashboard() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [value, setValue] = useState(new Date());
  const navigate = useNavigate();
  const [allgroupCreationRequests, setAllGroupCreationRequests] = useState([]);
  const [allSentRequests, setAllSentRequest] = useState([]);
  const [allPendingAssistanceRequests, setAllPendingAssistanceRequests] =
    useState([]);
  const [allSupervisorMeetings, setAllSupervisorMeetings] = useState([]);
  const [allAppointmentMeetings, setAllAppointmentMeetings] = useState([]);
  const [allMeetings, setAllMeetings] = useState([]);
  const [groupCreated, setGroupCreated] = useState(false);
  // Fetch all group creation requests
  const getAllGroupCreationRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost/officialpsas/api/psas/getAllGroupCreationRequests?regNo=${user.uid}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setAllGroupCreationRequests(result);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all sent group joining requests
  const getAllSendGroupJoiningRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost/officialpsas/api/psas/getAllGroupCreationRequests?regNo=${user.uid}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setAllSentRequest(result);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all pending assistance requests
  const GettingAllAssistanceRequestsPending = async () => {
    try {
      const response = await fetch(
        `http://localhost/officialpsas/api/psas/GettingAllAssistanceRequestsPending?regNo=${user.uid}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setAllPendingAssistanceRequests(result);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all supervisor and appointment meetings
  const gettingAllMeetingsAndAppointments = async () => {
    try {
      const response = await fetch(
        `http://localhost/officialpsas/api/psas/gettingAllMeetingsAndAppointments?regNo=${user.uid}`
      );
      const result = await response.json();
      if (result && typeof result === "object") {
        setAllSupervisorMeetings(result.allMeetings || []);
        setAllAppointmentMeetings(result.AllAppointmentRequests || []);
        // Merge supervisor and appointment meetings into one array
        setAllMeetings([
          ...(result.allMeetings || []),
          ...(result.AllAppointmentRequests || []),
        ]);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGroupCreationRequests();
    getAllSendGroupJoiningRequests();
    GettingAllAssistanceRequestsPending();
    gettingAllMeetingsAndAppointments();
  }, []);

  // Update meetings when the selected date changes
  useEffect(() => {
    const selectedDate = new Date(value);
    const supervisorMeetingsOnDate = allSupervisorMeetings.filter((meeting) =>
      meeting.date
        ? new Date(meeting.date).toDateString() === selectedDate.toDateString()
        : meeting.Day ===
          selectedDate.toLocaleString("en-US", { weekday: "long" })
    );
    const appointmentMeetingsOnDate = allAppointmentMeetings.filter((meeting) =>
      meeting.date
        ? new Date(meeting.date).toDateString() === selectedDate.toDateString()
        : meeting.Day ===
          selectedDate.toLocaleString("en-US", { weekday: "long" })
    );
    // Set meetings for the selected date
    setAllMeetings([...supervisorMeetingsOnDate, ...appointmentMeetingsOnDate]);
    console.log(allMeetings);
  }, [allSupervisorMeetings, allAppointmentMeetings, value]);

  // Handle calendar date select
  const handleSelectDate = (date) => {
    setValue(date);
  };

  const handleFeedback = () => {
    navigate("/student/feedback");
  };

  const GettingGroupInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost/officialpsas/api/psas/GettingGroupInfo?regNo=${user.uid}`
      );
      const result = await response.text();
      console.log(result);
      if (result.includes(1)) {
        setGroupCreated((curr) => !curr);
        console.log(groupCreated);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GettingGroupInfo();
  }, []);

  return (
    <div className="w-full h-full p-1 bg-gray-50">
      <div className="flex justify-center">
        <img
          src={biitlogo}
          alt="biit Logo"
          className="xl:w-2/6 lg:w-3/6 md:w-4/6 sm:w-5/6"
        />
      </div>
      <div className="container mx-auto p-2">
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 grid-cols-2 gap-2">
          <Card className="w-full">
            <Card.Header className="font-semibold text-xs text-center">
              Group Creation Requests
            </Card.Header>
            <Card.Body>
              <Card.Title className="flex justify-center items-center">
                <span className="text-xl">
                  {allgroupCreationRequests && allgroupCreationRequests.length}
                </span>
                <span>
                  {allSentRequests.length > 0 ? (
                    <ArrowUpWideNarrow className="w-[16px]" />
                  ) : (
                    <ArrowDownWideNarrow className="w-[16px]" />
                  )}
                </span>
              </Card.Title>
            </Card.Body>
          </Card>
          <Card className="w-full">
            <Card.Header className="font-semibold text-xs text-center">
              Sent Group Requests
            </Card.Header>
            <Card.Body>
              <Card.Title className="flex justify-center items-center">
                <span className="text-xl">
                  {allSentRequests && allSentRequests.length}
                </span>
                <span>
                  {allSentRequests.length > 0 ? (
                    <ArrowUpWideNarrow className="w-[16px]" />
                  ) : (
                    <ArrowDownWideNarrow className="w-[16px]" />
                  )}
                </span>
              </Card.Title>
            </Card.Body>
          </Card>
          <Card className="w-full">
            <Card.Header className="font-semibold text-xs text-center">
              Technical Assistance Requests
            </Card.Header>
            <Card.Body>
              <Card.Title className="flex justify-center items-center">
                <span className="text-xl">
                  {allPendingAssistanceRequests &&
                    allPendingAssistanceRequests?.length}
                </span>
                <span>
                  {allPendingAssistanceRequests &&
                  allPendingAssistanceRequests?.length > 0 ? (
                    <ArrowUpWideNarrow className="w-[16px]" />
                  ) : (
                    <ArrowDownWideNarrow className="w-[16px]" />
                  )}
                </span>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="flex flex-col">
        {groupCreated ? (
          <Button
            variant="primary"
            onClick={() => {
              handleFeedback();
            }}
          >
            Feedback
          </Button>
        ) : (
          <></>
        )}
      </div>
      <div className="container mt-4">
        <h3 className="text-center text-xl">Meetings</h3>
        <div className="grid md:grid-cols-2 sm:grid-cols-1">
          {/* Calendar component */}
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
                      : meeting.Day ===
                        date.toLocaleString("en-US", { weekday: "long" })
                );
                const appointmentMeetingsOnDate = allAppointmentMeetings.filter(
                  (meeting) =>
                    meeting.date
                      ? new Date(meeting.date).toDateString() ===
                        date.toDateString()
                      : meeting.Day ===
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
          {/* Display meetings for selected date */}
          <div className="h-full bg-gray-200 overflow-auto p-3">
            {allMeetings &&
              allMeetings.map((item, index) => (
                <Card key={index} className="w-full mb-2">
                  <Card.Header className="text-center">
                    {item.title}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="text-center">
                      Sir {item.username}
                    </Card.Title>
                    <Card.Subtitle className="flex justify-evenly items-center space-x-2">
                      <span>
                        {item.date
                          ? new Date(item.date).toLocaleDateString()
                          : item.Day}
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

export default StudentDashboard;
