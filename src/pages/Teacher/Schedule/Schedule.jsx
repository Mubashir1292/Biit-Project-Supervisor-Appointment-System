import React, { useEffect, useState } from "react";
import { Badge, Button, Form, Modal } from "react-bootstrap";
import BiitSAS from "../../../assets/extra/biitSAS.png";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function WeeklySchedule() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [timeSlots, setTimeSlots] = useState([]);
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [participants, setParticipants] = useState([]);
  const [groups, setGroups] = useState([]);

  const fetchAllTimeSlots = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/FetchAllTimeSlots`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setTimeSlots(result);
        console.log(result);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSchedule = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/FetchingAllSchedule?teacher_id=${user.uid}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setWeeklySchedule(result);
        console.log(result);
        const initialSchedule = days.reduce((acc, day) => {
          acc[day] = result.map((slot) => ({
            time:
              timeSlots.find((time) => time.id === slot.id)?.start_time || "",
            status: slot[day],
          }));
          return acc;
        }, {});
        setSchedule(initialSchedule);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/AllocatedGroups?teacher_id=${user.uid}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setParticipants(result);
        console.log(result);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllTimeSlots();
    fetchSchedule();
  }, []);

  const handleSlotChange = (day, slotId, status) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: prevSchedule[day].map((slot) =>
        slot.time === timeSlots[slotId - 1].start_time
          ? { ...slot, status }
          : slot
      ),
    }));
  };

  const handleSaveSchedule = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/UpdateSchedule?teacher_id=${user.uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(weeklySchedule),
        }
      );
      const result = await response.json();
      if (result.success) {
        alert("Schedule updated successfully!");
      } else {
        alert("Error updating schedule");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectSlot = (day, slot) => {
    const isSelected = selectedSlots.some(
      (selected) => selected.day === day && selected.slot === slot
    );
    if (isSelected) {
      setSelectedSlots(
        selectedSlots.filter(
          (selected) => !(selected.day === day && selected.slot === slot)
        )
      );
    } else {
      setSelectedSlots([...selectedSlots, { day, slot }]);
    }
  };

  const handleBulkUpdate = (status) => {
    selectedSlots.forEach(({ day, slot }) => {
      handleSlotChange(day, slot, status);
    });
    setSelectedSlots([]);
  };

  const handleSetMeeting = (slots) => {
    if (slots.length > 0) {
      console.log(slots);
      fetchGroups();
      setShowModal(true);
    } else {
      alert("Select Atleast one Slot");
    }
  };

  //! post the meeting with a group
  const PostingANewMeeting = async () => {
    try {
      const response = await fetch(``);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveMeeting = (groups) => {
    setShowModal(false);
    if (groups.length > 0) {
    } else {
      alert("please select a group");
    }
    // Add logic to save the meeting
  };

  return (
    <>
      <div className="max-w-full p-2">
        <img src={BiitSAS} alt="BiitSAS" className="max-w-full" />
      </div>
      <div className="schedule-container p-2">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="font-semibold">Time</th>
                {days.map((day) => (
                  <th key={day} className="font-semibold">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot) => (
                <tr key={slot.id}>
                  <td className="text-[11px]">{slot.start_time}</td>
                  {days.map((day) => (
                    <td key={day}>
                      {schedule[day] &&
                      schedule[day][slot.id - 1]?.status === 1 ? (
                        <Badge bg="secondary" disabled className="text-[8px]">
                          Class
                        </Badge>
                      ) : schedule[day] &&
                        schedule[day][slot.id - 1]?.status === 2 ? (
                        <Badge
                          bg="success"
                          className="text-[8px]"
                          onClick={() => handleSlotChange(day, slot.id, 0)}
                        >
                          Meeting
                        </Badge>
                      ) : (
                        <Form.Check
                          type="checkbox"
                          checked={selectedSlots.some(
                            (selected) =>
                              selected.day === day && selected.slot === slot.id
                          )}
                          className="text-[12px]"
                          onChange={() => handleSelectSlot(day, slot.id)}
                          label="Free"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <Button variant="primary" onClick={() => handleBulkUpdate(0)}>
            Selected to Free
          </Button>
          <Button variant="secondary" onClick={() => handleBulkUpdate(1)}>
            Selected to Class
          </Button>
          <Button
            variant="success"
            onClick={() => {
              handleSetMeeting(selectedSlots);
            }}
            className="mt-2"
          >
            Selected to Meeting
          </Button>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Set Meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="meetingTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter meeting title"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="meetingDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter meeting description"
                value={meetingDescription}
                onChange={(e) => setMeetingDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="participants" className="mt-3">
              <Form.Label>Participants</Form.Label>
              <Form.Control
                as="select"
                multiple
                value={groups.map((group) => group.value)}
                onChange={(e) =>
                  setGroups(
                    [...e.target.selectedOptions].map((option) => ({
                      label: option.text,
                      value: option.value,
                    }))
                  )
                }
              >
                {participants.map((group) => (
                  <option key={group?.label} value={group?.value}>
                    {group?.value}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveMeeting}>
            Save Meeting
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WeeklySchedule;
