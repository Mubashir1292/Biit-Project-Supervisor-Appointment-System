import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card } from "react-bootstrap";
import AddMeeting from "./AddMeeting";
import { format } from "date-fns";
function TeacherMeetings() {
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const [groups, setGroups] = useState([]);
  const UserString = localStorage.getItem("user");
  const user = UserString ? JSON.parse(UserString) : null;
  const [timeSlots, setTimeSlots] = useState([]);
  const [meetingsType, setMeetingsType] = useState("upcomming Meetings");
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

  const handleMeetingChange = (type) => {
    setMeetingsType(type);
  };

  //!Fetch All Meetings
  const fetchAllUpcommingMeetings = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/UpcomingMeetingsFromThatDate?teacher_id=${
          user.uid
        }&date=${selectedDate.toISOString()}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setMeetings(result);
        console.log(result);
      } else {
        setMeetings(null);
        console.log(result);
        //alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //! fetch All upcoming meetings
  const LogMeetingsFromThatDate = async () => {
    try {
      console.log(selectedDate);
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/LogMeetingsFromThatDate?teacher_id=${
          user.uid
        }&date=${selectedDate.toISOString()}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setMeetings(result);
        console.log(result);
      } else {
        setMeetings(null);
        console.log(result);
        //alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllocatedGroups();
  }, []);

  useEffect(() => {
    fetchAllUpcommingMeetings();
  }, [selectedDate]);

  const handleSelectSlot = () => {
    setSelectedSlot(selectedDate);
    setShowMeetingModal(true);
  };

  return (
    <div className="container">
      <h4 className="text-center">Teacher Meetings</h4>
      <div className="d-flex justify-content-between flex-col align-items-center space-y-3">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="form-control"
          ariaLabelledBy="Select Date"
        />
        <Button onClick={handleSelectSlot} size="sm">
          Add Meeting
        </Button>
      </div>
      <div>
        {/* <h6 className="text-center">
          Meetings on {selectedDate.toDateString()}
        </h6> */}
        <div>
          <div className="flex justify-center mt-2">
            <h6
              className={`cursor-pointer ${
                meetingsType === "upcoming Meetings"
                  ? "bg-green-500 text-white font-bold text-sm"
                  : "bg-white text-black hover:bg-green-400 hover:text-gray-500 text-sm"
              } px-8 py-2 transition-all border-b border-gray-400 rounded-sm`}
              onClick={() => {
                handleMeetingChange("upcoming Meetings");
                fetchAllUpcommingMeetings();
              }}
            >
              Upcoming Meetings
            </h6>
            <h6
              className={`cursor-pointer ${
                meetingsType === "Meetings Log"
                  ? "bg-green-500 text-white font-bold text-sm"
                  : "bg-white text-black hover:bg-green-400 hover:text-gray-500 text-sm"
              } px-8 py-2 border-b border-gray-400 transition-all rounded-sm`}
              onClick={() => {
                handleMeetingChange("Meetings Log");
                LogMeetingsFromThatDate();
              }}
            >
              Logs
            </h6>
          </div>
          {meetingsType === "upcoming Meetings" ? (
            <>
              {meetings &&
                meetings.map((meeting, index) => (
                  <Card key={index} className="mb-3">
                    <Card.Header className="d-flex justify-content-between">
                      <div>{meeting.Meeting.title}</div>
                      <div>
                        {meeting.Meeting.Date
                          ? new Date(meeting.Meeting.Date).toLocaleDateString()
                          : "Weekly meeting"}
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{meeting.Meeting.title}</Card.Title>
                      <Card.Text>{meeting.Meeting.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Participants: {meeting.progress.username}
                      </small>
                    </Card.Footer>
                  </Card>
                ))}
            </>
          ) : (
            <>
              {meetings &&
                meetings?.map((meeting, index) => (
                  <Card key={index} className="mb-3">
                    <Card.Header className="d-flex justify-content-between">
                      <div>{meeting?.Meeting?.title}</div>
                      <div>
                        {meeting?.Meeting?.Date
                          ? new Date(
                              meeting?.Meeting?.Date
                            ).toLocaleDateString()
                          : "Weekly meeting"}
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{meeting?.Meeting?.title}</Card.Title>
                      <Card.Text>{meeting?.Meeting?.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Participants: {meeting?.progress?.username}
                      </small>
                    </Card.Footer>
                  </Card>
                ))}
            </>
          )}
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
