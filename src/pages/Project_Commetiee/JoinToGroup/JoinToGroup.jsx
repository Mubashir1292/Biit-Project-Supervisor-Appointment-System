import React, { useState } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import man2 from "../../../assets/extra/man2.jpg";
import man from "../../../assets/extra/man.png";
import { Button } from "react-bootstrap";
function JoinToGroup() {
  const [studentDetails, setStudentDetails] = useState({
    regNo: "2020-Arid-3675",
    name: "Mubashir Liaqat",
    Technology: "React-Js",
    Cgpa: 2.9,
    semester: "BSCS8",
    section: "A",
    grade: "B",
    image: man2,
  });
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
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <img src={BiitSAS} alt="BiitSAS" classname="w-2/6" />
          <h2 className="text-md font-normal">Join To Group</h2>
        </div>
        <Card>
          {/* group Image */}
          <div className="flex flex-col justify-center items-center space-x-3">
            <div className="w-full">
              <h4 className="text-lg text-center">Student Details</h4>
              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    {tableHeadings.map((item, index) => (
                      <th key={index} className="text-md font-semibold">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {
                    <tr className="cursor-default">
                      <td></td>
                      <td>
                        <img
                          src={studentDetails.image}
                          alt={`${studentDetails.name}`}
                          className="w-5"
                        />
                      </td>
                      <td>{studentDetails.regNo}</td>
                      <td>{studentDetails.name}</td>
                      <td>{studentDetails.Technology}</td>
                      <td>{studentDetails.Cgpa}</td>
                      <td>{studentDetails.grade}</td>
                      <td>{studentDetails.semester}</td>
                      <td>{studentDetails.section}</td>
                    </tr>
                  }
                </tbody>
              </Table>
            </div>
            <Card.Body>
              <h3 className="text-lg text-center">Group Details</h3>
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
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>#</th>
                {tableHeadings.map((item, index) => (
                  <th key={index} className="text-md font-semibold">
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

export default JoinToGroup;
