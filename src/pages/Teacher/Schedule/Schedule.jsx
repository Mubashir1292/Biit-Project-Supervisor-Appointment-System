import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const times = [
  "08:30 AM",
  "09:30 AM",
  "10:30 AM",
  "11:30 AM",
  "12:30 PM",
  "01:30 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const defaultEvents = [
  {
    day: "Mon",
    time: "08:30 AM",
    title: "Class",
    description: "Algebra and Geometry",
  },
  {
    day: "Tue",
    time: "10:30 AM",
    title: "Class",
    description: "Physics and Chemistry",
  },
  {
    day: "Wed",
    time: "01:30 PM",
    title: "Class",
    description: "World History",
  },
  {
    day: "Thu",
    time: "03:00 PM",
    title: "Class",
    description: "Literature and Grammar",
  },
  {
    day: "Fri",
    time: "05:00 PM",
    title: "Class",
    description: "Drawing and Painting",
  },
  {
    day: "Fri",
    time: "03:00 PM",
    title: "Meeting With Group..",
    description: "Drawing and Painting",
  },
  {
    day: "Fri",
    time: "02:00 PM",
    title: "Meeting With Group..",
    description: "Drawing and Painting",
  },
];

const participants = [
  { regNo: "2020-Arid-3675", name: "Mubashir Liaqat" },
  { regNo: "2020-Arid-4224", name: "Touseef Sajjad" },
  { regNo: "2020-Arid-3677", name: "Usama Ijaz" },
];

function WeeklySchedule() {
  const [schedule, setSchedule] = useState(
    days.reduce((acc, day) => {
      acc[day] = times.map((time) => {
        const event = defaultEvents.find(
          (event) => event.day === day && event.time === time
        );
        return { time, event: event || null };
      });
      return acc;
    }, {})
  );

  const [showModal, setShowModal] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(null);
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
    participant: "",
  });

  const handleSlotClick = (day, time, event) => {
    setCurrentSlot({ day, time, event });
    setModalData({
      title: event?.title || "",
      description: event?.description || "",
      participant: event?.participant || "",
    });
    setShowModal(true);
  };

  const handleSave = () => {
    const updatedSchedule = { ...schedule };
    const slot = updatedSchedule[currentSlot.day].find(
      (slot) => slot.time === currentSlot.time
    );
    slot.event = {
      title: modalData.title,
      description: modalData.description,
      participant: modalData.participant,
    };
    setSchedule(updatedSchedule);
    setShowModal(false);
  };

  return (
    <div className="container mx-auto my-4">
      <div className="grid grid-cols-6 gap-4">
        <div></div>
        {days.map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
      </div>
      {times.map((time) => (
        <div key={time} className="grid grid-cols-6 gap-4">
          <div className="text-right font-semibold text-xs">{time}</div>
          {days.map((day) => (
            <div
              key={day}
              className={`border border-gray-300 my-1 cursor-pointer text-left text-[8px] ${
                schedule[day].find((slot) => slot.time === time).event
                  ? "bg-blue-100"
                  : "bg-white"
              }`}
              onClick={() =>
                handleSlotClick(
                  day,
                  time,
                  schedule[day].find((slot) => slot.time === time).event
                )
              }
            >
              {schedule[day].find((slot) => slot.time === time).event?.title ||
                ""}
            </div>
          ))}
        </div>
      ))}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentSlot?.event ? "Event Details" : "Add Event"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Date & Time</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={`${currentSlot?.day} ${currentSlot?.time}`}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={modalData.title}
                onChange={(e) =>
                  setModalData({ ...modalData, title: e.target.value })
                }
                readOnly={currentSlot?.event}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={modalData.description}
                onChange={(e) =>
                  setModalData({ ...modalData, description: e.target.value })
                }
                readOnly={currentSlot?.event}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Participant</Form.Label>
              <Form.Control
                as="select"
                value={modalData.participant}
                onChange={(e) =>
                  setModalData({ ...modalData, participant: e.target.value })
                }
                disabled={currentSlot?.event}
              >
                <option value="">Select a participant</option>
                {participants.map((participant) => (
                  <option key={participant.regNo} value={participant.regNo}>
                    {participant.regNo} - {participant.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        {!currentSlot?.event && (
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
}

export default WeeklySchedule;
