import React, { useEffect, useState } from "react";
import Calendar from "../../../components/Calender/Calender";
import biitLogo from "../../../assets/extra/biitSAS.png";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { FaPlusSquare } from "react-icons/fa";
import MeetingDetailCard from "../../../components/MeetingDetailsCard/MeetingDetailCard";
import Dropdown from "../../../components/dropdown/Dropdown";
import RequestedStudentsDropdown from "../../../components/MultipleStudentsSelectionforMeeting/ParticipantsSelection";

function Meetings() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const [addNewMeeting, setAddNewMeeting] = useState(false);
  //* Day Selecting for dropdown
  const [meetingDay, setMeetingDay] = useState(null);
  const [TimeSlotsOptions, setTimeSlotsOptions] = useState([]);
  const [SelectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [meetingtitle, setMeetingTitle] = useState("");
  const [meetingDesc, setMeetingDesc] = useState("");
  //*help Requested...
  const [selectedParticipants, setSelectedParticipants] = useState([]);
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
  const AvailableTimeSlots = [
    {
      day: 1,
      startTime: "08:30",
      endTime: "09:30",
    },
    {
      day: 1,
      startTime: "09:30",
      endTime: "10:30",
    },
    {
      day: 1,
      startTime: "10:30",
      endTime: "11:30",
    },
    {
      day: 1,
      startTime: "11:30",
      endTime: "12:30",
    },
    {
      day: 2,
      startTime: "11:30",
      endTime: "12:30",
    },
  ];
  const allRequests = [
    {
      id: "2020-Arid-3675",
      name: "Mubashir Liaqat",
    },
    {
      id: "2020-Arid-4224",
      name: "Touseef ",
    },
    {
      id: "2020-Arid-4225",
      name: "Faheem",
    },
  ];
  //* fetching all the help Requests

  useEffect(() => {
    const filteredMeetings = AllMeetings.filter(
      (item) => item.date === selectedDate.toLocaleDateString()
    );
    setMeetings(filteredMeetings);
    const filteredTimeSlots = AvailableTimeSlots.filter(
      (slot) => slot.day === selectedDate.getDay()
    );
    const options = filteredTimeSlots.map((slot, index) => ({
      label: index,
      value: `${slot.startTime}--${slot.endTime}`,
    }));
    setTimeSlotsOptions(options);
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

  const handleToggleMeeting = () => {
    setAddNewMeeting(!addNewMeeting);
  };
  //* getting the day from the date selected by the supervisor
  const getDay = () => {
    const day = selectedDate.getDay();
    if (day === 1) {
      setMeetingDay("Monday");
    } else if (day === 2) {
      setMeetingDay("Tuesday");
    } else if (day === 3) {
      setMeetingDay("Wednesday");
    } else if (day === 4) {
      setMeetingDay("Thursday");
    } else if (day === 5) {
      setMeetingDay("Friday");
    }
  };
  const handleTimeSlotSelection = (option) => {
    setSelectedTimeSlot(option);
    console.log(option);
  };
  return (
    <>
      {!addNewMeeting ? (
        <>
          <div className="flex flex-col items-center">
            <div className="flex justify-center">
              <img src={biitLogo} alt="Biit Logo" className="w-10/12" />
            </div>
            <h1 className="text-2xl mb-4">Meeting Management</h1>
            <div className="flex flex-row items-start">
              {/* Calendar */}
              <div className="mr-8">
                <Calendar onChange={handleDateChange} value={selectedDate} />
                <div className="flex justify-center mt-4 space-x-4">
                  <button onClick={handlePrevDay}>
                    <RiArrowLeftSLine className="text-3xl" />
                  </button>
                  <h1 className="text-2xl">
                    {selectedDate.toLocaleDateString()}
                  </h1>
                  <button onClick={handleNextDay}>
                    <RiArrowRightSLine className="text-3xl" />
                  </button>
                </div>
              </div>
              {/* Meetings */}
              <div className="overflow-auto bg-gray-200 h-72 w-72 px-2 rounded">
                {meetings.length === 0 ? (
                  <div className="text-center mt-4">
                    No meetings for this day
                  </div>
                ) : (
                  meetings.map((item, index) => (
                    <MeetingDetailCard
                      key={index}
                      title={item.title}
                      desc={item.desc}
                      startTime={item.startTime}
                      EndTime={item.EndTime}
                      date={item.date}
                    />
                  ))
                )}
              </div>
            </div>
            {/* Add Meeting Button */}
            <button
              className="bg-green-600 text-white flex flex-row justify-center items-center space-x-2 py-3 px-3 rounded-lg mt-4"
              onClick={() => {
                handleToggleMeeting();
                getDay();
              }}
            >
              <FaPlusSquare /> <span className="font-bold">Add Meeting</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex justify-center items-center">
              <h1 className="text-2xl">Add New Meeting</h1>
            </div>
            <div className="bg-gray-200 border border-gray-700 p-3 w-11/12 flex flex-col justify-center items-center space-x-2 rounded-md mt-3">
              <div className="flex justify-between items-center space-x-3">
                <label>Selected Day :</label>
                <h1 className="text-lg">{meetingDay}</h1>
              </div>
              <div className="flex justify-center items-center space-x-3 w-10/12">
                <label>Select Time Slot:</label>
                <Dropdown
                  label="Today"
                  options={TimeSlotsOptions}
                  value={SelectedTimeSlot}
                  OnSelect={handleTimeSlotSelection}
                  className="relative w-3/12"
                />
              </div>
              <div className="flex flex-row  justify-center w-6/12 space-x-2 mt-2">
                <label>Select Participants:</label>
                <RequestedStudentsDropdown
                  students={allRequests}
                  onSelect={setSelectedParticipants}
                />
              </div>
              <div className="flex flex-row justify-center space-x-6 mt-2">
                <label>Enter Title :</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={meetingtitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  className="border border-gray-400 py-1 rounded-sm px-2 w-7/12"
                />
              </div>
              <div className="flex flex-row  space-x-2 mt-2">
                <label>Enter Description :</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={meetingDesc}
                  onChange={(e) => setMeetingDesc(e.target.value)}
                  className="border border-gray-400 py-1 rounded-sm px-2"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Meetings;
