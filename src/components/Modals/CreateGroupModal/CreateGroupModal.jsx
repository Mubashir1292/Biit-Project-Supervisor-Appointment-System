// import React, { useState } from "react";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// function GroupDetails({ modal, setModal, projectTitle }) {
//   const toggle = () => setModal(!modal);
//   const externalCloseBtn = (
//     <button
//       type="button"
//       className="close"
//       style={{ position: "absolute", top: "15px", right: "15px" }}
//       onClick={toggle}
//     >
//       &times;
//     </button>
//   );
//   return (
//     <div>
//       <Modal isOpen={modal} toggle={toggle} external={externalCloseBtn}>
//         <ModalHeader className="text-green-600 flex justify-center">
//           Project Request
//         </ModalHeader>
//         <ModalBody>
//           <div className="flex flex-row">
//             <label>Project Title:</label>
//             <b>{projectTitle.title}</b>
//           </div>
//           <div className="flex flex-row">
//             <label>Supervisor :</label>
//             <b>{projectTitle.supervisor}</b>
//           </div>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={toggle}>
//             Do Something
//           </Button>{" "}
//           <Button color="secondary" onClick={toggle}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// }

// export default GroupDetails;
