import React, { useState } from "react";

// Sample schedule data
const scheduleData = [
  {
    day: "Monday",
    events: ["Event 1", "Event 2"],
    freeSlots: ["08:30-09:30", "09:30-10:30"],
  },
  {
    day: "Tuesday",
    events: ["Event 3"],
    freeSlots: ["08:30-09:30", "09:30-10:30"],
  },
  {
    day: "Wednesday",
    events: ["Event 4"],
    freeSlots: ["08:30-09:30", "09:30-10:30"],
  },
  {
    day: "Thursday",
    events: ["Event 5"],
    freeSlots: ["08:30-09:30", "09:30-10:30"],
  },
  {
    day: "Friday",
    events: ["Event 6"],
    freeSlots: ["08:30-09:30", "09:30-10:30"],
  },
];

function WeeklyScheduleUpdater() {
  const [schedule, setSchedule] = useState(scheduleData);

  const handleAddEvent = (day) => {
    const newEvent = prompt("Enter new event:");
    if (newEvent) {
      setSchedule((prevSchedule) =>
        prevSchedule.map((item) =>
          item.day === day
            ? { ...item, events: [...item.events, newEvent] }
            : item
        )
      );
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Weekly Schedule Updater</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Day</th>
            <th className="px-4 py-2">Events</th>
            <th className="px-4 py-2">Free Slots</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map(({ day, events, freeSlots }) => (
            <tr key={day}>
              <td className="border px-4 py-2">{day}</td>
              <td className="border px-4 py-2">{events.join(", ")}</td>
              <td className="border px-4 py-2">{freeSlots.join(", ")}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleAddEvent(day)}
                >
                  Add Event
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeeklyScheduleUpdater;
