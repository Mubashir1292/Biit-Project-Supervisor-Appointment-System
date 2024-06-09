import React, { useEffect, useState } from "react";
import { Badge, Button, Form } from "react-bootstrap";
import BiitSAS from "../../../assets/extra/biitSAS.png";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function WeeklySchedule() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [timeSlots, setTimeSlots] = useState([]);
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const fetchAllTimeSlots = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/FetchAllTimeSlots`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setTimeSlots(result);
        console.log(result);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSchedule = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/FetchingAllSchedule?teacher_id=${user.uid}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setWeeklySchedule(result);
        console.log(result);
        const initialSchedule = days.reduce((acc, day) => {
          acc[day] = result.map((slot) => ({
            time:
              timeSlots.find((time) => time.id === slot.id)?.start_time || "",
            status: slot[day],
          }));
          return acc;
        }, {});
        setSchedule(initialSchedule);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllTimeSlots();
    fetchSchedule();
  }, []);

  const handleSlotChange = (day, slotId, status) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: prevSchedule[day].map((slot) =>
        slot.time === timeSlots[slotId - 1].start_time
          ? { ...slot, status }
          : slot
      ),
    }));
  };

  const handleSaveSchedule = async () => {
    try {
      console.log(selectedSlots);
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/UpdatingWorkingHours?teacher_id=${user.uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedSlots),
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert("Schedule updated successfully!");
        setSelectedSlots([]);
      } else {
        alert("Error updating schedule: " + result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectSlot = (day, slot) => {
    const isSelected = selectedSlots.some(
      (selected) => selected.day === day && selected.slot === slot
    );
    if (isSelected) {
      setSelectedSlots(
        selectedSlots.filter(
          (selected) => !(selected.day === day && selected.slot === slot)
        )
      );
    } else {
      setSelectedSlots([...selectedSlots, { day, slot }]);
    }
  };

  // const handleBulkUpdate = (status) => {
  //   selectedSlots.forEach(({ day, slot }) => {
  //     handleSlotChange(day, slot, status);
  //   });
  //   setSelectedSlots([]);
  // };

  return (
    <>
      <div className="max-w-full p-2">
        <img src={BiitSAS} alt="BiitSAS" className="max-w-full" />
      </div>
      <div className="schedule-container p-2">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="font-semibold">Time</th>
                {days.map((day) => (
                  <th key={day} className="font-semibold">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot) => (
                <tr key={slot.id}>
                  <td className="text-[11px]">{slot.start_time}</td>
                  {days.map((day) => (
                    <td key={day}>
                      {schedule[day] &&
                      schedule[day][slot.id - 1]?.status === 1 ? (
                        <Badge bg="secondary" disabled className="text-[8px]">
                          Class
                        </Badge>
                      ) : schedule[day] &&
                        schedule[day][slot.id - 1]?.status === 2 ? (
                        <Badge
                          bg="success"
                          className="text-[8px]"
                          onClick={() => handleSlotChange(day, slot.id, 0)}
                        >
                          Meeting
                        </Badge>
                      ) : (
                        <Form.Check
                          type="checkbox"
                          checked={selectedSlots.some(
                            (selected) =>
                              selected.day === day && selected.slot === slot.id
                          )}
                          className="text-[20px] flex self-center mx-auto"
                          onChange={() => handleSelectSlot(day, slot.id)}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mt-3">
          <Button variant="primary" onClick={handleSaveSchedule}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
}

export default WeeklySchedule;
