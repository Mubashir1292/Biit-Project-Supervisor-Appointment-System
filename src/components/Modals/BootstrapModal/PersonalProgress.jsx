import React from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
function PersonalProgress(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Student Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <div className="flex justify-center items-center"></div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
export default PersonalProgress;
