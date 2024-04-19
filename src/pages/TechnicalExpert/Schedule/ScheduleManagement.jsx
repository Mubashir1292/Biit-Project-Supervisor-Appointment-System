import React, { useState } from "react";
import Dropdown from "../../../components/dropdown/Dropdown";

// Sample schedule data for 5 days (Monday to Friday)
const initialSchedule = [
  { day: "Monday", events: [], slots: generateSlots() },
  { day: "Tuesday", events: [], slots: generateSlots() },
  { day: "Wednesday", events: [], slots: generateSlots() },
  { day: "Thursday", events: [], slots: generateSlots() },
  { day: "Friday", events: [], slots: generateSlots() },
];

// Function to generate time slots from 08:30 to 17:30 (last slot: 17:00-18:00)
function generateSlots() {
  const slots = [];
  let time = { hour: 8, minute: 30 };
  while (time.hour < 13) {
    const startTime = `${time.hour.toString().padStart(2, "0")}:${time.minute
      .toString()
      .padStart(2, "0")}`;
    time.minute += 30;
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
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  // Function to handle adding an event
  const handleAddEvent = () => {
    if (selectedDay && selectedSlot && eventName) {
      setSchedule((prevSchedule) => {
        return prevSchedule.map((day) => {
          if (day.day === selectedDay) {
            const updatedEvents = [
              ...day.events,
              { time: selectedSlot, name: eventName },
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
    } else {
      alert("Please select a day, time slot, and enter event name.");
    }
  };

  // Function to handle selecting a time slot
  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot.start);
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
      <h1 className="text-2xl font-bold mb-4">Weekly Schedule Updater</h1>
      <div className="flex flex-row space-x-4">
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
        <div className="mt-4 w-10/12">
          <h2 className="text-lg font-semibold">
            Available Slots for {selectedDay}:
          </h2>
          <Dropdown
            options={generateDropdownOptions()}
            value={selectedSlot}
            OnSelect={handleSelectSlot}
            placeholder="Select Time Slot"
            className="mt-2 w-2/12"
          />
        </div>
      )}
      {/* Event input */}
      {selectedSlot && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-1/2 p-2 rounded-md border"
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
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Scheduled Events:</h2>
        {schedule.map((day, index) => (
          <div key={index}>
            <h3 className="mt-2 font-semibold">{day.day}</h3>
            {day.events.length > 0 ? (
              <ul>
                {day.events.map((event, idx) => (
                  <li key={idx}>
                    {event.time} - {event.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No events scheduled.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyScheduleUpdater;
