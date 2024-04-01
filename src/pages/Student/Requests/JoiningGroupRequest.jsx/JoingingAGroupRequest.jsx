import React, { useState } from "react";
import BiitSAS from "../../../../assets/extra/biitSAS.png";
import Dropdown from "../../../../components/dropdown/Dropdown";
import Table from "../../../../components/Table/Table";
function JoingingAGroupRequest() {
  const [selection, setSelection] = useState(null);
  const [isGroupDetailsShown, setIsGroupDetailsShown] = useState(false);
  const [choosedProject, setChoosedProject] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [message, setMessage] = useState("");
  const options = [
    { label: "React Native", value: "React-Native" },
    { label: "Android", value: "Android" },
    { label: "Flutter", value: "Flutter" },
    { label: "Web", value: "Web" },
  ];
  const data = [
    {
      domain: 1,
      title: "AI Health Engine",
      supervisor: "Dr.Hassan",
      desc: "The AI Health Engine project likely involves the development of an artificial intelligence system designed to improve healthcare services.",
    },
    {
      domain: 2,
      title: "Instagram Spam",
      supervisor: "Sir Zahid",
      desc: "The Instagram Spam project could involve developing techniques to detect and mitigate spam or malicious activities on the Instagram platform.",
    },
    {
      domain: 1,
      title: "Techable Machine",
      supervisor: "Dr.Hassan",
      desc: "Teachable Machine is an interactive web experiment developed by Google that allows users to train a machine learning model using their webcam.",
    },
  ];
  const handleSelect = () => {
    if (data.length) {
      const projects = data.filter((i) => i.domain === 1);
      setSelectedProjects(projects);
    } else {
      console.log("not Groups founded");
    }
  };
  const handleProjectTitle = (option) => {
    setChoosedProject(option);
  };
  const ToggleGroupDetails = () => {
    if (choosedProject) {
      setIsGroupDetailsShown((curr) => !curr);
    } else {
      alert("Atleast one project must be selected");
    }
  };
  return (
    <>
      {!isGroupDetailsShown ? (
        <>
          <div className="flex flex-col w-full">
            <div className="flex justify-center">
              <img src={BiitSAS} alt="BiitSAS" />
            </div>
            <div className="flex justify-center">
              <h1 className="text-4xl font-bold">Joining a Group</h1>
            </div>
            <div className="flex flex-row justify-center items-center space-x-3 mt-3">
              <label>Select Your Technology :</label>
              <Dropdown
                options={options}
                value={selection}
                OnSelect={handleSelect}
                className="relative w-2/12"
              />
            </div>
            <div className="flex flex-row w-full h-full justify-center space-x-8 items-center mt-3">
              <label className="text-xl">Offered Projects :</label>
              <Table
                data={selectedProjects}
                handleSelect={handleProjectTitle}
              />
            </div>
            <div className="flex flex-row w-full h-full justify-center space-x-12 items-center mt-2">
              <label className="text-xl">Project Details :</label>
              <textarea
                name="projectDetails"
                id="projectDetails"
                readOnly
                className="border border-gray-500 rounded xl:w-3/12 xl:min-h-32 h-2/6 lg:w-3/12 lg:h-max p-2"
                value={choosedProject.desc}
              ></textarea>
            </div>
            <div className="flex flex-row justify-center items-center mt-3">
              <button
                className="bg-green-600 p-3 text-white rounded-md hover:bg-white border border-green-600 hover:text-green-600"
                onClick={ToggleGroupDetails}
              >
                More Info
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col w-full justify-center items-center">
            <div className="w-full flex justify-center">
              <img src={BiitSAS} alt="BiitSAS" className="w-4/12" />
            </div>
            <div className="flex flex-row justify-center items-center space-x-4 mt-3">
              <label>Project-Title :</label>
              <b>{choosedProject.title}</b>
            </div>
            <div className="overflow-x-auto mt-2 w-8/12">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="bg-green-600 text-white border">
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
            <div className="flex flex-row justify-center items-center mt-3 space-x-3">
              <label>Message :</label>
              <textarea
                name="projectDetails"
                id="projectDetails"
                className="border border-gray-500 rounded xl:w-7/12 xl:min-h-20 h-2/6 lg:w-3/12 lg:h-max p-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-row mt-3 space-x-4">
              <button
                onClick={handleProjectTitle}
                className="bg-black text-white hover:bg-transparent hover:text-black border border-black transition-all ease-in-out p-3 rounded-md"
              >
                Discard
              </button>
              <button className="bg-green-600 text-white hover:bg-transparent hover:text-green-600 border border-green-600 transition-all ease-in-out p-3 rounded-md">
                Request
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default JoingingAGroupRequest;
