import React, { useState } from "react";
import biitSAS from "../../../assets/extra/biitSAS.png";
import Button from "../../../components/button/Button";
import Dropdown from "../../../components/dropdown/Dropdown";

function GroupCreation() {
  const options = [
    { label: "React Native", value: "React-Native" },
    { label: "React Native", value: "React-Native" },
  ];
  const [selection, setSelection] = useState(null);
  const [isGroupCreated, setIsGroupCreated] = useState(true);

  const handleSelect = (option) => {
    setSelection(option);
  };

  return (
    <>
      {!isGroupCreated ? (
        <>
          <div className=" flex flex-col space-x-0 justify-start items-center h-full p-0">
            <div className="w-full flex justify-center">
              <img src={biitSAS} alt="biitSAS" className="w-3/12 h-auto mt-0" />
            </div>
            <h1 className="text-gray-600 font-bold mt-2 text-center">
              You haven't created any group
            </h1>
            <div className="mt-6 w-80">
              <div className="flex flex-col mb-4">
                <label htmlFor="title" className="text-gray-700 mb-1">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  className="border border-gray-400 rounded-md py-1 px-3"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="desc" className="text-gray-700 mb-1">
                  Description:
                </label>
                <input
                  type="text"
                  id="desc"
                  className="border border-gray-400 rounded-md py-1 px-3"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="technology" className="text-gray-700 mb-1">
                  My Technology:
                </label>
                <Dropdown
                  label="My Technology"
                  options={options}
                  value={selection}
                  onSelect={handleSelect}
                />
              </div>
            </div>
            <Button
              primary
              roundedMedium
              className="text-white p-3 mt-4 hover:bg-green-600 hover:text-white transition-all"
            >
              Create Group
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-full flex flex-col items-center">
            <div className="w-full flex justify-center">
              <img src={biitSAS} alt="biitSAS" className="w-4/12 h-auto mt-0" />
            </div>
            <div className="flex flex-col mb-4">
              <form action="#" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="desc" className="text-gray-700 mb-1">
                  Enter the Arid-Number:
                </label>
                <div className="flex flex-row  items-center space-x-3  p-3">
                  <input
                    type="number"
                    name="Year"
                    id="Year"
                    className="border border-gray-400 rounded-md py-1 px-3 w-6/12 h-4/6"
                  />
                  <input
                    type="text"
                    value="-Arid-"
                    readOnly
                    className="border-none w-1/12 bg-transparent "
                  />
                  <input
                    type="number"
                    name="RollNumber"
                    id="RollNumber"
                    className="border border-gray-400 rounded-md py-1 px-3 w-6/12 h-4/6"
                  />
                </div>
              </form>
              <div className="flex flex-row justify-center items-center space-x-3 mt-2">
                <label>Name :</label>
                <input
                  type="text"
                  name="nameFetched"
                  id="nameFetched"
                  className="border-b border-b-gray-700"
                  readOnly
                />
                <label className="text-green-600">
                  This Person can join group
                </label>
              </div>
              <div className="flex flex-row justify-center items-center  space-x-3">
                <label className="text-2xl">Choose Technology :</label>
                <Dropdown
                  label="Technology"
                  options={options}
                  value={selection}
                  onSelect={handleSelect}
                  className="w-2/6 self-center mt-2 "
                />
              </div>
              <div className="flex flex-row justify-center space-x-3 items-center mt-3">
                <label htmlFor="Message">Message : </label>
                <textarea
                  name="Message"
                  id="Message"
                  className="border border-gray-500 rounded w-2/6 h-20 resize-none"
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
                  Request
                </button>
              </div>
              <div className="flex flex-row justify-evenly  text-white mt-4 rounded bg-green-600">
                <b>Full Name</b>
                <b>Arid-Number</b>
                <b>Technology</b>
                <b>Status</b>
                <b>Date</b>
              </div>
              <div className="flex flex-row justify-between  text-black mt-0 rounded bg-gray-300 hover:bg-gray-400 cursor-default hover:border-b hover:border-b-black font-normal px-3 py-1">
                <p>Mubashir Liaqat</p>
                <p>2020-Arid-3675</p>
                <p>React-Native</p>
                <p className="text-red-600 font-bold">Me</p>
                <p>20-03-2024</p>
              </div>
              <div className="flex flex-row justify-between  text-black mt-0 rounded bg-gray-300 font-normal px-3 py-1 hover:bg-gray-400 cursor-default hover:border-b hover:border-b-black">
                <p>Faheem Abbas</p>
                <p>2020-Arid-4225</p>
                <p>React-Js</p>
                <p className="text-red-600 font-bold">Rejected</p>
                <p>20-03-2024</p>
              </div>
              <div className="flex flex-row justify-between  text-black mt-0 rounded bg-gray-300 font-normal px-3 py-1 hover:bg-gray-400 cursor-default hover:border-b hover:border-b-black">
                <p>Touseef Sajjad</p>
                <p>2020-Arid-4224</p>
                <p>Flutter</p>
                <p className="text-red-600 font-bold">Approved</p>
                <p>30-03-2024</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default GroupCreation;
