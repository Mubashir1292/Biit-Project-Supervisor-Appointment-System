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
  const [todoTasks, setTodoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [membersInfo, setMembersInfo] = useState([]);
  const [groups, setGroups] = useState([]);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  useEffect(() => {
    if (tasks.length > 0) {
      const todo = tasks.filter((task) => task.status === 0);
      const doing = tasks.filter((task) => task.status === 1);
      const done = tasks.filter((task) => task.status === 2);

      setTodoTasks(todo);
      setDoingTasks(doing);
      setDoneTasks(done);
    }
  }, [tasks]);

  const handleModalToggle = () => {
    setStudentModal(!studentModal);
  };

  const fetchTheRelativeGroupsOnSemeterBasis = async (sem) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/Psas_Supervisor_Expert/getAllGroups?semester=${sem}&teacher_id=${user.uid}`
      );
      const result = await response.json();
      if (result) {
        setGroups(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSemesterChange = (newSemester) => {
    setSemester(newSemester);
    setSelection(null);
    fetchTheRelativeGroupsOnSemeterBasis(newSemester);
  };
  const fetchAllTasksRelatedToGroup = async (group) => {
    try {
      console.log(group);
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/Psas_Supervisor_Expert/getAllTasks?gid=${group.label}`
      );
      const result = await response.json();
      if (result) {
        setTasks(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllTasksRelatedToGroup(selection);
  }, [selection]);
  const handleSelect = (option) => {
    setSelection(option);

    // const tasksList = [
    //   {
    //     label: 5,
    //     group: "BIIT Career Counsling",
    //     value: "ERD Completion",
    //     dueDate: "2024-05-06",
    //   },
    // ];
    // const filterTaskGroup = tasksList.filter(
    //   (item) => item.group === option.value
    // );
    // setTasks(filterTaskGroup);
    // const initialMembersInfo = option.groupsMembers.map((member) => ({
    //   id: member.id,
    //   name: member.name,
    //   status: false,
    //   comments: "",
    // }));
    // setMembersInfo(initialMembersInfo);
  };

  return (
    <React.Fragment>
      <div className="flex flex-col">
        <img
          src={BiitSAS}
          alt="BiitSAS"
          className="self-center max-[320px]:w-7/12 w-3/12"
        />
        <Container className="mt-4">
          <Row>
            <Col>
              <div className="flex justify-center">
                <h6
                  className={`cursor-pointer ${
                    semester === 7
                      ? "bg-green-500 text-white font-bold text-sm"
                      : "bg-white text-black hover:bg-green-400 hover:text-gray-500 text-sm"
                  } px-8 py-2 transition-all border-b border-gray-400 rounded-sm`}
                  onClick={() => handleSemesterChange(7)}
                >
                  Fyp-01
                </h6>
                <h6
                  className={`cursor-pointer ${
                    semester === 8
                      ? "bg-green-500 text-white font-bold text-sm"
                      : "bg-white text-black hover:bg-green-400 hover:text-gray-500 text-sm"
                  } px-8 py-2 border-b border-gray-400 transition-all rounded-sm`}
                  onClick={() => handleSemesterChange(8)}
                >
                  Fyp-02
                </h6>
              </div>
              <div className="flex justify-center  items-center">
                <span className="text-sm">Select Group:</span>
                <Dropdown
                  options={groups}
                  value={selection}
                  OnSelect={handleSelect}
                  className="relative w-max cursor-default text-[9px]"
                />
              </div>
            </Col>
          </Row>
          {!selection ? (
            <div className="w-5/6 mt-3 mx-auto">
              <SkeletonTheme highlightColor="#05B05B">
                <Skeleton count={4} />
              </SkeletonTheme>
            </div>
          ) : (
            <React.Fragment>
              <Row className="mt-3">
                <Col
                  md={{ span: 3, offset: 1 }}
                  className="h-max bg-gray-50 rounded"
                >
                  <h5>To-do({todoTasks.length})</h5>
                  <div className="bg-gray-200 w-full h-max px-2 py-2 rounded flex flex-col space-y-2 justify-start overflow-auto">
                    {todoTasks.length > 0 &&
                      todoTasks.map((item, index) => (
                        <Card className="w-full" key={index}>
                          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                          <Card.Body>
                            <div className="flex justify-between items-center">
                              <Card.Title className="text-[10px] font-normal">
                                <span className="text-[17px]">
                                  Complete ERD
                                </span>
                              </Card.Title>
                              <span className="text-[10px] ">2024-05-06</span>
                            </div>
                            {/* <ProgressBar
                            now={60}
                            label={`${60}%`}
                            variant="success"
                          /> */}
                            <Card.Text>
                              <span className="text-[10px]">
                                Complete Erd With All Conditions
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
                  className="h-max bg-gray-50 rounded "
                >
                  <h5>Doing({doingTasks.length})</h5>
                  <div className="bg-gray-200 w-full h-max px-2 py-2 rounded flex flex-col space-y-2 justify-start overflow-auto">
                    {doingTasks.length &&
                      doingTasks.map((item, index) => (
                        <Card className="w-full" key={index}>
                          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                          <Card.Body>
                            <div className="flex justify-between items-center">
                              <Card.Title className="text-[10px] font-normal">
                                <span className="text-[17px]">
                                  Complete Figma Screens
                                </span>
                              </Card.Title>
                              <span className="text-[10px] ">2024-05-06</span>
                            </div>
                            {/* <ProgressBar
                            now={60}
                            label={`${60}%`}
                            variant="success"
                          /> */}
                            <Card.Text>
                              <span className="text-[10px]">
                                Complete Screens in Figma
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
                  className="h-max bg-gray-50 rounded "
                >
                  <h5>Done({doneTasks.length})</h5>
                  <div className="bg-gray-200 w-full h-max px-2 py-2 rounded flex flex-col space-y-2 justify-start overflow-auto">
                    {doneTasks.length > 0 &&
                      doneTasks.map((item, index) => (
                        <Card className="w-full" key={index}>
                          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                          <Card.Body>
                            <div className="flex justify-between items-center">
                              <Card.Title className="text-[10px] font-normal">
                                <span className="text-[17px]">
                                  Complete Pitch
                                </span>
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
                                Complete Pitch with all other Requirments
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
