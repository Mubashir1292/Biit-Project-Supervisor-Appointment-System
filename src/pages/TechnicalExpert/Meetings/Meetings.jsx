import React, { useEffect, useState } from "react";
import Calendar from "../../../components/Calender/Calender";
import biitLogo from "../../../assets/extra/biitSAS.png";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { FaPlusSquare } from "react-icons/fa";
import MeetingDetailCard from "../../../components/MeetingDetailsCard/MeetingDetailCard";

function Meetings() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const AllMeetings = [
    {
      title: "ERD Issue",
      desc: "A0A Sir, I have to discuss the issue of my project ERD...",
      startTime: "09:30",
      EndTime: "10:30",
      date: "4/16/2024",
    },
    {
      title: "ERD Issue",
      desc: "A0A Sir, I have to discuss the issue of my project ERD...",
      startTime: "09:30",
      EndTime: "10:30",
      date: "4/16/2024",
    },
    {
      title: "ERD Issue",
      desc: "A0A Sir, I have to discuss the issue of my project ERD...",
      startTime: "09:30",
      EndTime: "10:30",
      date: "4/16/2024",
    },
    {
      title: "ERD Issue",
      desc: "A0A Sir, I have to discuss the issue of my project ERD...",
      startTime: "09:30",
      EndTime: "10:30",
      date: "4/17/2024",
    },
  ];

  useEffect(() => {
    const meetings = AllMeetings.filter(
      (item) => item.date === selectedDate.toLocaleDateString()
    );
    setMeetings(meetings);
  }, [selectedDate]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePrevDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectedDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center">
        <img src={biitLogo} alt="Biit Logo" className="w-10/12" />
      </div>
      <h1 className="text-2xl">Meeting Management</h1>
      <div className="flex flex-row items-start mt-3">
        {/* Calendar */}
        <div className="mr-8">
          <Calendar onChange={handleDateChange} value={selectedDate} />
          <div className="flex justify-center mt-4 space-x-4">
            <button onClick={handlePrevDay}>
              <RiArrowLeftSLine className="text-3xl" />
            </button>
            <h1 className="text-2xl">{selectedDate.toLocaleDateString()}</h1>
            <button onClick={handleNextDay}>
              <RiArrowRightSLine className="text-3xl" />
            </button>
          </div>
        </div>
        {/* Meetings */}
        <div className="overflow-auto bg-gray-300 h-72 w-72 px-2 rounded">
          {meetings.map((item, index) => (
            <MeetingDetailCard
              key={index}
              title={item.title}
              desc={item.desc}
              startTime={item.startTime}
              EndTime={item.EndTime}
              date={item.date}
            />
          ))}
        </div>
      </div>
      {/* Add Meeting Button */}
      <button className="bg-green-600 text-white flex flex-row justify-center items-center space-x-2 py-3 px-3 rounded-lg mt-4">
        <FaPlusSquare /> <span className="font-bold">Add Meeting</span>
      </button>
    </div>
  );
}

export default Meetings;
