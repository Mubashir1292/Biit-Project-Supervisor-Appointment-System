import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function GroupDetailsModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Group Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col>
              <span className="text-sm">Project-Title:</span>
            </Col>
            <Col>
              <span className="text-xs font-bold font-mono">
                {props.group.title}
              </span>
            </Col>
          </Row>
          <div classsName="grid grid-cols-2">
            <Row>
              <Col>
                <span className="text-sm">Project Description:</span>
              </Col>
              <Col>
                <span className="text-xs">{props.group.description}</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="text-sm">Group CGPA:</span>
              </Col>
              <Col>
                <span className="text-xs">{props.group.CGPA}</span>
              </Col>
            </Row>
          </div>
          <div className="flex flex-col mt-2">
            <div className="flex flex-col space-y-3 border border-black p-2 rounded">
              {props.group.groupMembers.map((member, index) => (
                <div className="flex justify-evenly hover:bg-gray-100 cursor-default">
                  <img src={member.image} alt={`${member.name}`} key={index} />
                  <span>{member.id}</span>
                  <span>{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="success">
          Schedule Meeting
        </Button>
        <Button onClick={props.onHide} variant="success">
          Assign New Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
