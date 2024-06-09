import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";
import AddMeeting from "./AddMeeting";
function TeacherMeetings() {
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const [groups, setGroups] = useState([]);
  const UserString = localStorage.getItem("user");
  const user = UserString ? JSON.parse(UserString) : null;

  //! fetching Allocated groups
  const fetchAllocatedGroups = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/AllocatedGroups?teacher_id=${user.uid}`
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
  const fetchMeetings = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/MeetingOnDate?date=${selectedDate.toISOString()}&teacher_id=${
          user.uid
        }`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setMeetings(data);
      } else {
        alert(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllocatedGroups();
  }, []);
  //! fetchMeetings
  useEffect(() => {
    fetchMeetings();
  }, [selectedDate]);

  const handleSelectSlot = () => {
    setSelectedSlot(selectedDate);
    setShowMeetingModal(true);
  };

  return (
    <div className="container">
      <h2>Teacher Meetings</h2>
      <div className="d-flex justify-content-between flex-col align-items-center space-y-3">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="form-control"
        />
        <Button onClick={handleSelectSlot} size="sm">
          Add Meeting
        </Button>
      </div>
      <div>
        <h3>Meetings on {selectedDate.toDateString()}</h3>
        <ul>
          {meetings &&
            meetings.map((meeting) => (
              <li key={meeting.mid}>
                <h4>{meeting.title}</h4>
                <p>{meeting.description}</p>
                <p>{meeting.isRecurring ? "Recurring" : "One-time"}</p>
                <p>Participants: {meeting.participant_Id}</p>
              </li>
            ))}
        </ul>
      </div>
      {showMeetingModal && (
        <AddMeeting
          show={showMeetingModal}
          onHide={() => setShowMeetingModal(false)}
          slot={selectedSlot}
          user={user}
        />
      )}
    </div>
  );
}

export default TeacherMeetings;
