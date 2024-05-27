import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import AddMeeting from "./AddMeeting";
const localizer = momentLocalizer(moment);

function Meetings() {
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState();
  const [eventsList, setEventsList] = useState([
    {
      title: "Meeting with Ali Safeer",
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
    {
      title: "Meeting With Mubashir",
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      end: new Date(
        new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
          new Date().getHours() + 1
        )
      ),
    },
    {
      title: "Meeting With Nouman",
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      end: new Date(
        new Date(new Date().setDate(new Date().getDate() + 2)).setHours(
          new Date().getHours() + 1
        )
      ),
    },
  ]);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setShowMeetingModal(!showMeetingModal);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
      />
      {showMeetingModal ? (
        <>
          <AddMeeting
            show={showMeetingModal}
            onHide={() => setShowMeetingModal(false)}
            slot={selectedSlot}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Meetings;
