import React, { useEffect, useState } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { Table } from "react-bootstrap";

function Progress() {
  const isUser = localStorage.getItem("user");
  const user = JSON.parse(isUser);
  const [meetings, setMeetings] = useState([]);
  const [group, setGroup] = useState();
  const [meetingsType, setMeetingsType] = useState("upcomming Meetings");

  const handleMeetingChange = (type) => {
    setMeetingsType(type);
  };

  const GroupDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost/officialpsas/api/psas/GroupDetails?regNo=${user.uid}`
      );
      const result = await response.json();
      console.log(result);
      if (typeof result === "object") {
        setGroup(result);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GroupDetails();
  }, []);

  const LogMeetingsFromThatDate = async (regNo) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/LogMeetingsFromThatDate?regNo=${user.uid}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setMeetings(result);
        console.log(result);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UpcommingMeetingsFromThatDate = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/UpcommingMeetingsFromThatDate?regNo=${user.uid}`
      );
      const result = await response.json();
      if (typeof result === "object") {
        setMeetings(result);
        console.log(result);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (meetingsType === "upcomming Meetings") {
      UpcommingMeetingsFromThatDate();
    } else if (meetingsType === "logs meetings") {
      LogMeetingsFromThatDate();
    }
  }, [meetingsType]);

  return (
    <div className="container">
      <div className="text-center mb-4 flex flex-col justify-center items-center">
        <img src={BiitSAS} alt="BiitSAS" className="w-8/12" />
        <h1 className="mt-3 text-green-500 text-sm">
          {group && group?.project?.title}
        </h1>
      </div>
      <div>
        <div className="flex justify-center mt-2">
          <h6
            className={`cursor-pointer ${
              meetingsType === "upcomming Meetings"
                ? "bg-green-500 text-white font-bold text-sm"
                : "bg-white text-black hover:bg-green-400 hover:text-gray-500 text-sm"
            } px-8 py-2 transition-all border-b border-gray-400 rounded-sm`}
            onClick={() => {
              handleMeetingChange("upcomming Meetings");
              UpcommingMeetingsFromThatDate();
            }}
          >
            Upcoming Meetings
          </h6>
          <h6
            className={`cursor-pointer ${
              meetingsType === "logs meetings"
                ? "bg-green-500 text-white font-bold text-sm"
                : "bg-white text-black hover:bg-green-400 hover:text-gray-500 text-sm"
            } px-8 py-2 border-b border-gray-400 transition-all rounded-sm`}
            onClick={() => {
              handleMeetingChange("logs meetings");
              LogMeetingsFromThatDate(user.uid);
            }}
          >
            Logs
          </h6>
        </div>
        {meetingsType === "upcomming Meetings" ? (
          <>
            {meetings?.upcommingMeetings &&
              meetings?.upcommingMeetings?.map((meeting, index) => (
                <Card key={index} className="mb-3">
                  <Card.Header className="flex justify-between items-center">
                    <div className="text-[13px]">
                      {meeting?.group?.groupTitle}
                    </div>
                    <div className="text-[10px]">
                      {meeting.Date !== null
                        ? new Date(meeting?.Date).toLocaleDateString()
                        : meeting?.Day}
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <span className="text-[16px] font-semibold">
                        {meeting?.title}
                      </span>
                    </Card.Title>
                    <Card.Text className="text-[10px]">
                      {meeting?.description}
                    </Card.Text>
                    <Card.Text className="text-[10px]">
                      {`${meeting?.time?.start_time} -- ${meeting?.time?.end_time}`}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>Supervisor : {meeting?.username}</Card.Footer>
                </Card>
              ))}
          </>
        ) : (
          <>
            {meetings &&
              meetings.length > 0 &&
              meetings?.map((meeting, index) => (
                <Card key={index} className="mb-3">
                  <Card.Header className="d-flex justify-content-between">
                    <div className="text-[11px]">{meeting?.projectTitle}</div>
                    <div className="text-[10px]">
                      {meeting?.MeetingDate
                        ? new Date(meeting?.MeetingDate).toLocaleDateString()
                        : "Date"}
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="text-[13px] font-semibold">
                      {meeting?.MeetingTitle}
                    </Card.Title>
                    <Card.Text className="text-[9px] ">
                      {meeting?.MeetingDescription}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Table responsive bordered hover>
                      <thead>
                        <tr>
                          <th className="text-center">Name</th>
                          <th className="text-center">Attendance</th>
                          <th className="text-center">Comments</th>
                        </tr>
                      </thead>
                      <tbody>
                        {meeting?.Progresses?.map((student, index) => (
                          <tr key={index}>
                            <td className="text-[13px] text-center">
                              {student?.Username}
                            </td>
                            <td className="text-[13px] text-center">
                              <input
                                type="checkbox"
                                checked={student?.isPresent === 1}
                                readOnly
                              />
                            </td>
                            <td className="text-[13px] text-center">
                              {student?.Comments}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Footer>
                </Card>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Progress;
