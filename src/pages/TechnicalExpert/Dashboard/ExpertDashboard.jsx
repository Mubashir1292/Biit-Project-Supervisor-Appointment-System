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
  const [isUser, setIsUser] = useState(null);
  const [value, setValue] = useState(new Date());
  const navigate = useNavigate();

  const [allgroupRequests, setAllGroupRequests] = useState([
    {
      group_Id: "8",
      group_Title: "Fyp-02",
    },
    {
      group_Id: "9",
      group_Title: "Fyp-2",
    },
  ]);
  const [allSentRequests, setAllSentRequest] = useState([
    {
      group_Id: "8",
      group_Title: "Fyp-2",
    },
    {
      group_Id: "9",
      group_Title: "Fyp-1",
    },
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
      meetTitle: "Meeting With Mubashir",
      meetDesc: "Please Come in my office",
      meetDate: "2024-05-01",
      meetTime: "12:30pm",
      teacher: "Sir Zahid",
    },
    {
      meetId: "2",
      meetTitle: "Meeting with Ali Safeer",
      meetDesc: "Please Come in my office",
      meetDate: "2024-05-02",
      meetTime: "12:30pm",
      teacher: "Sir Zahid",
    },
  ]);
  const [allMeetings, setAllMeetings] = useState([]);

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
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    if (user) {
      console.log(user);
    } else {
      navigate("/");
    }
    fetchAllHelpRequests(user);
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
    <>
      <div className="w-full h-full p-1 bg-gray-50">
        <div className="flex justify-center">
          <img src={biitlogo} alt="biit Logo" className="max-[320px]:w-9/12" />
        </div>
        <div className="container w-full h-auto flex flex-row justify-evenly mt-2">
          <Card className="w-[16rem]">
            <Card.Header className="font-bold text-[13px] text-center">
              Help Requests
            </Card.Header>
            <Card.Body>
              <Card.Title className="flex justify-center items-center">
                <span className="text-4xl">
                  {helpRequests.length && helpRequests.length}
                </span>
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
          <h3 className="text-center text-xl">Meetings</h3>
          <div className="grid grid-cols-2 max-[320px]:grid-cols-1">
            <div>
              <Calendar
                value={value}
                onChange={setValue}
                onClickDay={handleSelectDate}
                tileContent={({ date, view }) => {
                  const supervisorMeetingsOnDate = allSupervisorMeetings.filter(
                    (meeting) =>
                      new Date(meeting.meetDate).toDateString() ===
                      date.toDateString()
                  );
                  const expertMeetingsOnDate =
                    allTechnicalExpertMeetings.filter(
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
                          className="dot bg-green-400 ml-[2px]"
                        ></div>
                      ))}
                    </div>
                  ) : null;
                }}
              />
            </div>
            <div className="h-full">
              <div className="bg-gray-200 overflow-auto h-80 flex flex-col items-center justify-around">
                {allMeetings.map((item, index) => (
                  <Card key={index} className="w-[16rem] h-40 mt-2 border">
                    <Card.Header className="text-center">
                      <span>{item.meetTitle}</span>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title className="text-center">
                        <span>{item.teacher}</span>
                      </Card.Title>
                      <Card.Subtitle className="flex justify-evenly items-center space-x-2 ">
                        <span>{item.meetDate}</span>
                        <span>{item.meetTime}</span>
                      </Card.Subtitle>
                      <Card.Text className="text-center">
                        {item.meetDesc}
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
