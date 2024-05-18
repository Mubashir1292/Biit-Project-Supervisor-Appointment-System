import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function WeeklySchedule() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch schedule data from the backend
    fetch("YOUR_API_ENDPOINT_FOR_SCHEDULE")
      .then((response) => response.json())
      .then((data) => {
        // Map data to calendar events
        const calendarEvents = data.map((item) => ({
          id: item.Sch_id,
          title: "Available Slot",
          start: new Date(`2024-05-19T${item.slotId}:00:00`),
          end: new Date(`2024-05-19T${item.slotId + 1}:00:00`), // Assuming slots are 1 hour long
          resource: item,
        }));
        setEvents(calendarEvents);
      });
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week"]}
        step={30}
        showMultiDayTimes
        min={new Date(2024, 0, 1, 8, 30)} // Start time 08:30am
        max={new Date(2024, 0, 1, 18, 0)} // End time 06:00pm
      />
    </div>
  );
}

export default WeeklySchedule;
