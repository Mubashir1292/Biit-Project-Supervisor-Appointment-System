import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CustomCalendar = ({ onChange, value }) => {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const tileContent = ({ date }) => (
    <span className="dot" style={{ backgroundColor: getRandomColor() }}></span>
  );

  return (
    <div className="container py-2 flex justify-center">
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={tileContent}
        className="border rounded-lg"
      />
    </div>
  );
};

export default CustomCalendar;
