import React, { useState } from "react";
import { Card, FloatingLabel, Form } from "react-bootstrap";

function FavouriteStudents() {
  const [studentName, setStudentName] = useState("");
  const [studentList, setStudentList] = useState([]);
  const isUser = localStorage.getItem("user");
  const user = JSON.parse(isUser);
  const [selectedStudentsList, setSelectedStudentsList] = useState([]);

  const handleFetchStudents = async (name) => {
    try {
      console.log(name);
      const response = await fetch(
        `http://localhost/officialpsas/api/psas/FetchingStudentsByNameAndAridNumber?data=${name}&teacher_id=${user.uid}`
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setStudentList(result);
      } else {
        alert(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SendStudentToTheList = async (student) => {
    try {
      const response = await fetch(
        `http://localhost/officialpsas/api/psas_supervisor_expert/PostStudentToFavouriteList?regNo=${student.st_id}&teacher_id=${user.uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.text();
      alert(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectStudent = (selectedStudent) => {
    if (
      !selectedStudentsList.some(
        (student) => student.st_id === selectedStudent.st_id
      )
    ) {
      setSelectedStudentsList([...selectedStudentsList, selectedStudent]);
      SendStudentToTheList(selectedStudent);
    }
    console.log(selectedStudentsList);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-[320px]:w-[320px]">
        <div className="flex flex-col">
          <FloatingLabel
            controlId="floatingInput"
            label="Search Student"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Student Name"
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
                handleFetchStudents(e.target.value);
              }}
            />
          </FloatingLabel>
        </div>
        <div className="flex flex-col justify-center items-center">
          {studentList.length > 0 ? (
            <>
              {studentList.map((student, index) => (
                <Card
                  className={`m-2 p-3 flex flex-col justify-center items-center ${
                    student.isFavourite ? "bg-success text-white" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectStudent(student)}
                >
                  <Card.Title className="text-xs">{`${student.st_id} -- ${student.username}`}</Card.Title>
                  <Card.Subtitle>{`${student.semester} -- ${student.section}`}</Card.Subtitle>
                  <Card.Text>{`${student.Grade} -- ${student.cgpa}`}</Card.Text>
                </Card>
              ))}
            </>
          ) : (
            <span>No Student Founded</span>
          )}
        </div>
      </div>
    </>
  );
}

export default FavouriteStudents;
