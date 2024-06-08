import React, { useEffect, useState } from "react";
import biitlogo from "../../../assets/extra/biitSAS.png";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";
import Calendar from "react-calendar";
import "../../../assets/css/style.css";
import "react-calendar/dist/Calendar.css";
function TeacherDashboard() {
  const userString = localStorage.getItem("user");
  const userFounded = userString ? JSON.parse(userString) : null;
  const [isUser, setIsUser] = useState(userFounded);
  const [allNewAssignedTasks, setAllNewAssignedTasks] = useState([]);
  //! Group Requests
  const [allgroupRequests, setAllGroupRequests] = useState([]);
  const [value, setValue] = useState(new Date());
  const navigate = useNavigate();

  const [allSupervisorMeetings, setAllSupervisorMeetings] = useState([
    {
      meetId: "3",
      meetTitle: "Weekly Meeting",
      meetDesc: "Please Come in my office",
      meetDate: "06-06-2024",
      meetTime: "12:30pm",
      teacher: "Sir Zahid",
    },
  ]);
  const [allTechnicalExpertMeetings, setAllTechnicalExpertMeetings] = useState([
    // {
    //   meetId: "1",
    //   meetTitle: "Weekly Meeting",
    //   meetDesc: "Please Come in my office",
    //   meetDate: "2024-05-02",
    //   meetTime: "12:30pm",
    //   teacher: "Sir Zahid",
    // },
  ]);
  const [allMeetings, setAllMeetings] = useState(allSupervisorMeetings);
  const [projectCommetieeApprovals, setProjectCommettieeAprovals] = useState(
    []
  );

  const groupRequestsForProject = async () => {
    try {
      const response = await fetch(
        `http://localhost/officialPSAS/api/PSAS_Supervisor_Expert/GroupRequests?teacher_id=${isUser.uid}`
      );
      const data = await response.json();
      if (data) {
        setAllGroupRequests(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const projectCommetieeApproval = async () => {
    try {
      const response = await fetch(
        `http://localhost/officialPSAS/api/PSAS_Supervisor_Expert/ProjectCommittieeAproval?teacher_id=${isUser.uid}`
      );
      const data = await response.json();
      if (data) {
        setProjectCommettieeAprovals(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const allAssignedTasks = async () => {
    try {
      const response = await fetch(
        `http://localhost/officialPSAS/api/PSAS_Supervisor_Expert/allAssignedTasks?teacher_id=${isUser.uid}`
      );
      const data = await response.json();
      if (data) {
        setAllNewAssignedTasks(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const FetchallMeetings = async () => {
    try {
      const response = await fetch(
        `http://localhost/officialPSAS/api/PSAS_Supervisor_Expert/FetchAllMeetings?teacher_id=${isUser.uid}`
      );
      const data = await response.json();
      if (data) {
        // setAllMeetings(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isUser) {
      groupRequestsForProject();
      projectCommetieeApproval();
      allAssignedTasks();
      FetchallMeetings();
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
    <>
      <div className="w-full h-full p-1 bg-gray-50">
        <div className="flex justify-center">
          <img src={biitlogo} alt="biit Logo" className="md:w-2/6 " />
        </div>
        <div className="container w-full grid xl:grid-cols-4 lg:grid-cols-4 grid-cols-2 gap-2  mt-2">
          <Card className="w-full">
            <Card.Header className="font-semibold text-[10px] text-center">
              Group Requests
            </Card.Header>
            <Card.Body>
              <Card.Title className="flex justify-center items-center">
                <span className="text-lg">
                  {allgroupRequests && allgroupRequests.length}
                </span>
                <span>
                  {allgroupRequests && allgroupRequests.length > 0 ? (
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
              Project Commettiee Messages
            </Card.Header>
            <Card.Body>
              <Card.Title className="flex justify-center items-center">
                <span className="text-lg">
                  {projectCommetieeApprovals &&
                    projectCommetieeApprovals.length}
                </span>
                <span>
                  {projectCommetieeApprovals &&
                  projectCommetieeApprovals.length > 0 ? (
                    <ArrowUpWideNarrow className="w-[10px]" />
                  ) : (
                    <ArrowDownWideNarrow className="w-[10px]" />
                  )}
                </span>
              </Card.Title>
            </Card.Body>
          </Card>
          <Card className="w-full">
            <Card.Header className="font-semibold text-[13px] text-center">
              Tasks
            </Card.Header>
            <Card.Body>
              <Card.Title className="flex justify-center items-center">
                <span className="text-lg">
                  {allNewAssignedTasks && allNewAssignedTasks.length}
                </span>
                <span>
                  {allNewAssignedTasks && allNewAssignedTasks.length > 0 ? (
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
                onChange={setValue}
                className="w-full"
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
    </>
  );
}

export default TeacherDashboard;
