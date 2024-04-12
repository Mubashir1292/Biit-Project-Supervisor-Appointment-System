import React, { useState, useEffect } from "react";
import biitSAS from "../../../assets/extra/biitSAS.png";
import Dropdown from "../../../components/dropdown/Dropdown";
import Table from "../../../components/Table/Table";

// import GroupDetails from "../../../components/Modals/CreateGroupModal/CreateGroupModal";
function ProjectRequesting() {
  const [showProjectPage, setShowProjectPage] = useState(false);
  const [choosedProject, setChoosedProject] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selection, setSelection] = useState(null);
  const [options, setOptions] = useState([]);
  // const options = [
  //   { label: "Artificial Intelligence", value: "Artificial Intelligence" },
  //   { label: "Software Engineering", value: "Software Engineering" },
  //   { label: "Networking Management", value: "Networking Management" },
  //   { label: "Database Management", value: "Database Management" },
  // ];
  const handleGetOptions = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.11/OfficialPSAS/api/psas/AllDomains"
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
  const handleSelect = (option) => {
    setSelection(option);
    console.log(option);
    if (option.value === "Artifical Intelligence") {
      const projects = data.filter((i) => i.domain === 1);
      setSelectedProjects(projects);
    } else {
      setSelectedProjects([]);
    }
  };
  const handleProjectTitle = (option) => {
    setChoosedProject(option);
    console.log(option);
  };
  const handleNavigation = () => {
    if (choosedProject) {
      setShowProjectPage((curr) => !curr);
    } else {
      alert("Select any project");
    }
  };
  return (
    <>
      {!showProjectPage ? (
        <>
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-center items-center pt-2">
              <img src={biitSAS} alt="BiitPSAS" className="w-3/12" />
            </div>

            <div className="w-full flex flex-col justify-center items-center pt-2 space-y-2 ">
              <h1 className="text-green-600 font-bold -mt-2 text-2xl cursor-default hover:text-green-500">
                Project Selection and Requesting
              </h1>
              <p className="font-normal text-lg ">
                Your Group CGPA :
                <span className="font-bold ml-3 border-b border-b-black">
                  2.74
                </span>
              </p>
              <div className="flex flex-row w-full h-full justify-center  space-x-10 items-center">
                <label className="text-xl">Select Domain :</label>
                <Dropdown
                  options={options}
                  value={selection}
                  OnSelect={handleSelect}
                  className="relative w-3/12 text-lg"
                />
              </div>
              <div className="flex flex-row w-full h-full justify-center space-x-8 items-center">
                <label className="text-xl">Offered Projects :</label>
                <Table
                  data={selectedProjects}
                  handleSelect={handleProjectTitle}
                />
              </div>
              <div className="flex flex-row w-full h-full justify-center space-x-8 items-center mt-2">
                <label className="text-xl">Project Details :</label>
                <textarea
                  name="projectDetails"
                  id="projectDetails"
                  readOnly
                  className="border border-gray-500 rounded xl:w-3/12 xl:min-h-28 lg:w-3/12 lg:h-max p-2"
                  value={choosedProject.desc}
                ></textarea>
              </div>
              <div className="flex flex-row justify-center items-center w-full relative">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white hover:font-bold hover:border hover:border-green-600 w-auto px-4 py-2  rounded ml-20"
                  onClick={handleNavigation}
                >
                  Next
                </button>
                {/* <GroupDetails
              modal={showModal}
              setModal={setShowModal}
              projectTitle={choosedProject}
            /> */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-start items-center space-y-8">
            <div className="w-2/6 h-1/6">
              <img src={biitSAS} alt="biitSAS" className="w-full" />
            </div>
            <h1 className="text-2xl text-green-600 font-semibold">
              Project Request
            </h1>
            <div className="border-2 border-green-600 rounded-xl w-7/12 p-4">
              <div className="flex flex-row space-x-4 justify-center">
                <label>Project-Title:</label>
                <b className="text-center">{choosedProject.title}</b>
              </div>
              <div className="flex flex-row space-x-4 justify-center">
                <label>Supervisor:</label>
                <b className="text-center">{choosedProject.supervisor}</b>
              </div>
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
            <div className="flex flex-row justify-between space-x-3 items-center">
              <button className="bg-black text-white  text-center p-2 rounded hover:bg-transparent hover:text-black transition-all border border-black ">
                Discard
              </button>
              <button className="bg-green-600 text-white text-center p-2 rounded cursor-pointer hover:bg-white hover:text-green-600 border border-green-600 ">
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
// SliderNavigation.js

// export const SliderNavigation = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();
//   const nextPage = () => {
//     setCurrentPage(2);
//     navigate("/student/ProjectSelection");
//   };

//   const prevPage = () => {
//     setCurrentPage(1);
//     navigate("/student/ProjectRequesting");
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="w-full max-w-lg">
//         <div className="relative">
//           <div className="overflow-hidden w-full">
//             <div
//               className={`flex transition-transform duration-500 ease-in-out transform ${
//                 currentPage === 1 ? "translate-x-0" : "-translate-x-full"
//               }`}
//             >
//               <div className="w-full flex-shrink-0 p-4">
//                 <ProjectRequesting />
//                 <button
//                   onClick={nextPage}
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Next
//                 </button>
//               </div>
//               <div className="w-full flex-shrink-0 p-4">
//                 <h1 className="text-2xl font-bold mb-4">Page 2 Content</h1>
//                 <button
//                   onClick={prevPage}
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Previous
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
