import React, { useState, useEffect } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import man from "../../../assets/extra/man.png";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import PersonalProgress from "../../../components/Modals/BootstrapModal/PersonalProgress";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function TaskList() {
  const [studentModal, setStudentModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState();
  const [tasks, setTasks] = useState([]);
  const [membersInfo, setMembersInfo] = useState([]);

  useEffect(() => {
    const tasksList = [
      {
        label: 3,
        group: "BIIT Project Supervisor Appointment System",
        value: "ERD Completion",
        dueDate: "2024-05-06",
      },
    ];
    setTasks(tasksList);
  }, []);

  // const handleModalToggle = () => {
  //   setStudentModal(!studentModal);
  // const initialMembersInfo = option.groupsMembers.map((member) => ({
  //   id: member.id,
  //   name: member.name,
  //   status: false,
  //   comments: "",
  // }));
  // setMembersInfo(initialMembersInfo);

  return (
    <React.Fragment>
      <div className="flex flex-col">
        <img src={BiitSAS} alt="BiitSAS" className="self-center w-8/12" />
        <h3 className="text-green-500 text-2xl text-center">Task List</h3>
        <Container className="mt-4">
          {/* <div className="w-5/6 mt-3 mx-auto">
              <SkeletonTheme highlightColor="#05B05B">
                <Skeleton count={10} />
              </SkeletonTheme>
            </div>           */}
          <React.Fragment>
            <Row className="mt-3">
              <Col
                md={{ span: 3, offset: 1 }}
                className="h-max p-2 bg-gray-50 rounded"
              >
                <h5>To-do({tasks.length})</h5>
                <div className="bg-gray-200 w-full h-max px-2 py-2 rounded flex flex-col space-y-2 justify-start overflow-auto">
                  {tasks.map((item, index) => (
                    <Card className="w-full" key={index}>
                      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                      <Card.Body>
                        <div className="flex justify-between items-center">
                          <Card.Title className="text-[10px] font-normal">
                            <span className="text-[17px]">Complete Pitch</span>
                          </Card.Title>
                          <span className="text-[10px] ">2024-05-06</span>
                        </div>
                        {/* <ProgressBar
                          now={60}
                          label={`${60}%`}
                          variant="success"
                        /> */}
                        <Card.Text>
                          <span className="text-[10px]">Pitch and Demo</span>
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="border-0 flex justify-end items-center space-x-1">
                        <img
                          src={man}
                          alt="man"
                          className="w-[20px] border-2 rounded-lg cursor-pointer hover:border-green-500"
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
                className="h-max p-2 bg-gray-50 rounded my-2 "
              >
                <h5>Doing({tasks.length})</h5>
                <div className="bg-gray-200 w-full h-max px-2 py-2 rounded flex flex-col space-y-2 justify-start overflow-auto">
                  {tasks.map((item, index) => (
                    <Card className="w-full" key={index}>
                      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                      <Card.Body>
                        <div className="flex justify-between items-center">
                          <Card.Title className="text-[10px] font-normal">
                            <span className="text-[17px]">
                              Complete Screens
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
                            Complete Erd Within the dueDate
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
                className="h-max bg-gray-50 rounded my-2"
              >
                <h5>Done({tasks.length})</h5>
                <div className="bg-gray-200 w-full h-max px-2 py-2 rounded flex flex-col space-y-2 justify-start overflow-auto">
                  {tasks.map((item, index) => (
                    <Card className="w-full" key={index}>
                      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                      <Card.Body>
                        <div className="flex justify-between items-center">
                          <Card.Title className="text-[10px] font-normal">
                            <span className="text-[17px]">Figma Designs</span>
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
                            Complete Figma Screens and Apis..
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

export default TaskList;
