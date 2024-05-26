import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Dropdown from "../../../components/dropdown/Dropdown";

function AddMeeting(props) {
  const [selection, setSelection] = useState(null);
  const [groups, setGroups] = useState([
    {
      label: 1,
      value: "AI Health Engine",
    },
    {
      label: 2,
      value: "BIIT Project Supervisor Appointment System",
    },
  ]);
  const handleSelect = (option) => {
    setSelection(option);
  };
  // Extracting day and time from the slot
  const start = props.slot.start;
  const end = props.slot.end;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  options.timeZone = "UTC";
  options.timeZoneName = "short";
  const day = start.toLocaleDateString("en-us", options);
  const Day = day.split(",")[0];
  console.log(Day);
  const date = start.toLocaleDateString(); // Format: MM/DD/YYYY
  const startTime = start.toLocaleTimeString(); // Format: HH:MM:SS
  const endTime = end.toLocaleTimeString(); // Format: HH:MM:SS

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Meeting Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <div className="flex justify-center items-center">
            <h5>Date: {date}</h5>
          </div>
          <div className="flex justify-center items-center">
            <h5>Day: {Day}</h5>
          </div>
          <FloatingLabel
            controlId="floatingInput"
            label="Meeting Title"
            className="mb-3"
          >
            <Form.Control type="input" placeholder="Meeting Title" />
          </FloatingLabel>

          <div className="flex justify-evenly items-center">
            <InputGroup className="mb-3">
              <Form.Control
                value={`Start Time: ${startTime}`}
                readOnly
                aria-label="Start Time"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                value={`End Time: ${endTime}`}
                readOnly
                aria-label="End Time"
              />
            </InputGroup>
          </div>
          <div className="flex justify-around items-center ">
            <label htmlFor="">Select Group:</label>
            <Dropdown
              options={groups}
              value={selection}
              OnSelect={handleSelect}
              className="relative w-4/6"
            />
          </div>
          <FloatingLabel controlId="floatingTextarea2" label="Message">
            <Form.Control
              as="textarea"
              placeholder="Meeting Message"
              className="mt-3"
            />
          </FloatingLabel>
          <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 mt-3">
            <Button variant="secondary">Cancel</Button>
            <Button variant="success">Add Meeting</Button>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default AddMeeting;
