import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Dropdown from "../../../components/dropdown/Dropdown";
function AddMeeting({ show, onHide, user, date }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [group, setGroup] = useState({});
  const [isRecurring, setIsRecurring] = useState(false);
  const [allGroups, setAllGroups] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState({});
  const handleSubmit = async () => {
    try {
      if (selectedSlot && date.toISOString() && group && title && description) {
        const response = await fetch(
          `http://localhost/OfficialPSAS/api/psas_Supervisor_Expert/AddMeeting?Sch_id=${
            selectedSlot.label
          }&date=${date.toISOString()}&participant_Id=${
            group.label
          }&title=${title}&description=${description}&isRecurring=${
            isRecurring ? 1 : 0
          }`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (!Array.isArray(data)) {
          alert(data);
          onHide();
        }
      } else {
        alert("Fields must not be empty");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGroupSelect = (item) => {
    setGroup(item);
    console.log(item);
  };

  const handleSelectTimeSlot = (option) => {
    setSelectedSlot(option);
    console.log(option);
  };

  const fetchAllocatedGroups = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/AllocatedGroups?teacher_id=${user.uid}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setAllGroups(result);
        console.log(result);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGetTimeSlots = async (date) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/FetchTimeSlots?date=${date.toISOString()}&teacher_id=${
          user.uid
        }`
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

  useEffect(() => {
    fetchAllocatedGroups();
    fetchGetTimeSlots(date);
  }, [date, user.uid]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Meeting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Select Time Slot</Form.Label>
          <Dropdown
            options={timeSlots.map((slot) => ({
              label: slot.Sch_id,
              value: `${slot.start_time}-${slot.end_time}`,
            }))}
            OnSelect={handleSelectTimeSlot}
            className="relative w-full"
            value={selectedSlot}
          />
          <Form.Label>Group</Form.Label>
          <Dropdown
            options={allGroups}
            OnSelect={handleGroupSelect}
            className="relative w-full"
            value={group}
          />
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formIsRecurring">
            <Form.Check
              type="checkbox"
              label="Weekly Meeting"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddMeeting;
