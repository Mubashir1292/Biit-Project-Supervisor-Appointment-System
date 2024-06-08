import React, { useEffect, useState } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { Accordion, Button } from "react-bootstrap";
import Dropdown from "../../../components/dropdown/Dropdown";

function GroupRequests() {
  const [genericProject, setGenericProject] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [listOfSupervisors, setListOfSupervisors] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState({});
  const [supervisorGroups, setSupervisorGroups] = useState([]);
  const handleSupervisorSelect = (option) => {
    setSelectedSupervisor(option);
    fetchGroupsRelatedToSupervisors(option);
  };

  //   projectTitle: "Ai Health Engine",
  //   groupCGPA: 2.9,
  //   projectDescription: "Health Care of the People",
  //   groupMembers: [
  //     {
  //       regNo: "2020-Arid-3675",
  //       name: "Mubashir Liaqat",
  //       Technology: "React-Js",
  //       Cgpa: 2.9,
  //       semester: "BSCS8",
  //       section: "A",
  //       grade: "B",
  //       image: man2,
  //     },
  //     {
  //       regNo: "2020-Arid-4224",
  //       name: "Touseef Sajjad",
  //       Technology: "Flutter",
  //       Cgpa: 2.9,
  //       semester: "BSCS8",
  //       section: "A",
  //       grade: "A",
  //       image: man,
  //     },
  //     {
  //       regNo: "2020-Arid-3677",
  //       name: "Usama Ijaz",
  //       Technology: "React-Native",
  //       Cgpa: 2.9,
  //       semester: "BSCS8",
  //       section: "A",
  //       grade: "B",
  //       image: man,
  //     },
  //   ],
  // });
  const [tableHeadings, setTableHeading] = useState([
    "Reg#",
    "Name",
    "Technology",
    "CGPA",
    "Semester",
    "Section",
    "Grade",
  ]);

  const fetchAvailableSupervisors = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/AvailiableSuperivsors`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setListOfSupervisors(result);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllGenericProjectRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/AllGenericProjectRequests`
      );
      const result = await response.json();
      console.log(result);

      if (Array.isArray(result)) {
        setGenericProject(result);
        setErrorMessage(""); // Clear any previous error messages
      } else {
        setErrorMessage(result); // Set error message if the result is not an array
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while fetching data.");
    }
  };

  const fetchGroupsRelatedToSupervisors = async (teacher) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/SupervisorProjectFetching?sup_id=${teacher.label}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setSupervisorGroups(result);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproved = async (request) => {
    try {
      console.log(request);
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/AllocatedProject?req_id=${request.projectRequest}&project_id=${request.Project_Details.id}&group_id=${request.groupId}&teacher_id=${selectedSupervisor.label}&status=1`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      alert(result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRejected = async (request) => {
    try {
      console.log(request);
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/AllocatedProject?req_id=${request.projectRequest}&project_id=${request.Project_Details.id}&group_id=${request.groupId}&teacher_id=${selectedSupervisor.label}&status=0`
      );
      const result = await response.json();
      alert(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllGenericProjectRequests();
    fetchAvailableSupervisors();
  }, []);

  return (
    <React.Fragment>
      <div className="flex flex-col justify-center max-[320px]:w-[320px] items-center">
        <div className="flex flex-col justify-center items-center">
          <img
            src={BiitSAS}
            alt="Biit logo"
            className="max-[320px]:w-3/6 w-2/6"
          />
          <h2 className="text-md max-[320px]:text-sm text-green-500">
            Generic Project Request
          </h2>
        </div>
        {genericProject && genericProject.length > 0 ? (
          <>
            {errorMessage ? (
              <div className="text-red-500">{errorMessage}</div>
            ) : (
              <Accordion defaultActiveKey={0}>
                {genericProject &&
                  genericProject.map((request, index) => {
                    return (
                      <Accordion.Item
                        eventKey={index}
                        key={index}
                        className="min-[320px]:w-[320px]"
                      >
                        <Accordion.Header>
                          {request.Project_Details.title ||
                            "Generic Project Request"}
                        </Accordion.Header>
                        <Accordion.Body>
                          <Card className="max-[320px]:w-[320px]">
                            {/* group Image */}
                            <div className="w-full flex justify-center  items-center mb-3">
                              <Card.Body>
                                <Card.Title className="flex justify-center items-center space-x-3">
                                  <strong className="text-sm font-normal">
                                    Project Title:
                                  </strong>
                                  <span className="text-sm font-semibold">
                                    {request.Project_Details.title}
                                  </span>
                                </Card.Title>
                                <Card.Text className="text-center text-xs">
                                  {request.Project_Details.description}
                                </Card.Text>
                                <Card.Subtitle className="flex justify-center items-center space-x-2">
                                  <span className="text-sm">Group CGPA :</span>
                                  <span className="text-sm">
                                    {request.groupAvgCgpa.toFixed(2)}
                                  </span>
                                </Card.Subtitle>
                              </Card.Body>
                            </div>
                            <Table responsive bordered hover>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  {tableHeadings.map((item, index) => (
                                    <th
                                      key={index}
                                      className="text-sm max-[320px]:text-xs font-semibold"
                                    >
                                      {item}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {request.groupDetails.map((item, index) => (
                                  <tr key={index} className="cursor-default">
                                    <td>{index + 1}</td>
                                    <td className="text-xs">{item.st_id}</td>
                                    <td className="text-xs">{item.name}</td>
                                    <td className="text-xs">
                                      {item.technology}
                                    </td>
                                    <td className="text-xs">{item.cgpa}</td>
                                    <td className="text-xs">{item.grade}</td>
                                    <td className="text-xs">{item.semester}</td>
                                    <td className="text-xs">{item.section}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                            <div className="min-[320px]:w-[320px]">
                              <h4 className="text-center">
                                Available Supervisor
                              </h4>
                              <div className="flex justify-around items-center">
                                <label htmlFor="Supervisor">
                                  Select Supervisor:
                                </label>
                                <Dropdown
                                  label="Select Supervisor"
                                  options={listOfSupervisors}
                                  value={selectedSupervisor}
                                  OnSelect={handleSupervisorSelect}
                                  className="relative w-6/12 text-md"
                                />
                              </div>
                              <div className="flex justify-around items-center mt-2">
                                <label>Allocated Groups:</label>
                                <h4>
                                  {(supervisorGroups &&
                                    supervisorGroups.length) ||
                                    0}
                                </h4>
                              </div>
                            </div>

                            <div className="flex justify-center items-center space-x-3 mt-2 mb-2">
                              <Button
                                variant="success"
                                onClick={() => {
                                  handleApproved(request);
                                }}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={() => {
                                  handleRejected(request);
                                }}
                              >
                                Reject
                              </Button>
                            </div>
                          </Card>
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  })}
              </Accordion>
            )}
          </>
        ) : (
          <>
            <span>No Request Founded</span>
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default GroupRequests;
