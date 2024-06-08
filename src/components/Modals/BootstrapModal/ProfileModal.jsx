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
              src={`http://localhost/OfficialPSAS/Content/Images/${props.student.path}`}
              alt={`${props.student.name}`}
              className="w-28 h-28 rounded-full"
            />
          </div>
          <div className="flex flex-col mt-3 justify-center items-center space-y-2">
            <h6>{props.student.st_id}</h6>
            <h6>{props.student.name}</h6>
            <h6>{props.student.technology}</h6>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
export default ProfileModal;
