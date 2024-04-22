import React, { useState } from "react";
import Dropdown from "../../../components/dropdown/Dropdown";
import biitlogo from "../../../assets/extra/biitSAS.png";

// Sample schedule data for 5 days (Monday to Friday)
const initialSchedule = [
  {
    day: "Monday",
    events: [
      { time: "08:30", name: "ERD Info", groupName: "BIIT Career Counsling" },
    ],
    slots: generateSlots(),
  },
  { day: "Tuesday", events: [], slots: generateSlots() },
  { day: "Wednesday", events: [], slots: generateSlots() },
  { day: "Thursday", events: [], slots: generateSlots() },
  { day: "Friday", events: [], slots: generateSlots() },
];

// Function to generate time slots from 08:30 to 17:30 (last slot: 17:00-18:00)
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
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  // Function to handle adding an event
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
      // Clear selected values
      setSelectedDay("");
      setSelectedSlot("");
      setEventName("");
      setGroupName("");
    } else {
      alert("Please select enter event name, and enter group ID.");
    }
  };

  // Function to handle selecting a time slot
  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot.label); // Store only the start time string
    console.log(slot.label);
  };

  // Function to generate dropdown options
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
        {/* Day selection */}
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
      {/* Slot selection */}
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
      {/* Event input */}
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
      {/* Event list */}
      <h2 className="text-2xl font-semibold text-center my-4">
        Scheduled Events
      </h2>
      {/* <div className="mt-4">
        <div className="mt-4 flex flex-col justify-around items-center">
          <div className="w-full flex  items-center">
            <div className="w-1/5 font-semibold">Day</div>
            <div className="w-1/5 font-semibold">Time</div>
            <div className="w-1/5 font-semibold">Name</div>
            <div className="w-1/5 font-semibold">Group ID</div>
            <div className="w-1/5 font-semibold">Action</div>
          </div>
          {schedule.map((day, index) =>
            day.events.map((event, idx) => (
              <div
                key={`${index}-${idx}`}
                className="w-full flex justify-around items-center"
              >
                <div>{day.day}</div>
                <div>{event.time}</div>
                <div>{event.name}</div>
                <div>{event.groupId}</div>
                <div>
                  <button className="px-2 py-1 bg-green-500 text-white rounded-md">
                    Edit
                  </button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded-md ml-2">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div> */}
      <table className="mt-2 border w-full">
        <thead>
          <tr className="flex justify-between items-center ">
            <th>Day</th>
            <th>Time</th>
            <th>Title</th>
            <th>Group Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((day, index) =>
            day.events.map((event, idx) => (
              <tr
                key={`${index}-${idx}`}
                className="flex justify-between items-center "
              >
                <td className="text-right">{day.day}</td>
                <td className="text-right">{event.time}</td>
                <td className="text-right">{event.name}</td>
                <td className="text-right">{event.groupName}</td>
                <td>
                  <button className="px-1 py-1 bg-green-500 text-white rounded-md">
                    Edit
                  </button>
                  <button className="px-1 py-1 bg-red-500 text-white rounded-md ml-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WeeklyScheduleUpdater;
