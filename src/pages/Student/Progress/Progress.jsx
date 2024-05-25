import React, { useState } from "react";
import BiitSAS from "../../../assets/extra/biitSAS.png";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

function Progress() {
  const [allTasks, setAllTasks] = useState([
    {
      id: 1,
      title: "ERD Completion",
      description: "Complete the Entity-Relationship Diagram for the project.",
      status: 1,
      comment: "Well done! The ERD is comprehensive and clear.",
    },
    {
      id: 2,
      title: "API Integration",
      description: "Integrate the API with the frontend.",
      status: 0,
      comment: "Need to work on error handling.",
    },
  ]);

  return (
    <div className="container">
      <div className="text-center mb-4 flex flex-col justify-center items-center">
        <img src={BiitSAS} alt="BiitSAS" className="w-3/12" />
        <h1 className="mt-3">Personal Progress</h1>
      </div>
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between">
          <span>Supervisor: Dr. Hassan</span>
          <span>Project Title: AI Health Engine</span>
        </Card.Header>
        <ListGroup variant="flush">
          {allTasks.map((task) => (
            <ListGroup.Item
              key={task.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="text-md">{task.title}</h5>
                <p className="mb-1 text-xs">{task.description}</p>
                <p className="mb-0">
                  <strong>Comment:</strong> {task.comment}
                </p>
              </div>
              <Badge pill variant={task.status ? "success" : "danger"}>
                {task.status ? "Completed" : "Pending"}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
}

export default Progress;
