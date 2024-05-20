import React, { useState, useEffect } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import man from "../../../assets/extra/man.png";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import PersonalProgress from "../../../components/Modals/BootstrapModal/PersonalProgress";
import Dropdown from "../../../components/dropdown/Dropdown";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function GroupProgress() {
  const [semester, setSemester] = useState(7);
  const [selection, setSelection] = useState(null);
  const [studentModal, setStudentModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState();
  const [tasks, setTasks] = useState([]);
  const [membersInfo, setMembersInfo] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {}, []);
  const handleModalToggle = () => {
    setStudentModal(!studentModal);
  };

  const handleSemesterChange = (newSemester) => {
    setSemester(newSemester);
    setSelection(null);
  };
  useEffect(() => {
    const allgroups = [
      {
        label: 1,
        semester: 7,
        value: "AI Health Engine",
        groupsMembers: [
          { id: "2020-Arid-3675", name: "Mubashir Liaqat" },
          { id: "2020-Arid-4224", name: "Touseef Sajjad" },
          { id: "2020-Arid-4225", name: "Faheem Abbas" },
        ],
      },
      {
        label: 2,
        semester: 7,
        value: "BIIT Career Counsling",
        groupsMembers: [
          { id: "2020-Arid-3675", name: "Mubashir Liaqat" },
          { id: "2020-Arid-4224", name: "Touseef Sajjad" },
          { id: "2020-Arid-4225", name: "Faheem Abbas" },
        ],
      },
      {
        label: 5,
        semester: 8,
        value: "BIIT Project Supervisor Appointment System",
        groupsMembers: [
          { id: "2020-Arid-3675", name: "Mubashir Liaqat" },
          { id: "2020-Arid-4224", name: "Touseef Sajjad" },
          { id: "2020-Arid-4225", name: "Faheem Abbas" },
        ],
      },
      {
        label: 6,
        semester: 8,
        value: "BIIT Meeting Management System",
        groupsMembers: [
          { id: "2020-Arid-3675", name: "Mubashir Liaqat" },
          { id: "2020-Arid-4224", name: "Touseef Sajjad" },
          { id: "2020-Arid-4225", name: "Faheem Abbas" },
        ],
      },
    ];

    const filteredGroups = allgroups.filter(
      (item) => item.semester === semester
    );
    setGroups(filteredGroups);
  }, [semester]);

  const handleSelect = (option) => {
    setSelection(option);
    const tasksList = [
      {
        label: 1,
        group: "BIIT Meeting Management System",
        value: "ERD Completion",
        dueDate: "2024-05-06",
      },
      {
        label: 2,
        group: "BIIT Meeting Management System",
        value: "ERD Completion",
        dueDate: "2024-05-06",
      },
      {
        label: 3,
        group: "BIIT Project Supervisor Appointment System",
        value: "ERD Completion",
        dueDate: "2024-05-06",
      },
      {
        label: 4,
        group: "BIIT Career Counsling",
        value: "ERD Completion",
        dueDate: "2024-05-06",
      },
      {
        label: 5,
        group: "BIIT Career Counsling",
        value: "ERD Completion",
        dueDate: "2024-05-06",
      },
    ];
    const filterTaskGroup = tasksList.filter(
      (item) => item.group === option.value
    );
    setTasks(filterTaskGroup);
    const initialMembersInfo = option.groupsMembers.map((member) => ({
      id: member.id,
      name: member.name,
      status: false,
      comments: "",
    }));
    setMembersInfo(initialMembersInfo);
  };

  return (
    <React.Fragment>
      <div className="flex flex-col">
        <img src={BiitSAS} alt="BiitSAS" className="self-center w-3/12" />
        <Container className="mt-4">
          <Row>
            <Col>
              <div className="flex justify-center">
                <h6
                  className={`cursor-pointer ${
                    semester === 7
                      ? "bg-green-500 text-white font-bold"
                      : "bg-white text-black hover:bg-green-400 hover:text-gray-500"
                  } px-28 py-2 transition-all border-b border-gray-400 rounded-sm`}
                  onClick={() => handleSemesterChange(7)}
                >
                  Fyp-01
                </h6>
                <h6
                  className={`cursor-pointer ${
                    semester === 8
                      ? "bg-green-500 text-white font-bold"
                      : "bg-white text-black hover:bg-green-400 hover:text-gray-500"
                  } px-28 py-2 border-b border-gray-400 transition-all rounded-sm`}
                  onClick={() => handleSemesterChange(8)}
                >
                  Fyp-02
                </h6>
              </div>
              <div className="flex justify-center space-x-5 items-center">
                <span>Select Group:</span>
                <Dropdown
                  options={groups}
                  value={selection}
                  OnSelect={handleSelect}
                  className="relative w-max cursor-default"
                />
              </div>
            </Col>
          </Row>
          {!selection ? (
            <div className="w-5/6 mt-3 mx-auto">
              <SkeletonTheme highlightColor="#05B05B">
                <Skeleton count={10} />
              </SkeletonTheme>
            </div>
          ) : (
            <React.Fragment>
              <Row className="mt-3">
                <Col
                  md={{ span: 3, offset: 1 }}
                  className="h-[450px] bg-gray-50 rounded"
                >
                  <h5>To-do(3)</h5>
                  <div className="bg-gray-200 w-full h-full px-2 py-2 rounded flex flex-col space-y-2 justify-start overflow-auto">
                    {tasks.map((item, index) => (
                      <Card className="w-full" key={index}>
                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                        <Card.Body>
                          <div className="flex justify-between items-center">
                            <Card.Title className="text-[10px] font-normal">
                              <span className="text-[17px]">Task Title</span>
                            </Card.Title>
                            <span className="text-[10px] ">2024-05-06</span>
                          </div>
                          <ProgressBar
                            now={60}
                            label={`${60}%`}
                            variant="success"
                          />
                          <Card.Text>
                            <span className="text-[10px]">
                              Task Descriptions
                            </span>
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer className="border-0 flex justify-end items-center space-x-1">
                          <img
                            src={man}
                            alt="man"
                            className="w-[20px] border-2 rounded-lg cursor-pointer hover:border-green-500"
                            onClick={handleModalToggle}
                          />
                          <img src={man} alt="man" className="w-[17px]" />
                          <img src={man} alt="man" className="w-[17px]" />
                          <img src={man} alt="man" className="w-[17px]" />
                        </Card.Footer>
                      </Card>
                    ))}
                  </div>
                </Col>
                <Col
                  md={{ span: 3, offset: 1 }}
                  className="h-[450px] bg-gray-50 rounded "
                >
                  <h5>Doing(4)</h5>
                  <div className="bg-gray-200 w-full h-full px-2 py-2 rounded flex flex-col space-y-2 justify-start overflow-auto">
                    {tasks.map((item, index) => (
                      <Card className="w-full" key={index}>
                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                        <Card.Body>
                          <div className="flex justify-between items-center">
                            <Card.Title className="text-[10px] font-normal">
                              <span className="text-[17px]">Task Title</span>
                            </Card.Title>
                            <span className="text-[10px] ">2024-05-06</span>
                          </div>
                          <ProgressBar
                            now={60}
                            label={`${60}%`}
                            variant="success"
                          />
                          <Card.Text>
                            <span className="text-[10px]">
                              Task Descriptions
                            </span>
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer className="border-0 flex justify-end items-center space-x-1">
                          <img src={man} alt="man" className="w-[17px]" />
                          <img src={man} alt="man" className="w-[17px]" />
                          <img src={man} alt="man" className="w-[17px]" />
                          <img src={man} alt="man" className="w-[17px]" />
                        </Card.Footer>
                      </Card>
                    ))}
                  </div>
                </Col>
                <Col
                  md={{ span: 3, offset: 1 }}
                  className="h-[450px] bg-gray-50 rounded "
                >
                  <h5>Done(3)</h5>
                  <div className="bg-gray-200 w-full h-full px-2 py-2 rounded flex flex-col space-y-2 justify-start overflow-auto">
                    {tasks.map((item, index) => (
                      <Card className="w-full" key={index}>
                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                        <Card.Body>
                          <div className="flex justify-between items-center">
                            <Card.Title className="text-[10px] font-normal">
                              <span className="text-[17px]">Task Title</span>
                            </Card.Title>
                            <span className="text-[10px] ">2024-05-06</span>
                          </div>
                          <ProgressBar
                            now={60}
                            label={`${60}%`}
                            variant="success"
                          />
                          <Card.Text>
                            <span className="text-[10px]">
                              Task Descriptions
                            </span>
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer className="border-0 flex justify-end items-center space-x-1">
                          <img src={man} alt="man" className="w-[17px]" />
                          <img src={man} alt="man" className="w-[17px]" />
                          <img src={man} alt="man" className="w-[17px]" />
                          <img src={man} alt="man" className="w-[17px]" />
                        </Card.Footer>
                      </Card>
                    ))}
                  </div>
                </Col>
              </Row>
            </React.Fragment>
          )}
        </Container>
      </div>
      {studentModal ? (
        <>
          <PersonalProgress
            show={studentModal}
            onHide={() => setStudentModal(false)}
            student={selectedProfile}
          />
        </>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}

export default GroupProgress;
