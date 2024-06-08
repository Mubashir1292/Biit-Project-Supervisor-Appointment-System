import React, { useState, useEffect } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import { Accordion, Button } from "react-bootstrap";
function JoinToGroup() {
  const [errorMessage, setErrorMessage] = useState("No Request Founded");
  const [allRequests, setAllRequests] = useState([]);
  const [tableHeadings, setTableHeading] = useState([
    "Reg#",
    "Name",
    "Technology",
    "CGPA",
    "Semester",
    "Section",
    "Grade",
  ]);
  const fetchAllStudentRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/allStudentRequestsForGroupJoining`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setAllRequests(result);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllStudentRequests();
  }, []);
  const handleSubmit = async (request, status) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/AddStudentToGroup?req_id=${request.requestDetails.message_id}&st_id=${request.requestDetails.student.student_id}&group_id=${request.requestDetails.group_id}&technology=${request.requestDetails.student.technology}&status=${status}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      alert(result);
      //! Remove the handled request from the state
      // const updatedRequests = allRequests.filter(
      //   (req) =>
      //     req.requestDetails.message_id !== request.requestDetails.message_id
      // );
      // setAllRequests(updatedRequests);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <img
            src={BiitSAS}
            alt="BiitSAS"
            classname="w-2/6 max-[320px]:w-1/6"
          />
          <h2 className="text-md font-normal text-green-500">Join To Group</h2>
        </div>
        {allRequests && allRequests.length > 0 ? (
          <>
            <Accordion defaultActiveKey={0}>
              {allRequests &&
                allRequests.map((request, index) => (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>
                      {request &&
                        request?.requestDetails?.student?.student_name}
                    </Accordion.Header>
                    <Accordion.Body>
                      <Card className="max-[320px]:w-[320px]">
                        <div className="flex flex-col justify-center items-center space-x-3">
                          <div className="w-full max-[320px]:w-[320px]">
                            <h4 className="text-lg text-center">
                              Student Details
                            </h4>
                            <Table
                              responsive
                              bordered
                              hover
                              className="max-[320px]:w-[320px]"
                            >
                              <thead>
                                <tr>
                                  <th>#</th>
                                  {tableHeadings.map((item, index) => (
                                    <th
                                      key={index}
                                      className="text-xs font-semibold"
                                    >
                                      {item}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  <tr className="cursor-default">
                                    <td></td>
                                    <td className="text-xs">
                                      {request &&
                                        request?.requestDetails?.student
                                          ?.student_id}
                                    </td>
                                    <td className="text-xs">
                                      {request &&
                                        request?.requestDetails?.student
                                          ?.student_name}
                                    </td>
                                    <td className="text-xs">
                                      {request &&
                                        request?.requestDetails?.student
                                          ?.technology}
                                    </td>
                                    <td className="text-xs">
                                      {request &&
                                        request?.requestDetails?.student?.cgpa}
                                    </td>
                                    <td className="text-xs">
                                      {request &&
                                        request?.requestDetails?.student
                                          ?.semester}
                                    </td>
                                    <td className="text-xs">
                                      {request &&
                                        request?.requestDetails?.student?.grade}
                                    </td>
                                    <td className="text-xs">
                                      {request &&
                                        request?.requestDetails?.student
                                          ?.section}
                                    </td>
                                  </tr>
                                }
                              </tbody>
                            </Table>
                          </div>
                          <Card.Body>
                            <h3 className="text-lg text-center">
                              Group Details
                            </h3>
                            <Card.Title className="flex justify-center item-center space-x-3">
                              <strong className="text-sm font-normal">
                                Supervisor:
                              </strong>
                              <span className="text-sm font-semibold">
                                {request &&
                                  request?.requestDetails?.teacher?.teacherName}
                              </span>
                            </Card.Title>
                            <Card.Title className="flex justify-center items-center space-x-3">
                              <strong className="text-sm font-normal">
                                Project Title:
                              </strong>
                              <span className="text-sm font-semibold">
                                {request &&
                                  request?.requestDetails?.teacher?.title}
                              </span>
                            </Card.Title>
                            <Card.Text className="text-center text-xs">
                              {request &&
                                request?.requestDetails?.teacher?.description}
                            </Card.Text>
                            <Card.Subtitle className="flex justify-center items-center space-x-2">
                              <span className="text-sm">Group CGPA :</span>
                              <span className="text-sm">
                                {request &&
                                  request?.requestDetails?.group_cgpa?.toFixed(
                                    2
                                  )}
                              </span>
                            </Card.Subtitle>
                          </Card.Body>
                        </div>
                        <Table
                          responsive
                          bordered
                          hover
                          className="max-[320px]:w-[320px]"
                        >
                          <thead>
                            <tr>
                              <th>#</th>
                              {tableHeadings.map((item, index) => (
                                <th
                                  key={index}
                                  className="text-xs font-semibold"
                                >
                                  {item}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {request &&
                              request?.groupMembersDetails?.map(
                                (item, index) => (
                                  <tr key={index} className="cursor-default">
                                    <td>{index + 1}</td>
                                    <td className="text-xs">{item?.st_id}</td>
                                    <td className="text-xs">{item?.name}</td>
                                    <td className="text-xs">
                                      {item?.technology}
                                    </td>
                                    <td className="text-xs">{item?.cgpa}</td>
                                    <td className="text-xs">{item?.grade}</td>
                                    <td className="text-xs">
                                      {item?.semester}
                                    </td>
                                    <td className="text-xs">{item?.section}</td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </Table>
                        <div className="flex justify-center items-center space-x-3 mt-0 mb-2">
                          <Button
                            variant="success"
                            onClick={() => {
                              handleSubmit(request, 1);
                            }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => {
                              handleSubmit(request, 0);
                            }}
                          >
                            Reject
                          </Button>
                        </div>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
            </Accordion>
          </>
        ) : (
          <span>No Requests Founded</span>
        )}
      </div>
    </React.Fragment>
  );
}

export default JoinToGroup;
