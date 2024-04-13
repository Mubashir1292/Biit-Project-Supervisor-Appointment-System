import React, { useEffect, useState } from "react";
import BiitSAS from "../../../../assets/extra/biitSAS.png";
import Dropdown from "../../../../components/dropdown/Dropdown";
function HelpRequest() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // const options = [
  //   { label: "Sir Zahid", value: "Sir Zahid" },
  //   { label: "Sir Umar", value: "Sir Umar" },
  // ];
  const [Dayselection, setDaySelection] = useState(null);
  const [selectionExpert, setSelectionExpert] = useState(null);
  const [Timeselection, setTimeSelection] = useState(null);
  const [myTechnology, setMyTechnology] = useState("");
  const [expertList, setExpertList] = useState([]);
  const [weekDays, setWeekDays] = useState([]);
  const [freeTimeSlots, setFreeTimeSlots] = useState([]);
  const [message, setMessage] = useState("");
  //* getting the Technology
  const gettingTechnology = async () => {
    try {
      const response = await fetch(
        `http://192.168.100.4/OfficialPSAS/api/psas/GetTechnology?regNo=${user.uid}`
      );
      const data = await response.json();
      if (data !== null) {
        setMyTechnology(data.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //* getting the Experts using the Technology
  const gettingExpertsUsingTechnology = async () => {
    try {
      const response = await fetch(
        `http://192.168.100.4/OfficialPSAS/api/psas/FetchingRelativeTechnicalExpert?regNo=${user.uid}`
      );
      const data = await response.json();
      console.log(data);
      if (data !== null) {
        const expertListData = data?.map((item) => ({
          label: item.teacher.tid,
          value: item.teacher.username,
        }));
        console.log(expertListData);
        setExpertList(expertListData);
      } else {
        setExpertList([]);
        console.log(expertList);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //* getting all days
  const getAllWorkingDays = async () => {
    try {
      const response = await fetch(
        `http://192.168.100.4/OfficialPSAS/api/psas/GetAllDays`
      );
      const data = await response.json();
      if (data !== null) {
        const alldays = data?.map((day) => ({
          label: day,
          value: day,
        }));
        setWeekDays(alldays);
      } else {
        setWeekDays([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //* getting the TimeSlots available on to the respective day
  const getTimeSlots = async () => {
    try {
      const response = await fetch(
        `http://192.168.100.4/OfficialPSAS/api/psas/GetTheTimeSlots?day=${Dayselection.value}&teacher_id=${selectionExpert?.label}`
      );
      const data = await response.json();
      if (data !== "") {
        const TimeSlots = data.map((item) => ({
          label: item.Sch_id,
          value: item.start_time.slice(0, 5) + "-" + item.end_time.slice(0, 5),
        }));
        if (TimeSlots.length !== 0) {
          console.log(TimeSlots);
          setFreeTimeSlots(TimeSlots);
        } else {
          console.log(freeTimeSlots);
          setFreeTimeSlots([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  //! posting the final help Request
  const postingHelpRequest = async () => {
    try {
      const respone = await fetch(
        `http://192.168.100.4/OfficialPSAS/api/psas/PostingHelpRequest?teacher_id=${selectionExpert.label}&regno=${user.uid}&sch_id=${selectionExpert.label}&message=${message}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettingTechnology();
    gettingExpertsUsingTechnology();
    getAllWorkingDays();
  }, []);

  const handleSelect = (option) => {
    setSelectionExpert(option);
    console.log(option);
  };

  const handleDaySelect = (option) => {
    setDaySelection(option);
    getTimeSlots();
    console.log(option);
  };
  const handleTimeSelect = (option) => {
    setTimeSelection(option);
    console.log(Timeselection);
  };
  return (
    <>
      <div className="flex flex-col w-full space-y-2">
        <div className=" w-full flex  justify-center">
          <img src={BiitSAS} alt="BiitSAS" className="w-4/12 h-auto mt-0" />
        </div>
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold">Help Request</h1>
        </div>
        <div className="flex flex-row space-x-4 mt-3 justify-center ">
          <label>My Technology:</label>
          <b>{myTechnology}</b>
        </div>
        <form action="#">
          <div className="flex flex-row  w-full justify-center items-center space-x-2">
            <label htmlFor="Available Teachers" className="line-height-normal">
              Available Teacher :
            </label>
            <Dropdown
              options={expertList}
              value={selectionExpert}
              OnSelect={handleSelect}
              className="relative w-2/12"
            />
          </div>
          <div className="flex flex-row  w-full justify-center items-center space-x-14">
            <label htmlFor="Available Teachers" className="line-height-normal">
              Select Day :
            </label>
            <Dropdown
              options={weekDays}
              value={Dayselection}
              OnSelect={handleDaySelect}
              className="relative w-2/12"
            />
          </div>
          <div className="flex flex-row  w-full justify-center items-center space-x-7">
            <label htmlFor="Available Teachers" className="line-height-normal">
              Available Slots :
            </label>
            <Dropdown
              options={freeTimeSlots}
              value={Timeselection}
              OnSelect={handleTimeSelect}
              className="relative w-2/12"
            />
          </div>
          <div className="flex flex-row justify-center space-x-6 items-center mt-3">
            <label htmlFor="Message">Enter Message : </label>
            <textarea
              name="Message"
              id="Message"
              className="border border-gray-500 rounded w-1/6 h-20 resize-none"
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
