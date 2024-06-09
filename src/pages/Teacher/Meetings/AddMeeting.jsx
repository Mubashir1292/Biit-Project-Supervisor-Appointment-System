import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddMeeting({ show, onHide, slot, groups, user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [group, setGroup] = useState("");
  const [selectedGroups, setSelectedGroup] = useState([]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [allGroups, setAllGroups] = useState([]);
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/AddMeeting`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            group,
            isRecurring,
            date: isRecurring ? null : slot,
          }),
        }
      );
      const data = await response.json();
      alert(data.message);
      onHide();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllocatedGroups = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/AllocatedGroups?teacher_id=${user.uid}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setAllGroups(result);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllocatedGroups();
  }, []);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Meeting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Select aria-label="Default select example">
            {allGroups.map((group, index) => (
              <option
                key={index}
                value={group.value}
                onChange={(e) => {
                  setGroup(e.target.value);
                }}
              >
                {group.value}
              </option>
            ))}
          </Form.Select>
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
          <Form.Group controlId="formGroup">
            <Form.Label>Group</Form.Label>
            <Form.Control
              type="text"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formIsRecurring">
            <Form.Check
              type="checkbox"
              label="Recurring"
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
