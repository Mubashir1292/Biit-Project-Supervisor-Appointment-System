import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style.css";
function GroupDetailsModal(props) {
  console.log(props);
  const getPlaceholder = (title) => {
    return title ? title.charAt(0).toUpperCase() : "N/A";
  };

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
              <span className="text-xs font-semibold">
                {props.group.group.project.projectTite}
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="text-sm">Project Description:</span>
            </Col>
            <Col>
              <span className="text-xs truncate-text">
                {props.group.group.project.projectDesc}
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="text-sm">Group CGPA:</span>
            </Col>
            <Col>
              <span className="text-xs">
                {props.group.group.avgCgpa.toFixed(2)}
              </span>
            </Col>
          </Row>
          <div className="flex flex-col mt-2">
            <div className="flex flex-col space-y-3 border border-black p-2 rounded">
              {props.group.groupMembers.map((member, index) => (
                <div
                  className="flex justify-around items-center hover:bg-gray-100 cursor-default space-x-2"
                  key={index}
                >
                  {member.path ? (
                    <img
                      src={`http://localhost/OfficialPSAS/Content/Images/${member.path}`}
                      alt={`${member.name}`}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <span className="text-2xl font-bold">
                      {getPlaceholder(member.name)}
                    </span>
                  )}
                  <span className="text-xs">{member.st_id}</span>
                  <span className="text-xs">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer className="flex flex-col"></Modal.Footer>
    </Modal>
  );
}
export default GroupDetailsModal;
