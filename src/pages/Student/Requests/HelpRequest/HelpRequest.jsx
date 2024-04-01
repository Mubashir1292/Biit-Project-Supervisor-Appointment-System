import React, { useState } from "react";
import BiitSAS from "../../../../assets/extra/biitSAS.png";
import Dropdown from "../../../../components/dropdown/Dropdown";
function HelpRequest() {
  const options = [
    { label: "Sir Zahid", value: "Sir Zahid" },
    { label: "Sir Umar", value: "Sir Umar" },
  ];
  const Timeoptions = [
    { label: "08:30", value: "09:30" },
    { label: "09:30", value: "10:30" },
  ];
  const Dayoptions = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
  ];
  const [Dayselection, setDaySelection] = useState(null);
  const [selection, setSelection] = useState(null);
  const [Timeselection, setTimeSelection] = useState(null);
  const handleSelect = (option) => {
    setSelection(option);
  };

  const handleDaySelect = (option) => {
    setDaySelection(option);
  };
  const handleTimeSelect = (option) => {
    setTimeSelection(option);
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
          <b>React Native</b>
        </div>
        <form action="#">
          <div className="flex flex-row  w-full justify-center items-center space-x-2">
            <label htmlFor="Available Teachers" className="line-height-normal">
              Available Teacher :
            </label>
            <Dropdown
              options={options}
              value={selection}
              OnSelect={handleSelect}
              className="relative w-2/12"
            />
          </div>
          <div className="flex flex-row  w-full justify-center items-center space-x-14">
            <label htmlFor="Available Teachers" className="line-height-normal">
              Select Day :
            </label>
            <Dropdown
              options={Dayoptions}
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
              options={Timeoptions}
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
