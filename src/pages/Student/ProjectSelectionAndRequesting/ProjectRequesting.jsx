import React, { useState, useEffect } from "react";
import biitSAS from "../../../assets/extra/biitSAS.png";
import Dropdown from "../../../components/dropdown/Dropdown";
import Table from "react-bootstrap/Table";
// import GroupDetails from "../../../components/Modals/CreateGroupModal/CreateGroupModal";
function ProjectRequesting() {
  const [showProjectPage, setShowProjectPage] = useState(false);
  const [choosedProject, setChoosedProject] = useState("");
  const [choosedProjectDesc, setChoosedProjectDesc] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selection, setSelection] = useState(null);
  const [options, setOptions] = useState([]);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [currentGroupCgpa, setCurrentGroupCgpa] = useState(0);
  const [myGroupDetails, setMyGroupDetails] = useState([]);
  const GetGroupCgpa = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/GroupCgpaByRegNo?regNo=${user.uid}`
      );
      const data = await response.json();
      let parsedNumber = parseFloat(data?.toFixed(2));
      setCurrentGroupCgpa(parsedNumber);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetOptions = async () => {
    try {
      const response = await fetch(
        "http://localhost/OfficialPSAS/api/psas/AllDomains"
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

  // getting myGroup
  const GettingCompleteGroup = async (pid) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/DetailsProjectSupervisorGroup?projectId=${choosedProject.pid}&regNo=${user.uid}`
      );
      const data = await response.json();
      console.log(data.singleGroupDetails);
      setMyGroupDetails(data.singleGroupDetails);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetOptions();
    GetGroupCgpa();
  }, []);

  const handleSelect = async (option) => {
    setSelection(option);

    // fetching the Projects on the base on domain and cgpa
    const response = await fetch(
      `http://localhost/OfficialPSAS/api/psas/ProjectsByDomain?Domain=${option.value}&regNo=${user.uid}`
    );
    const data = await response.json();
    setSelectedProjects(data);
  };
  const handleProjectTitle = (option) => {
    setChoosedProject(option);
    setChoosedProjectDesc(option.description);
  };
  const handleNavigation = () => {
    if (choosedProject) {
      setShowProjectPage((curr) => !curr);
      GettingCompleteGroup(choosedProject.pid);
    } else {
      alert("Select any project");
    }
  };
  const handlePostedRequest = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/PostingRequesttoSupervisor?projectId=${choosedProject.pid}&regNo=${user.uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      const data = await response.json();
      alert(data);
      setShowProjectPage((curr) => !curr);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!showProjectPage ? (
        <>
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-center items-center pt-2">
              <img src={biitSAS} alt="BiitPSAS" className="w-8/12" />
            </div>

            <div className="w-full flex flex-col justify-center items-center pt-2 space-y-2 ">
              <h1 className="text-green-600 font-semibold -mt-2 text-sm cursor-default hover:text-green-500">
                Project Selection and Requesting
              </h1>
              <p className="font-normal text-xs ">
                My Group CGPA :
                <span className="font-bold ml-3 border-b border-b-black">
                  {currentGroupCgpa || 0}
                </span>
              </p>
              <div className="flex flex-row w-full h-full justify-center  space-x-1 items-center">
                <label className="text-sm">Select Domain :</label>
                <Dropdown
                  options={options}
                  value={selection}
                  OnSelect={handleSelect}
                  className="relative w-6/12 text-[10px]"
                />
              </div>
              <div className="flex flex-col w-full h-full justify-center items-center">
                <label className="text-lg">Offered Projects</label>
                <div className="w-full flex justify-center items-center">
                  <Table
                    data={selectedProjects}
                    handleSelect={handleProjectTitle}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full h-full justify-center items-center mt-2">
                <label className="text-sm">Project Details:</label>
                <textarea
                  name="projectDetails"
                  id="projectDetails"
                  readOnly
                  className="border border-gray-500 rounded xl:w-2/12 xl:h-20 md:w-5/6 lg:w-5/12 lg:h-32 p-3"
                  value={choosedProjectDesc}
                ></textarea>
              </div>
              <div className="flex flex-row justify-center items-center w-full relative">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white hover:font-bold hover:border hover:border-green-600 w-auto px-4 py-2  rounded ml-20"
                  onClick={handleNavigation}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center space-y-8">
            <div className="w-full flex justify-center items-center">
              <img src={biitSAS} alt="biitSAS" className="w-4/6" />
            </div>
            <h1 className="text-md text-green-600 font-semibold">
              Project Request
            </h1>
            <div className="border border-green-600 rounded w-5/6">
              <div className="flex flex-row space-x-4 justify-center">
                <label className="text-xs">Project-Title:</label>
                <b className="text-center text-xs font-semibold">
                  {choosedProject.title}
                </b>
              </div>
              <div className="flex flex-row space-x-4 justify-center">
                <label className="text-xs ">Supervisor:</label>
                <b className="text-center text-xs font-semibold">
                  {choosedProject.username}
                </b>
              </div>
              <div className="overflow-x mt-2 w-full">
                <Table responsive bordered hover>
                  <thead>
                    <tr className="bg-green-600 text-white">
                      <th className="px-2 py-1 text-center text-xs font-semibold">
                        Full Name
                      </th>
                      <th className="px-2 py-1 text-center text-xs font-semibold">
                        Arid-Number
                      </th>
                      <th className="px-2 py-1 text-center text-xs font-semibold">
                        Technology
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myGroupDetails?.map((item, index) => (
                      <tr className="bg-gray-300 hover:bg-gray-400" key={index}>
                        <td className="px-6 py-4 text-xs">{item.name}</td>
                        <td className="px-6 py-4 text-xs">{item.regNo}</td>
                        <td className="px-6 py-4 text-xs">{item.technology}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="flex flex-row justify-between space-x-3 items-center">
              <button
                className="bg-black text-white  text-center p-2 rounded hover:bg-transparent hover:text-black transition-all border border-black text-xs"
                onClick={() => {
                  setShowProjectPage((curr) => !curr);
                }}
              >
                Discard
              </button>
              <button
                className="bg-green-600 text-white text-center p-2 rounded cursor-pointer hover:bg-white hover:text-green-600 border border-green-600 text-xs"
                onClick={handlePostedRequest}
              >
                Request
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProjectRequesting;
