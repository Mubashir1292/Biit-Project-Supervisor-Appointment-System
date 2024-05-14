import React from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
function ProfileModal(props) {
  console.log(props);
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Student Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <div className="flex justify-center items-center">
            <img
              src={props.student.image}
              alt={`${props.student.name}`}
              className="w-25"
            />
          </div>
          <div className="flex flex-col justify-center items-center space-y-3">
            <h6>{props.student.id}</h6>
            <h6>{props.student.name}</h6>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
export default ProfileModal;
