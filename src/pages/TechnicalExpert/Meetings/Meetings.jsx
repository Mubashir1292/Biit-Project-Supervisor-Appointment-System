import React, { useState, useEffect } from "react";
import { Button, Card, Table } from "react-bootstrap";
import AddMeeting from "./AddMeeting";

function TeacherMeetings() {
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [meetings, setMeetings] = useState([]);
  const [groups, setGroups] = useState([]);
  const UserString = localStorage.getItem("user");
  const user = UserString ? JSON.parse(UserString) : null;
  const [timeSlots, setTimeSlots] = useState([]);
  const [meetingsType, setMeetingsType] = useState("upcoming Meetings");

  //! fetching Allocated groups
  const fetchAllocatedGroups = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/AllocatedGroups?teacher_id=${user.tid}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setGroups(result);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //! fetchMeetings
  const fetchMeetings = async (date) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/MeetingOnDate?date=${date}&teacher_id=${user.tid}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setMeetings(data);
        console.log(data);
      } else {
        setMeetings([]);
        alert(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMeetingChange = (type) => {
    setMeetingsType(type);
  };

  //!Fetch All Meetings
  const fetchAllUpcomingMeetings = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/UpcomingMeetingsFromThatDate?teacher_id=${user.tid}&date=${selectedDate}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setMeetings(result);
        console.log(result);
      } else {
        setMeetings(null);
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //! fetch All upcoming meetings
  const logMeetingsFromThatDate = async () => {
    try {
      console.log(selectedDate);
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/LogMeetingsFromThatDate?teacher_id=${user.tid}&date=${selectedDate}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setMeetings(result);
        console.log(result);
      } else {
        setMeetings(null);
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllocatedGroups();
  }, []);

  useEffect(() => {
    fetchAllUpcomingMeetings();
  }, [selectedDate]);

  const handleSelectSlot = () => {
    setSelectedSlot(selectedDate);
    setShowMeetingModal(true);
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container">
      <h4 className="text-center">Teacher Meetings</h4>
      <div className="d-flex justify-content-between flex-col align-items-center space-y-3">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="form-control"
          aria-labelledby="Select Date"
          min={getTodayDate()}
        />
        <Button onClick={handleSelectSlot} size="sm">
          Add Meeting
        </Button>
      </div>
      <div>
        <div className="flex justify-center mt-2">
          <h6
            className={`cursor-pointer ${
              meetingsType === "upcoming Meetings"
                ? "bg-green-500 text-white font-bold text-sm"
                : "bg-white text-black hover:bg-green-400 hover:text-gray-500 text-sm"
            } px-8 py-2 transition-all border-b border-gray-400 rounded-sm`}
            onClick={() => {
              handleMeetingChange("");
              fetchAllUpcomingMeetings();
            }}
          >
            Upcomming Appointments
          </h6>
          <h6
            className={`cursor-pointer ${
              meetingsType === "Meetings Log"
                ? "bg-green-500 text-white font-bold text-sm"
                : "bg-white text-black hover:bg-green-400 hover:text-gray-500 text-sm"
            } px-8 py-2 border-b border-gray-400 transition-all rounded-sm`}
            onClick={() => {
              handleMeetingChange("Meetings Log");
              logMeetingsFromThatDate();
            }}
          >
            Logs
          </h6>
        </div>
        {meetingsType === "upcoming Meetings" ? (
          <>
            {meetings &&
              meetings?.map((meeting, index) => (
                <Card key={index} className="mb-3">
                  <Card.Header className="flex justify-between items-center">
                    <div className="text-[13px]">
                      {meeting?.group?.groupTitle}
                    </div>
                    <div className="text-[10px]">
                      {meeting?.Date
                        ? new Date(meeting?.Meeting?.Date).toLocaleDateString()
                        : "Weekly meeting"}
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
                  </Card.Body>
                </Card>
              ))}
          </>
        ) : (
          <>
            {meetings &&
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
      {showMeetingModal && (
        <AddMeeting
          show={showMeetingModal}
          onHide={() => setShowMeetingModal(false)}
          slot={selectedSlot}
          user={user}
          date={selectedDate}
          allTimeSlots={timeSlots}
        />
      )}
    </div>
  );
}

export default TeacherMeetings;
