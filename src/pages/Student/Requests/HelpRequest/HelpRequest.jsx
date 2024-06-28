import React, { useEffect, useState } from "react";
import BiitSAS from "../../../../assets/extra/biitSAS.png";
import Dropdown from "../../../../components/dropdown/Dropdown";

import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function HelpRequest() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectionExpert, setSelectionExpert] = useState(null);
  const [Timeselection, setTimeSelection] = useState(null);
  const [myTechnology, setMyTechnology] = useState("");
  const [expertList, setExpertList] = useState([]);
  const [freeTimeSlots, setFreeTimeSlots] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  //* getting the Technology
  const gettingTechnology = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/GetTechnology?regNo=${user.uid}`
      );
      const data = await response.json();
      if (data !== null) {
        setMyTechnology(data.name);
      } else {
        //alert(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //* getting the Experts using the Technology
  const gettingExpertsUsingTechnology = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/FetchingRelativeTechnicalExpert?regNo=${user.uid}`
      );
      const data = await response.json();
      console.log(data);
      if (data !== null) {
        const expertListData = data?.map((item) => ({
          label: item.teacher.tid,
          value: item.teacher.username,
        }));
        setExpertList(expertListData);
      } else {
        setExpertList([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //* getting the TimeSlots available on to the respective day
  const getTimeSlots = async (date) => {
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS/GetTheTimeSlots?date=${formattedDate}&teacher_id=${
          (selectionExpert && selectionExpert.label) || expertList[0].label
        }`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        const TimeSlots = data?.map((item, index) => ({
          label: item.Sch_id,
          value: item.start_time.slice(0, 5) + "-" + item.end_time.slice(0, 5),
        }));
        if (TimeSlots.length !== 0) {
          setFreeTimeSlots(TimeSlots);
        }
      } else {
        // alert(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //! posting the final help Request
  const postingHelpRequest = async () => {
    try {
      if (
        selectionExpert.label &&
        user.uid &&
        Timeselection.label &&
        message &&
        selectedDate
      ) {
        const response = await fetch(
          `http://localhost/OfficialPSAS/api/psas/PostingHelpRequest?teacher_id=${
            selectionExpert.label || expertList[0].label
          }&regno=${user.uid}&sch_id=${
            Timeselection.label || freeTimeSlots[0].label
          }&message=${message}&date=${selectedDate}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
            },
          }
        );
        const data = await response.json();
        if (data === "Requested for the Appointment") {
          setMessage("");
          navigate("/student/dashboard");
        } else {
          // alert(data);
        }
      } else {
        alert("fields cannot be empty");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettingTechnology();
    gettingExpertsUsingTechnology();
  }, []);

  const handleSelect = (option) => {
    setSelectionExpert(option);
    console.log(option);
  };

  useEffect(() => {
    if (selectedDate) {
      const day = format(selectedDate, "EEEE"); // Get the full day name
      setSelectedDay(day);
      getTimeSlots(selectedDate);
    }
  }, [selectedDate]);

  const handleTimeSelect = (option) => {
    setTimeSelection(option);
  };

  function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <div className="flex flex-col w-full space-y-2">
        <div className=" w-full flex  justify-center">
          <img src={BiitSAS} alt="BiitSAS" className="w-8/12 h-auto mt-0" />
        </div>
        <div className="w-full text-center">
          <h1 className="text-xl font-semibold text-green-500">Help Request</h1>
        </div>
        <div className="flex flex-row space-x-2 mt-3 justify-center ">
          <label className="text-sm">My Technology:</label>
          <b className="text-sm font-semibold">{myTechnology}</b>
        </div>
        <form action="#">
          <div className="flex flex-row w-full justify-center items-center">
            <label
              htmlFor="Available Teachers"
              className="line-height-normal text-xs"
            >
              Available Teacher:
            </label>
            <Dropdown
              options={expertList}
              value={selectionExpert}
              OnSelect={handleSelect}
              className="relative w-6/12 text-sm"
            />
          </div>
          <div className="flex flex-row w-full justify-center items-center space-x-1 my-2">
            <label htmlFor="Select Date" className="line-height-normal text-xs">
              Select Date:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={getToday()}
              className="relative w-3/6 text-sm bg-gray-200"
            />
          </div>
          {selectedDay && (
            <div className="flex flex-row w-full justify-center items-center space-x-1">
              <label
                htmlFor="Selected Day"
                className="line-height-normal text-xs"
              >
                Day:
              </label>
              <span>{selectedDay}</span>
            </div>
          )}
          <div className="flex flex-row w-full justify-center items-center space-x-1">
            <label
              htmlFor="Available Slots"
              className="line-height-normal text-sm"
            >
              Available Slots:
            </label>
            <Dropdown
              options={freeTimeSlots}
              value={Timeselection}
              OnSelect={handleTimeSelect}
              className="relative w-6/12 text-sm"
            />
          </div>
          <div className="flex flex-row justify-center space-x-1 items-center mt-3">
            <label htmlFor="Message" className="text-sm">
              Enter Message:
            </label>
            <textarea
              name="Message"
              id="Message"
              className="border border-gray-500 rounded w-4/6 h-24 resize-none p-3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-row justify-center items-center space-x-4 mt-3">
            <button
              type="button"
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-50 hover:text-black transition-all border border-black hover:font-bold"
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-gray-50 hover:text-green-600 transition-all border border-green-600 hover:font-bold"
              onClick={postingHelpRequest}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default HelpRequest;
