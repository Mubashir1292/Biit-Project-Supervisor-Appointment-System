import React, { useState, useEffect } from "react";
//import biitSAS from "../../../assets/extra/biitSAS.png";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Button from "../../../components/button/Button";
import Dropdown from "../../../components/dropdown/Dropdown";
import { Table } from "react-bootstrap";

function GroupCreation() {
  const [isGroupCreated, setIsGroupCreated] = useState(false);
  const [group, setGroup] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  //! checking if the group is created or Not
  //* this condition is checked when the student login successfull
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selection, setSelection] = useState(null);
  const [selectedTechnology, setSelectedTechnology] = useState(null);
  const [options, setOptions] = useState([]);
  const [res, setRes] = useState([]);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  //* setting the variables for the requesting for a new member
  const [aridYear, setAridYear] = useState("");
  const [aridNumber, setAridNumber] = useState("");
  const [nameOfMember, setNameOfMember] = useState("");
  const [groupStatus, setGroupStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [completeAridNumber, setCompleteAridNumber] = useState("");
  const [currentGroupCgpa, setCurrentGroupCgpa] = useState(0);
  const [listOfTechnologies, setListOfTechnologies] = useState([]);
  //* Getting all Technologies for group creation
  const handleGetAllTechnologies = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.9/OfficialPSAS/api/psas/FillingDropDown`
      );
      const data = await response.json();
      setListOfTechnologies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTechnologySelect = (option) => {
    setSelectedTechnology(option);
    console.log(option);
  };
  const handleGetOptions = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.9/OfficialPSAS/api/psas/GettingTechnolgiesOtherThenCreatorTechnology?regNo=${user.uid}`
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
  const checkingGroupExistance = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.9/OfficialPSAS/api/psas/ChekingGroupExistence?id=${user.uid}`
      );
      const data = await response.json();
      if (data === 0) {
        setIsGroupCreated(true);
      } else {
        setIsGroupCreated(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  //!Get the group cgpa on the base of the regNo
  const GetGroupCgpa = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.9/OfficialPSAS/api/psas/GroupCgpaByRegNo?regNo=${user.uid}`
      );
      const data = await response.json();
      let parsedNumber = parseFloat(data?.toFixed(2));
      setCurrentGroupCgpa(parsedNumber);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetOptions();
    checkingGroupExistance();
    GetGroupCgpa();
    handleGetAllTechnologies();
  }, []);

  //* Checking Student's group
  let currenteDate = new Date();
  let formattedDateTime = currenteDate.toISOString().slice(0, 19);
  const GetGroupStatus = async () => {
    const MySelf = {
      dateTime: formattedDateTime,
      name: user.username,
      receiver: {
        uid: user.uid,
        username: user.username,
      },
      status: "Me",
    };
    const response = await fetch(
      `http://192.168.1.9/OfficialPSAS/api/psas/getAllRequests?Id=${user.uid}`
    );
    let result = await response.json();
    setRes(result);
    setRes([...result, MySelf]);
    if (typeof result === "object") {
      setGroup(result);
      if (result.length === 5) {
        setIsDisabled(true);
      }
    }
  };
  useEffect(() => {
    GetGroupStatus();
  }, []);

  const handleSelect = (option) => {
    setSelection(option);
    console.log(option);
  };
  const handleSubmit = async () => {
    const response = await fetch(
      `http://192.168.1.9/OfficialPSAS/api/psas/CreateNewGroup?regNo=${user.uid}&title=${title}&desc=${desc}&creatorTechnology=${selection.value}`,
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
  //* Searching for a student
  const handleSearch = async () => {
    if (aridNumber.length === 4 && aridYear.length === 4) {
      let completeArid = aridYear + "-Arid-" + aridNumber;
      setCompleteAridNumber(completeArid);
      console.log(completeAridNumber);
    }
    try {
      const response = await fetch(
        `http://192.168.1.9/OfficialPSAS/api/psas/CheckingStudentGroupStatus?regNo=${completeAridNumber}`
      );
      const data = await response.json();
      console.log(data);
      if (data.includes("0")) {
        let name = data.split(":")[1];
        setNameOfMember(name);
        setGroupStatus(true);
      } else if (data.includes("1")) {
        setGroupStatus(false);
        let name = data.split(":")[1];
        setNameOfMember(name);
      } else {
        alert(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //* Requesting to new Member
  const handleRequest = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.9/OfficialPSAS/api/psas/SendingRequestToMember?senderId=${user.uid}&receiverId=${completeAridNumber}&technology=${selection.label}&Message=${message}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isGroupCreated ? (
        <>
          <div className=" flex flex-col space-x-0">
            <div className="w-full">
              <img
                src={BiitSAS}
                alt="BiitSAS"
                className="w-3/12 flex self-start"
              />
            </div>
            <h1 className="text-gray-600 font-bold mt-2 text-center">
              You haven't created any group
            </h1>
            <form
              className="mt-6 w-80"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
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
                  options={listOfTechnologies}
                  value={selectedTechnology}
                  OnSelect={handleTechnologySelect}
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
          <div className="w-full h-full flex flex-col ">
            <div className="w-5/6 flex justify-center min-[320px]:justify-center">
              <img
                src={BiitSAS}
                alt="BiitSAS"
                className="w-full min-[320px]:w-40"
              />
            </div>
            <div className="flex flex-col mb-4">
              <div className="w-full flex flex-row items-center justify-center space-x-2">
                <label className="text-sm">My Group's Cgpa :</label>
                <input
                  type="text"
                  name="groupCgpa"
                  id="groupCgpa"
                  readOnly
                  className="text-sm w-20"
                  value={currentGroupCgpa || 0}
                />
              </div>
              <form
                action="#"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="w-5/6 flex flex-col justify-center items-center">
                  <label htmlFor="desc" className="text-gray-700 mb-1">
                    Enter Arid-Number:
                  </label>
                  <div className="flex flex-row space-x-1 my-2">
                    <input
                      type="number"
                      name="Year"
                      id="Year"
                      className="border border-gray-400 rounded-md py-1 px-3 w-[80px] h-4/6"
                      value={aridYear}
                      onChange={(e) => setAridYear(e.target.value)}
                    />
                    <input
                      type="text"
                      value="-Arid-"
                      readOnly
                      className="border-none w-12 bg-transparent font-bold"
                    />
                    <input
                      type="number"
                      name="RollNumber"
                      id="RollNumber"
                      className="border border-gray-400 rounded-md py-1 px-1 w-[80px] h-4/6"
                      value={aridNumber}
                      onChange={(e) => setAridNumber(e.target.value)}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Search"
                    className="bg-green-600 text-white px-2 rounded-md hover:bg-white hover:text-green-700 transition-all ease-in-out cursor-pointer border hover:border-green-700"
                    onClick={handleSearch}
                  />
                </div>
              </form>
              <div className="flex flex-row justify-center items-center space-x-3 mt-2">
                <label className="text-xs">Name:</label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="nameFetched"
                    id="nameFetched"
                    className="border-b border-b-gray-700 text-center"
                    readOnly
                    value={nameOfMember || ""}
                  />
                  <label className="text-green-600 text-xs">
                    {groupStatus
                      ? "This Student is Available"
                      : "This Student is not Available"}
                  </label>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center space-x-2">
                <label className="text-sm">Choose Technology:</label>
                <Dropdown
                  label="Technology"
                  options={options}
                  value={selection}
                  OnSelect={handleSelect}
                  className="relative w-3/12"
                />
              </div>
              <div className="w-full flex flex-row justify-center space-x-3 items-center mt-3">
                <label htmlFor="Message">Message : </label>
                <textarea
                  name="Message"
                  id="Message"
                  className="border border-gray-500 rounded w-2/6 h-20 resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div className="w-full flex flex-row justify-center items-center space-x-4 mt-3">
                <button
                  type="button"
                  className="bg-black text-white px-2 py-1 rounded hover:bg-gray-50 hover:text-black transition-all border border-black hover:font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`bg-green-600 text-white px-2 py-1 rounded border border-green-600 text-xs ${
                    groupStatus
                      ? "hover:bg-gray-50 hover:text-green-600 transition-all  hover:font-bold"
                      : ""
                  }`}
                  disabled={!groupStatus}
                  onClick={handleRequest}
                >
                  Request
                </button>
              </div>
              <div className="w-5/6 overflow-auto my-2">
                <Table bordered hover responsive="sm">
                  <thead>
                    <tr className="bg-green-600 text-white">
                      <th className="px-2 py-1 text-left text-xs font-semibold">
                        Name
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-semibold">
                        Arid#
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-semibold">
                        Technology
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-semibold">
                        Date
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {res?.map((item, index) => (
                      <tr className="bg-gray-300 hover:bg-gray-400" key={index}>
                        <td className="px-2 py-1 text-xs">
                          {item.receiver.username}
                        </td>
                        <td className="px-2 py-1 text-xs">
                          {item.receiver.uid}
                        </td>
                        <td className="px-2 py-1 text-xs">{item.name}</td>
                        <td className="px-2 py-1 text-xs">
                          {item.datetime ? (
                            <span>{item.datetime.slice(0, 10)}</span>
                          ) : (
                            <span className="text-center font-bold text-xs">
                              ------------
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-red-600 text-xs">
                          {item.status === 0
                            ? "pending"
                            : item.status === 1
                            ? "Approved"
                            : "Me"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default GroupCreation;
