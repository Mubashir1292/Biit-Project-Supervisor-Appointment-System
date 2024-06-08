import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddMeeting from "./AddMeeting";
import { ScheduleMeeting } from "react-schedule-meeting";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
function TeacherMeetings() {
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState();
  const [eventsList, setEventsList] = useState([
    {
      title: "Meeting",
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
    {
      title: "Meeting with Group ",
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      end: new Date(
        new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
          new Date().getHours() + 1
        )
      ),
    },
    {
      title: "Meeting with Group ",
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      end: new Date(
        new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
          new Date().getHours() + 1
        )
      ),
    },
    {
      title: "Meeting With Group",
      start: new Date(new Date().setDate(new Date().getDate() - 1)),
      end: new Date(
        new Date(new Date().setDate(new Date().getDate() - 1)).setHours(
          new Date().getHours() + 1
        )
      ),
    },
    {
      title: "Meeting with group",
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      end: new Date(
        new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
          new Date().getHours() + 1
        )
      ),
    },
  ]);
  const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
    return {
      id,
      startTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          9,
          0,
          0,
          0
        )
      ),
      endTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          17,
          0,
          0,
          0
        )
      ),
    };
  });

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setShowMeetingModal(!showMeetingModal);
    console.log(slotInfo);
  };
  const handleTimeslotClicked = (startTimeEventEmit) => {
    startTimeEventEmit.resetDate();
    startTimeEventEmit.resetSelectedTimeState();
    alert(
      `Time selected: ${format(
        startTimeEventEmit.startTime,
        "cccc, LLLL do h:mm a"
      )}`
    );
  };
  return (
    <div>
      <ScheduleMeeting
        borderRadius={10}
        primaryColor="#3f5b85"
        eventDurationInMinutes={30}
        availableTimeslots={availableTimeslots}
        onStartTimeSelect={handleTimeslotClicked}
        lang_cancelButtonText="Cancel"
        lang_confirmButtonText="Confirm"
        lang_emptyListText="No times available"
        lang_goToNextAvailableDayText="Next Available"
        lang_noFutureTimesText="No future times available"
        lang_selectedButtonText="Selected:"
        startTimeListStyle="scroll-list"
        // Date format props
        format_nextFutureStartTimeAvailableFormatString="cccc, LLLL do"
        format_selectedDateDayTitleFormatString="cccc, LLLL do"
        format_selectedDateMonthTitleFormatString="LLLL yyyy"
        format_startTimeFormatString="h:mm a"
        locale={enUS}
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

export default TeacherMeetings;
