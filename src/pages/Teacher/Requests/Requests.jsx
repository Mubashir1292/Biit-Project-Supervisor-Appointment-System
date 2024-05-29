import React, { useState } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import man2 from "../../../assets/extra/man2.jpg";
import man from "../../../assets/extra/man.png";
import { Button } from "react-bootstrap";
function Requests() {
  const [groupDetail, setGroupDetail] = useState({
    groupImage: man2,
    projectTitle: "Ai Health Engine",
    groupCGPA: 2.9,
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
      <div className="flex flex-col xl:w-full lg:w-full justify-center items-center min-[320px]:w-[320px] box-border">
        <div className="flex flex-col justify-center items-center">
          <img
            src={BiitSAS}
            alt="Biit SAS"
            className="max-[320px]:w-3/6 w-5/6"
          />
          <h3 className="text-green-500">Group Request</h3>
        </div>
        <Card className="w-full">
          {/* group Image */}
          <div className="w-2/6 flex self-center rounded-full mt-1">
            <Card.Img src={groupDetail.groupImage} alt={`${groupDetail}`} />
          </div>
          <Card.Body>
            <Card.Title className="text-center text-sm">
              {groupDetail.projectTitle}
            </Card.Title>
            <Card.Text className="text-center text-xs">
              {groupDetail.projectDescription}
            </Card.Text>
            <Card.Subtitle className="flex justify-center items-center space-x-2">
              <span className="text-sm">Group CGPA :</span>
              <span className="text-sm">{groupDetail.groupCGPA}</span>
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
          </Card.Body>
          <div className="flex justify-center items-center space-x-3 mt-0 mb-2">
            <Button variant="success">Accept</Button>
            <Button variant="secondary">Reject</Button>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default Requests;
