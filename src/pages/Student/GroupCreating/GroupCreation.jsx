import React, { useState, useEffect } from "react";
//import biitSAS from "../../../assets/extra/biitSAS.png";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Button from "../../../components/button/Button";
import Dropdown from "../../../components/dropdown/Dropdown";

function GroupCreation() {
  const [isGroupCreated, setIsGroupCreated] = useState(false);

  //! checking if the group is created or Not
  //* this condition is checked when the student login successfull
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selection, setSelection] = useState(null);
  const [options, setOptions] = useState([]);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const handleGetOptions = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.11/OfficialPSAS/api/psas/fillingDropDown"
      );
      const data = await response.json();
      if (data) {
        setOptions(data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    handleGetOptions();
  }, []);

  const handleSelect = (option) => {
    setSelection(option);
  };
  const handleClick = () => {
    console.log(title, desc, selection);
    if (title && desc && selection) {
      setIsGroupCreated(true);
    } else {
      alert("fields not be empty");
    }
  };
  const handleSubmit = async () => {
    const response = await fetch(
      `http://192.168.1.11/OfficialPSAS/api/psas/CreateNewGroup?id=${user.uid}&title=${title}&desc=${desc}&creatorTechnology=${selection.value}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.includes("Created")) {
      setIsGroupCreated(true);
    }
    console.log(data);
  };
  return (
    <>
      {!isGroupCreated ? (
        <>
          <div className=" flex flex-col space-x-0 justify-start items-center h-full p-0">
            <div className="w-full flex justify-center">
              <img src={BiitSAS} alt="BiitSAS" className="w-3/12 h-auto mt-0" />
            </div>
            <h1 className="text-gray-600 font-bold mt-2 text-center">
              You haven't created any group
            </h1>
            <form className="mt-6 w-80" onSubmit={handleSubmit}>
              <div className="flex flex-col mb-4">
                <label htmlFor="title" className="text-gray-700 mb-1">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="border border-gray-400 rounded-md py-1 px-3"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="technology" className="text-gray-700 mb-1">
                  My Technology:
                </label>
                <Dropdown
                  label="Project Domain"
                  options={options}
                  value={selection}
                  OnSelect={handleSelect}
                  className="relative w-6/12 text-md"
                />
              </div>
            </form>
            <div className="flex flex-row">
              <Button
                primary
                roundedMedium
                className="text-white p-3 mt-4 hover:bg-green-600 hover:text-white transition-all"
                onClick={handleSubmit}
              >
                Create Group
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-full flex flex-col items-center">
            <div className="w-full flex justify-center">
              <img src={BiitSAS} alt="BiitSAS" className="w-4/12 h-auto mt-0" />
            </div>
            <div className="flex flex-col mb-4">
              <form action="#" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-row justify-center items-center space-x-3  p-3">
                  <label htmlFor="desc" className="text-gray-700 mb-1">
                    Enter the Arid-Number:
                  </label>
                  <input
                    type="number"
                    name="Year"
                    id="Year"
                    className="border border-gray-400 rounded-md py-1 px-3 w-[80px] h-4/6"
                  />
                  <input
                    type="text"
                    value="-Arid-"
                    readOnly
                    className="border-none w-1/12 bg-transparent font-bold"
                  />
                  <input
                    type="number"
                    name="RollNumber"
                    id="RollNumber"
                    className="border border-gray-400 rounded-md py-1 px-1 w-[80px] h-4/6"
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
                  OnSelect={handleSelect}
                  className="relative w-3/12"
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
              {/* <div className="flex flex-row justify-between text-white mt-4 rounded bg-green-600">
                <b>Full Name</b>
                <b>Arid-Number</b>
                <b>Technology</b>
                <b>Date</b>
                <b>Status</b>
              </div>
              <div className="flex flex-row justify-between  text-black mt-0 rounded bg-gray-300 hover:bg-gray-400 cursor-default hover:border-b hover:border-b-black font-normal px-3 py-1">
                <p>Mubashir Liaqat</p>
                <p>2020-Arid-3675</p>
                <p>React-Native</p>
                <p>20-03-2024</p>
                <p className="text-red-600 font-bold">Me</p>
              </div>
              <div className="flex flex-row justify-between  text-black mt-0 rounded bg-gray-300 font-normal px-3 py-1 hover:bg-gray-400 cursor-default hover:border-b hover:border-b-black">
                <p>Faheem Abbas</p>
                <p>2020-Arid-4225</p>
                <p>React-Js</p>
                <p>20-03-2024</p>
                <p className="text-red-600 font-bold">Rejected</p>
              </div>
              <div className="flex flex-row justify-between  text-black mt-0 rounded bg-gray-300 font-normal px-3 py-1 hover:bg-gray-400 cursor-default hover:border-b hover:border-b-black">
                <p>Touseef Sajjad</p>
                <p>2020-Arid-4224</p>
                <p>Flutter</p>
                <p>30-03-2024</p>
                <p className="text-red-600 font-bold">Approved</p>
              </div> */}
              <div className="overflow-x-auto mt-2">
                <table className="w-full whitespace-nowrap">
                  <thead>
                    <tr className="bg-green-600 text-white">
                      <th className="px-6 py-3 text-left">Full Name</th>
                      <th className="px-6 py-3 text-left">Arid-Number</th>
                      <th className="px-6 py-3 text-left">Technology</th>
                      <th className="px-6 py-3 text-left">Date</th>
                      <th className="px-6 py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-300 hover:bg-gray-400">
                      <td className="px-6 py-4">Mubashir Liaqat</td>
                      <td className="px-6 py-4">2020-Arid-3675</td>
                      <td className="px-6 py-4">React-Native</td>
                      <td className="px-6 py-4">20-03-2024</td>
                      <td className="px-6 py-4 text-red-600 font-bold">Me</td>
                    </tr>
                    <tr className="bg-gray-300 hover:bg-gray-400">
                      <td className="px-6 py-4">Faheem Abbas</td>
                      <td className="px-6 py-4">2020-Arid-4225</td>
                      <td className="px-6 py-4">React-Js</td>
                      <td className="px-6 py-4">20-03-2024</td>
                      <td className="px-6 py-4 text-red-600 font-bold">
                        Rejected
                      </td>
                    </tr>
                    <tr className="bg-gray-300 hover:bg-gray-400">
                      <td className="px-6 py-4">Touseef Sajjad</td>
                      <td className="px-6 py-4">2020-Arid-4224</td>
                      <td className="px-6 py-4">Flutter</td>
                      <td className="px-6 py-4">30-03-2024</td>
                      <td className="px-6 py-4 text-green-600 font-bold">
                        Approved
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default GroupCreation;
