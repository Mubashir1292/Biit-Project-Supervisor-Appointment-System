import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
export default function LogoutModal(props) {
  const handleCancel = () => {
    props.onSubmit(false);
  };
  const handleOk = () => {
    props.onSubmit(true);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you Sure to logout ?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
}
