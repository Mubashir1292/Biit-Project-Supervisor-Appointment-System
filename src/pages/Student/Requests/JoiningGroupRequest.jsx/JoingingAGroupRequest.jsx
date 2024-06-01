import React, { useEffect, useState } from "react";
import BiitSAS from "../../../../assets/extra/biitSAS.png";
import Dropdown from "../../../../components/dropdown/Dropdown";
import Table from "react-bootstrap/Table";
function JoingingAGroupRequest() {
  const [isGroupDetailsShown, setIsGroupDetailsShown] = useState(false);
  const [choosedProject, setChoosedProject] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [message, setMessage] = useState("");
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const userString = localStorage.getItem("user");
  const [projectDetails, setProjectDetails] = useState(null);
  const [groupDetails, setGroupDetails] = useState([]);
  const user = userString ? JSON.parse(userString) : null;
  const handleSelect = (option) => {
    setSelectedDomain(option);
  };

  //*getting all domains
  const gettingAllProjectDomains = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.4/OfficialPSAS/api/psas/FillingDropDown`
      );
      const data = await response.json();
      console.log(data);
      if (data !== null) {
        setDomains(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gettingAllProjectDomains();
  }, []);
  //*finding the project which not have the This technology Member
  const getGroupsOnTechnologyBase = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.4/OfficialPSAS/api/psas/GroupsFetching?techName=${selectedDomain.value}&regNo=${user.uid}`
      );
      const data = await response.json();
      if (data !== "not Founded") {
        setSelectedProjects(data);
      } else {
        setSelectedProjects([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //! calling the function when the domains changed
  useEffect(() => {
    getGroupsOnTechnologyBase();
  }, [selectedDomain]);

  const handleProjectTitle = (option) => {
    setChoosedProject(option);
    setDescription(option.description);
    console.log(option);
  };
  const ToggleGroupDetails = () => {
    if (choosedProject) {
      setIsGroupDetailsShown((curr) => !curr);
    } else {
      alert("Atleast one project must be selected");
    }
  };

  //* getting the group and project details
  const getDetailsAboutProjectAndGroup = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.4/OfficialPSAS/api/psas/GetTheDetails?group_id=${choosedProject.gid}&project_id=${choosedProject.pid}`
      );
      const data = await response.json();
      console.log(data);
      if (data !== null) {
        setProjectDetails(data);
        setGroupDetails(data.groupDetails);
        // console.log(data.groupDetails);
        console.log(projectDetails.findingProject.project.title);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePostingRequesting = async () => {
    const response = await fetch(
      `http://192.168.1.4/OfficialPSAS/api/psas/PostingRequestForGroupJoining?regNo=${user.uid}&gid=${choosedProject.gid}&tecid=${selectedDomain.label}&message=${message}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    // alert(data);
  };

  return (
    <>
      {!isGroupDetailsShown ? (
        <>
          <div className="flex flex-col w-full">
            <div className="flex justify-center">
              <img src={BiitSAS} alt="BiitSAS" className="w-5/6" />
            </div>
            <div className="flex justify-center">
              <h1 className="text-xl font-semibold text-green-500">
                Joining a Group
              </h1>
            </div>
            <div className="flex flex-row justify-center space-x-4 mt-2">
              <label className="text-sm">My Cgpa:</label>
              <b className="text-sm">{user.cgpa}</b>
            </div>
            <div className="flex flex-row justify-center items-center mt-3">
              <label className="text-sm">Select Technology:</label>
              <Dropdown
                options={domains}
                value={selectedDomain}
                OnSelect={handleSelect}
                className="relative w-6/12 text-sm"
              />
            </div>
            <div className="flex flex-col w-full h-full justify-center  items-center mt-3">
              <label className="text-sm">Offered Projects:</label>
              <Table
                data={selectedProjects}
                handleSelect={handleProjectTitle}
              />
            </div>
            <div className="flex flex-col w-full h-full justify-center space-x-1 items-center mt-2">
              <label className="text-sm">Project Details:</label>
              <textarea
                name="projectDetails"
                id="projectDetails"
                readOnly
                className="border border-gray-500 rounded w-9/12 h-32 p-2"
                value={description || ""}
              ></textarea>
            </div>
            <div className="flex flex-row justify-center items-center mt-3">
              <button
                className="bg-green-600 p-3 text-white rounded-md hover:bg-white border border-green-600 hover:text-green-600"
                onClick={() => {
                  ToggleGroupDetails();
                  getDetailsAboutProjectAndGroup();
                }}
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
              <img src={BiitSAS} alt="BiitSAS" className="w-8/12" />
            </div>
            <div className="flex flex-row justify-center items-center space-x-1 mt-3">
              <label className="text-xs">Project-Title :</label>
              <b className="text-xs">{choosedProject.title}</b>
            </div>
            <div className="flex flex-row justify-center items-center space-x-4 mt-3">
              <label className="text-xs">Supervisor :</label>
              <b className="text-xs">{choosedProject.username}</b>
            </div>
            <div className="overflow-auto mt-2 w-full">
              <Table responsive bordered hover>
                <thead>
                  <tr className="bg-green-600 text-white border">
                    <th className="px-2 py-1 text-left text-sm text-semibold">
                      Name
                    </th>
                    <th className="px-2 py-1 text-left text-sm text-semibold">
                      Arid#
                    </th>
                    <th className="px-2 py-1 text-left text-sm text-semibold">
                      Technology
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {groupDetails.map((item, index) => (
                    <tr className="bg-gray-300 hover:bg-gray-400" key={index}>
                      <td className="px-2 py-1 text-xs">{item.name}</td>
                      <td className="px-2 py-1 text-xs">{item.regNo}</td>
                      <td className="px-2 py-1 text-xs">{item.technology}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="flex flex-row justify-center items-center mt-3">
              <label>Message:</label>
              <textarea
                name="projectDetails"
                id="projectDetails"
                className="border border-gray-500 rounded w-8/12 h-20 p-2 text-xs"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-row mt-3 space-x-4">
              <button
                onClick={() => {
                  ToggleGroupDetails();
                }}
                className="bg-black text-white hover:bg-transparent hover:text-black border border-black transition-all ease-in-out p-1 rounded-md"
              >
                Discard
              </button>
              <button
                className="bg-green-600 text-white hover:bg-transparent hover:text-green-600 border border-green-600 transition-all ease-in-out p-1 rounded-md"
                onClick={handlePostingRequesting}
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

export default JoingingAGroupRequest;
