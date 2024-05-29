import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import man2 from "../../../assets/extra/man2.jpg";
import man from "../../../assets/extra/man.png";
import { Button } from "react-bootstrap";
import BiitSAS from "../../../assets/extra/biitSAS.png";
function SupervisorRequests() {
  const [groupDetail, setGroupDetail] = useState({
    groupImage: man2,
    projectTitle: "Ai Health Engine",
    groupCGPA: 2.9,
    teacher: "Sir Zahid",
    projectDescription: "Health Care of the People",
    groupMembers: [
      {
        regNo: "2020-Arid-3675",
        name: "Mubashir Liaqat",
        Technology: "React-Js",
        Cgpa: 2.9,
        semester: "BSCS8",
        section: "A",
        grade: "B",
        image: man2,
      },
      {
        regNo: "2020-Arid-4224",
        name: "Touseef Sajjad",
        Technology: "Flutter",
        Cgpa: 2.9,
        semester: "BSCS8",
        section: "A",
        grade: "A",
        image: man,
      },
      {
        regNo: "2020-Arid-3677",
        name: "Usama Ijaz",
        Technology: "React-Native",
        Cgpa: 2.9,
        semester: "BSCS8",
        section: "A",
        grade: "B",
        image: man,
      },
    ],
  });
  const [tableHeadings, setTableHeading] = useState([
    "image",
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
        <Card className="max-[320px]:w-[320px]">
          {/* group Image */}
          <div className="flex justify-center items-center">
            <div className="w-1/6">
              <Card.Img src={groupDetail.groupImage} alt={`${groupDetail}`} />
            </div>
            <Card.Body>
              <Card.Title className="flex justify-center item-center space-x-3">
                <strong className="text-sm font-normal">Supervisor:</strong>
                <span className="text-sm font-semibold">
                  {groupDetail.teacher}
                </span>
              </Card.Title>
              <Card.Title className="flex justify-center items-center space-x-3">
                <strong className="text-sm font-normal">Project Title:</strong>
                <span className="text-sm font-semibold">
                  {groupDetail.projectTitle}
                </span>
              </Card.Title>
              <Card.Text className="text-center text-xs">
                {groupDetail.projectDescription}
              </Card.Text>
              <Card.Subtitle className="flex justify-center items-center space-x-2">
                <span className="text-sm">Group CGPA :</span>
                <span className="text-sm">{groupDetail.groupCGPA}</span>
              </Card.Subtitle>
            </Card.Body>
          </div>
          <Table responsive bordered hover className="max-[320px]:w-[320px]">
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
              {groupDetail.groupMembers.map((item, index) => (
                <tr key={index} className="cursor-default">
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={`${item.name}`}
                      className="w-5"
                    />
                  </td>
                  <td>{item.regNo}</td>
                  <td>{item.name}</td>
                  <td>{item.Technology}</td>
                  <td>{item.Cgpa}</td>
                  <td>{item.grade}</td>
                  <td>{item.semester}</td>
                  <td>{item.section}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="flex justify-center items-center space-x-3 mt-0 mb-2">
            <Button variant="success">Accept</Button>
            <Button variant="secondary">Reject</Button>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default SupervisorRequests;
