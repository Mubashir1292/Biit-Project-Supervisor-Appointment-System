import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card } from "react-bootstrap";
import AddMeeting from "./AddMeeting";

function TeacherMeetings() {
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const [groups, setGroups] = useState([]);
  const UserString = localStorage.getItem("user");
  const user = UserString ? JSON.parse(UserString) : null;
  const [timeSlots, setTimeSlots] = useState([]);

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

  //! fetchMeetings
  const fetchMeetings = async (date) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/MeetingOnDate?date=${date.toISOString()}&teacher_id=${
          user.uid
        }`
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

  useEffect(() => {
    fetchAllocatedGroups();
  }, []);

  useEffect(() => {
    fetchMeetings(selectedDate);
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
        <h6 className="text-center">
          Meetings on {selectedDate.toDateString()}
        </h6>
        <div>
          {meetings &&
            meetings.map((meeting, index) => (
              <Card key={index} className="mb-3">
                <Card.Header className="d-flex justify-content-between">
                  <div>{meeting.title}</div>
                  <div>{new Date(meeting.Date).toLocaleDateString()}</div>
                </Card.Header>
                <Card.Body>
                  <Card.Title>{meeting.title}</Card.Title>
                  <Card.Text>{meeting.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Participants: {meeting.username}
                  </small>
                </Card.Footer>
              </Card>
            ))}
        </div>
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
