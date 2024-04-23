import React, { useState } from "react";
import Dropdown from "../../../components/dropdown/Dropdown";
import biitlogo from "../../../assets/extra/biitSAS.png";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import { RiDeleteBin6Line, RiEditLine, RiTimeLine } from "react-icons/ri";

const initialSchedule = [
  {
    day: "Monday",
    events: [
      { time: "08:15", name: "ERD Info", groupName: "BIIT Career Counsling" },
      {
        time: "08:30",
        name: "Conceptual Diagram",
        groupName: "BIIT Career Counsling",
      },
      { time: "08:45", name: "Mockups", groupName: "BIIT Career Counsling" },
      {
        time: "09:00",
        name: "Real Screens",
        groupName: "BIIT Career Counsling",
      },
      {
        time: "09:00",
        name: "Real Screens",
        groupName: "BIIT Career Counsling",
      },
    ],
    slots: generateSlots(),
  },
  {
    day: "Tuesday",
    events: [
      { time: "08:45", name: "Mockups", groupName: "BIIT Career Counsling" },
      {
        time: "09:00",
        name: "Real Screens",
        groupName: "BIIT Career Counsling",
      },
      { time: "08:45", name: "Mockups", groupName: "BIIT Career Counsling" },
      {
        time: "09:00",
        name: "Real Screens",
        groupName: "BIIT Career Counsling",
      },
      {
        time: "09:00",
        name: "Real Screens",
        groupName: "BIIT Career Counsling",
      },
    ],
    slots: generateSlots(),
  },
  { day: "Wednesday", events: [], slots: generateSlots() },
  { day: "Thursday", events: [], slots: generateSlots() },
  { day: "Friday", events: [], slots: generateSlots() },
];

function generateSlots() {
  const slots = [];
  let time = { hour: 8, minute: 15 };
  while (time.hour < 13) {
    const startTime = `${time.hour.toString().padStart(2, "0")}:${time.minute
      .toString()
      .padStart(2, "0")}`;
    time.minute += 15;
    if (time.minute === 60) {
      time.minute = 0;
      time.hour++;
    }
    const endTime = `${time.hour.toString().padStart(2, "0")}:${time.minute
      .toString()
      .padStart(2, "0")}`;
    slots.push({ start: startTime, end: endTime, available: true });
  }
  return slots;
}

function WeeklyScheduleUpdater() {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [eventName, setEventName] = useState("");
  const [groupName, setGroupName] = useState("");

  const handleAddEvent = () => {
    if (selectedDay && selectedSlot && eventName && groupName) {
      setSchedule((prevSchedule) => {
        return prevSchedule.map((day) => {
          if (day.day === selectedDay) {
            const updatedEvents = [
              ...day.events,
              { time: selectedSlot, name: eventName, groupName: groupName },
            ];
            const updatedSlots = day.slots.map((slot) => {
              if (slot.start === selectedSlot) {
                return { ...slot, available: false };
              }
              return slot;
            });
            return { ...day, events: updatedEvents, slots: updatedSlots };
          }
          return day;
        });
      });
      setSelectedDay("");
      setSelectedSlot("");
      setEventName("");
      setGroupName("");
    } else {
      alert("Please select enter event name, and enter group ID.");
    }
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot.label);
  };

  const generateDropdownOptions = () => {
    const day = schedule.find((day) => day.day === selectedDay);
    const availableSlots = day.slots.filter((slot) => slot.available);
    return availableSlots.map((slot) => ({
      label: `${slot.start} - ${slot.end}`,
      value: slot.start,
    }));
  };

  return (
    <div className="container mx-auto">
      <div className="w-full flex justify-center items-center">
        <img src={biitlogo} alt="biit Logo" className="w-2/6" />
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center">Weekly Schedule</h1>
      <div className="flex flex-row space-x-4 justify-center">
        {schedule.map((day, index) => (
          <div key={index}>
            <button
              className={`p-2 rounded-md border ${
                selectedDay === day.day
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedDay(day.day)}
            >
              {day.day}
            </button>
          </div>
        ))}
      </div>
      {selectedDay && (
        <div className="flex justify-center items-center space-x-3">
          <h2 className="text-lg font-semibold mt-2">
            Available Slots for {selectedDay}:
          </h2>
          <Dropdown
            options={generateDropdownOptions()}
            value={selectedSlot}
            OnSelect={handleSelectSlot}
            className="mt-2 w-3/12"
          />
        </div>
      )}
      {selectedSlot && (
        <div className="mt-4 flex  flex-col space-y-3 justify-center items-center">
          <input
            type="text"
            placeholder="Enter event title"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-1/2 p-2 rounded-md border"
          />
          <input
            type="number"
            placeholder="Enter group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-1/2 p-2 rounded-md border "
          />
          <button
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleAddEvent}
          >
            Add Event
          </button>
        </div>
      )}
      <h2 className="text-2xl font-semibold text-center my-4">
        Scheduled Events
      </h2>
      {schedule.map((day, index) => (
        <div key={index}>
          <h3 className="text-xl font-semibold mb-2">{day.day}</h3>
          <div className="flex flex-wrap justify-around">
            {day.events.map((event, idx) => (
              <Card
                key={`${index}-${idx}`}
                className="w-[12rem] bg-white py-4 px-4 rounded border border-gray-300 shadow-lg mb-2 mr-2"
              >
                <CardBody>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 flex items-center">
                      <RiTimeLine className="mr-1" />
                      {event.time}
                    </span>
                    <div className="flex">
                      <RiEditLine className="h-5 w-5 mr-2 text-green-500 cursor-pointer" />
                      <RiDeleteBin6Line className="h-5 w-5 text-red-500 cursor-pointer" />
                    </div>
                  </div>
                  <CardTitle tag="h5" className="font-bold text-center mb-2">
                    {event.name}
                  </CardTitle>
                  <CardText className="font-bold">
                    Group:
                    <span className="text-sm font-normal">
                      {event.groupName}
                    </span>
                  </CardText>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeeklyScheduleUpdater;
