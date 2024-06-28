import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import BiitSAS from "../../../assets/extra/biitSAS.png";

function SupervisorRequests() {
  const [allsupervisingRequests, setAllSupervisingRequests] = useState([]);

  const handleSubmit = async (request, status) => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas/AllocateProjectToSupervisor?requestId=${request.projectDetails.req_id}&status=${status}`,
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

  const fetchAllSupervisingRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost/OfficialPSAS/api/psas_Supervisor_Expert/AllSupervisingRequests`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setAllSupervisingRequests(result);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllSupervisingRequests();
  }, []);

  const [tableHeadings, setTableHeading] = useState([
    "Reg#",
    "Name",
    "Technology",
    "CGPA",
    "Semester",
    "Section",
    "Grade",
  ]);

  return (
    <React.Fragment>
      <div className="flex flex-col max-[320px]:w-[320px] justify-center items-center">
        <img src={BiitSAS} alt="Biit SAS" />
        {allsupervisingRequests && allsupervisingRequests.length > 0 ? (
          <>
            {allsupervisingRequests?.map((request, index) => (
              <Card className="max-[320px]:w-[320px]" key={index}>
                <div className="flex justify-center items-center">
                  <Card.Body>
                    <Card.Title className="flex justify-center item-center space-x-3">
                      <strong className="text-sm font-normal">
                        Supervisor:
                      </strong>
                      <span className="text-sm font-semibold">
                        {request.projectDetails?.username}
                      </span>
                    </Card.Title>
                    <Card.Title className="flex justify-center items-center space-x-3">
                      <strong className="text-sm font-normal">
                        Project Title:
                      </strong>
                      <span className="text-sm font-semibold">
                        {request.projectDetails?.title}
                      </span>
                    </Card.Title>
                    <Card.Subtitle className="flex justify-center items-center space-x-2">
                      <span className="text-sm">Group CGPA :</span>
                      <span className="text-sm">
                        {request.groupDetails?.avgCgpa?.toFixed(2)}
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
                        <th key={index} className="text-sm font-semibold">
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {request.groupMembers?.map((item, index) => (
                      <tr key={index} className="cursor-default">
                        <td>{index + 1}</td>
                        <td>{item.st_id}</td>
                        <td>{item.name}</td>
                        <td>{item.technology}</td>
                        <td>{item.cgpa}</td>
                        <td>{item.grade}</td>
                        <td>{item.semester}</td>
                        <td>{item.section}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="flex justify-center items-center space-x-3 mt-0 mb-2">
                  <Button
                    variant="success"
                    onClick={() => handleSubmit(request, 1)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleSubmit(request, 0)}
                  >
                    Reject
                  </Button>
                </div>
              </Card>
            ))}
          </>
        ) : (
          <>
            <span>No Supervising Request Founded</span>
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default SupervisorRequests;
