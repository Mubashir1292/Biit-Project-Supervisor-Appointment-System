import React, { useEffect, useState } from "react";
import Calendar from "../../../components/Calender/Calender";
import biitLogo from "../../../assets/extra/biitSAS.png";

function Meetings() {
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleString());
  useEffect(() => {
    const currentDate = new Date().toLocaleString();
    const todaysDate = JSON.stringify(currentDate).split(",")[0];
    const completeDate = todaysDate.split('"')[1];
    setSelectedDate(completeDate);
  }, []);
  const handleDateChange = (date) => {
    const currentDate = date.toLocaleString();
    const todaysDate = JSON.stringify(currentDate).split(",")[0];
    const completeDate = todaysDate.split('"')[1];
    setSelectedDate(completeDate);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-0 ">
      <div className="flex justify-center">
        <img src={biitLogo} alt="Biit Logo" className="w-10/12" />
      </div>
      <h1 className="text-2xl">Meeting Management</h1>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <div className="flex flex-row">
        <h1 className="text-2xl">Date: {selectedDate || null}</h1>
      </div>
    </div>
  );
}

export default Meetings;
