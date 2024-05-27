import React, { useState } from "react";
import BiitSAS from "../../../../assets/extra/biitSAS.png";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import man2 from "../../../../assets/extra/man2.jpg";
import man from "../../../../assets/extra/man.png";
import { Button } from "react-bootstrap";
function ReceivedGroupRequest() {
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
    groupName: "Fyp-02",
    groupDesc: "Final Year Project for boys",
    groupCGPA: 2.9,
    message: "Please Join my group",
    projectDescription: "Health Care of the People",
    technology: "React-Js",
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
        <div className="flex flex-col self-center">
          <img src={BiitSAS} alt="BiitSAS" className="w-full" />
          <h3>Received Group Request</h3>
        </div>
        <Card>
          {/* group Image */}
          <div className="w-full flex justify-around items-center">
            <Card className="w-[18rem] bg-gray-400 mt-2">
              <Card.Title className="flex justify-center items-center space-x-2">
                <strong className="text-xs ">Student :</strong>
                <span className="text-xs ">{groupDetail}</span>
              </Card.Title>
              <Card.Title className="flex justify-center items-center space-x-2">
                <strong className="text-xs ">Group-Title:</strong>
                <span className="text-xs ">{groupDetail.groupName}</span>
              </Card.Title>
              <Card.Title className="flex justify-center items-center space-x-2">
                <strong className="text-xs">Description</strong>
                <span className="text-xs">
                  {groupDetail.projectDescription}
                </span>
              </Card.Title>
              <Card.Title className="flex justify-center items-center space-x-2">
                <strong className="text-xs">Message:</strong>
                <span className="text-xs">{groupDetail.message}</span>
              </Card.Title>
              <Card.Title className="flex justify-center items-center space-x-2">
                <strong className="text-xs">Suggested Technology:</strong>
                <span className="text-xs">{groupDetail.technology}</span>
              </Card.Title>
            </Card>
          </div>
          <h3 className="text-center text-xl my-2">Group Details </h3>
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

export default ReceivedGroupRequest;
