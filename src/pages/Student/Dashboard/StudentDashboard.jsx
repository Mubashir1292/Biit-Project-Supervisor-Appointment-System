import React, { useEffect, useState } from "react";
import biitlogo from "../../../assets/extra/biitSAS.png";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";
import Calendar from "react-calendar";
import "../../../assets/css/style.css";

function StudentDashboard() {
  const [sentRequest, setSentRequest] = useState([]);
  const [isUser, setIsUser] = useState(null);
  const [value, setValue] = useState(new Date());
  const navigate = useNavigate();
  const [allgroupRequests, setAllGroupRequests] = useState([
    { group_Id: "8", group_Title: "Fyp-02" },
    { group_Id: "9", group_Title: "Fyp-2" },
  ]);
  const [allSentRequests, setAllSentRequest] = useState([
    { group_Id: "8", group_Title: "Fyp-2" },
    { group_Id: "9", group_Title: "Fyp-1" },
  ]);
  const [allSupervisorMeetings, setAllSupervisorMeetings] = useState([
    {
      meetId: "1",
      meetTitle: "Weekly Meeting",
      meetDesc: "Please Come in my office",
      meetDate: "2024-05-01",
      meetTime: "12:30pm",
      teacher: "Sir Zahid",
    },
    {
      meetId: "2",
      meetTitle: "Weekly Meeting",
      meetDesc: "Please Come in my office",
      meetDate: "2024-05-01",
      meetTime: "12:30pm",
      teacher: "Sir Zahid",
    },
    {
      meetId: "3",
      meetTitle: "Weekly Meeting",
      meetDesc: "Please Come in my office",
      meetDate: "2024-05-01",
      meetTime: "12:30pm",
      teacher: "Sir Zahid",
    },
  ]);
  const [allTechnicalExpertMeetings, setAllTechnicalExpertMeetings] = useState([
    {
      meetId: "1",
      meetTitle: "Weekly Meeting",
      meetDesc: "Please Come in my office",
      meetDate: "2024-05-01",
      meetTime: "12:30pm",
      teacher: "Sir Zahid",
    },
    {
      meetId: "1",
      meetTitle: "Weekly Meeting",
      meetDesc: "Please Come in my office",
      meetDate: "2024-05-02",
      meetTime: "12:30pm",
      teacher: "Sir Zahid",
    },
  ]);
  const [allMeetings, setAllMeetings] = useState([]);

  const handleGetRequests = async (user) => {
    try {
      setIsUser(user);
      const response = await fetch(
        `http://localhost/officialPSAS/api/psas/getAllRequests?Id=${user.uid}`
      );
      const data = await response.json();
      if (data.length !== 0) {
        setSentRequest(data);
        console.log(data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    if (user) {
      console.log(user);
      handleGetRequests(user);
    } else {
      navigate("/");
    }
  }, []);

  const handleSelectDate = (date) => {
    const selectedDate = new Date(date);
    const supervisorMeetingsOnDate = allSupervisorMeetings.filter(
      (meeting) =>
        new Date(meeting.meetDate).toDateString() ===
        selectedDate.toDateString()
    );
    const ExpertMeetings = allTechnicalExpertMeetings.filter(
      (meeting) =>
        new Date(meeting.meetDate).toDateString() ===
        selectedDate.toDateString()
    );
    setAllMeetings([...supervisorMeetingsOnDate, ...ExpertMeetings]);
    setValue(selectedDate);
    console.log(selectedDate);
    console.log(allMeetings.length);
  };

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
                <span className="text-xl">{allgroupRequests.length}</span>
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
                <span className="text-xl">{allSentRequests.length}</span>
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
                <span className="text-xl">{allSentRequests.length}</span>
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
              Group Messages
            </Card.Header>
            <Card.Body>
              <Card.Title className="flex justify-center items-center">
                <span className="text-xl">{allSentRequests.length}</span>
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
        </div>
      </div>
      <div className="container mt-4">
        <h3 className="text-center text-xl">Meetings</h3>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 -ml-1">
          <div>
            <Calendar
              value={value}
              onChange={setValue}
              className="w-full"
              onClickDay={handleSelectDate}
              tileContent={({ date, view }) => {
                const supervisorMeetingsOnDate = allSupervisorMeetings.filter(
                  (meeting) =>
                    new Date(meeting.meetDate).toDateString() ===
                    date.toDateString()
                );
                const expertMeetingsOnDate = allTechnicalExpertMeetings.filter(
                  (meeting) =>
                    new Date(meeting.meetDate).toDateString() ===
                    date.toDateString()
                );
                const totalMeetings = [
                  ...supervisorMeetingsOnDate,
                  ...expertMeetingsOnDate,
                ];
                return totalMeetings.length > 0 ? (
                  <div className="flex justify-center items-center">
                    {[...Array(totalMeetings.length)].map((_, index) => (
                      <div
                        key={index}
                        className="dot bg-green-400 ml-1 w-2 h-2 rounded-full"
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
                <Card.Header className="text-center">
                  {item.meetTitle}
                </Card.Header>
                <Card.Body>
                  <Card.Title className="text-center">
                    {item.teacher}
                  </Card.Title>
                  <Card.Subtitle className="flex justify-evenly items-center space-x-2">
                    <span>{item.meetDate}</span>
                    <span>{item.meetTime}</span>
                  </Card.Subtitle>
                  <Card.Text className="text-center">{item.meetDesc}</Card.Text>
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
