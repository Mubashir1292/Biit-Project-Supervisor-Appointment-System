import React, { useState, useEffect } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import { Button } from "react-bootstrap";

function Requests() {
  const userString = localStorage.getItem("user");
  const userFounded = userString ? JSON.parse(userString) : null;
  const [groupDetail, setGroupDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableHeadings] = useState([
    "Reg#",
    "Name",
    "Technology",
    "CGPA",
    "Semester",
    "Section",
    "Grade",
  ]);
  const handleSubmit = async (id) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/PSAS_Supervisor_Expert/RespondingToRequest?req_id=${id}&status=1`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result) {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllGroupRequestsForProjects = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/Psas_Supervisor_Expert/ProjectRequests?teacher_id=${parseInt(
          userFounded.uid
        )}`
      );
      const result = await response.json();
      if (result) {
        console.log(result);
        setGroupDetail(result);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAllGroupRequestsForProjects();
  }, []);

  return (
    <React.Fragment>
      <div className="flex flex-col xl:w-full lg:w-full justify-center items-center min-[320px]:w-[320px] box-border">
        <div className="flex flex-col justify-center items-center">
          <img
            src={BiitSAS}
            alt="Biit SAS"
            className="max-[320px]:w-3/6 w-5/6"
          />
          <h3 className="text-green-500">Project Requests</h3>
        </div>
        {!loading ? (
          groupDetail && groupDetail.length > 1 ? (
            <Accordion defaultActiveKey={0}>
              {groupDetail.map((group, index) => (
                <Accordion.Item
                  eventKey={index}
                  key={index}
                  className="min-[320px]:w-[320px]"
                >
                  <Accordion.Header>
                    {group.projectDetails[index].title}
                  </Accordion.Header>
                  <Accordion.Body>
                    <Card className="w-full">
                      <Card.Body>
                        <Card.Title className="text-center text-sm">
                          {group.projectDetails[index].title}
                        </Card.Title>
                        <Card.Text className="text-center text-xs">
                          {group.projectDetails[index].description}
                        </Card.Text>
                        <Card.Subtitle className="flex justify-center items-center space-x-2">
                          <span className="text-sm">Group CGPA :</span>
                          <span className="text-sm">
                            {group.groupDetails[index].avgCgpa.toFixed(2)}
                          </span>
                        </Card.Subtitle>
                        <Table responsive bordered hover className="w-3/6">
                          <thead>
                            <tr>
                              <th>#</th>
                              {tableHeadings.map((item, index) => (
                                <th key={index}>{item}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {group.groupMembers[index].map(
                              (member, memberIndex) => (
                                <tr
                                  key={memberIndex}
                                  className="cursor-default"
                                >
                                  <td>{memberIndex + 1}</td>
                                  <td>{member.st_id}</td>
                                  <td>{member.name}</td>
                                  <td>{member.technology}</td>
                                  <td>{member.cgpa}</td>
                                  <td>{member.semester}</td>
                                  <td>{member.section}</td>
                                  <td>{member.grade}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </Table>
                      </Card.Body>
                      <div className="flex justify-center items-center space-x-3 mt-0 mb-2">
                        <Button
                          variant="success"
                          onClick={() => {
                            handleSubmit(group.requestDetails[index].req_id);
                          }}
                        >
                          Accept
                        </Button>
                        <Button variant="secondary">Reject</Button>
                      </div>
                    </Card>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          ) : (
            <span>No Requests Founded</span>
          )
        ) : (
          <>
            <span>No Projects Founded</span>
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default Requests;
