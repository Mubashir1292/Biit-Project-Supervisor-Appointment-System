import React, { useEffect, useState } from "react";
import { Badge, Button, Form } from "react-bootstrap";
import BiitSAS from "../../../assets/extra/biitSAS.png";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function WeeklySchedule() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [timeSlots, setTimeSlots] = useState([]);
  const [weeklySchedule, setWeeklySchedule] = useState({});
  const [selectedSlots, setSelectedSlots] = useState([]);

  const fetchAllTimeSlots = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/FetchAllTimeSlots`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setTimeSlots(result);
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
        const schedule = days.reduce((acc, day) => {
          acc[day] = result.filter((slot) => slot.Day === day);
          return acc;
        }, {});
        setWeeklySchedule(schedule);
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

  const handleSelectSlot = (day, slotId) => {
    const isSelected = selectedSlots.some(
      (selected) => selected.day === day && selected.slot === slotId
    );

    if (isSelected) {
      setSelectedSlots((prevSelected) =>
        prevSelected.filter(
          (selected) => !(selected.day === day && selected.slot === slotId)
        )
      );
    } else {
      setSelectedSlots((prevSelected) => [
        ...prevSelected,
        { day, slot: slotId },
      ]);
    }
  };

  const handleSaveSchedule = async () => {
    try {
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
        fetchSchedule();
        alert(result);
      } else {
        alert("Error updating schedule: " + result);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                      {weeklySchedule[day] &&
                      weeklySchedule[day].find((s) => s.id === slot.id)
                        ?.status === 1 ? (
                        <Badge bg="secondary" disabled className="text-[8px]">
                          Class
                        </Badge>
                      ) : weeklySchedule[day] &&
                        weeklySchedule[day].find((s) => s.id === slot.id)
                          ?.status === 2 ? (
                        <Badge
                          bg="success"
                          className="text-[8px]"
                          onClick={() => handleSelectSlot(day, slot.id)}
                        >
                          Meeting
                        </Badge>
                      ) : weeklySchedule[day] &&
                        weeklySchedule[day].find((s) => s.id === slot.id)
                          ?.status === 3 ? (
                        <Badge
                          bg="info"
                          className="text-[8px]"
                          onClick={() => handleSelectSlot(day, slot.id)}
                        >
                          Working hour
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
