import { CircleUserIcon, LogOut, Settings } from "lucide-react";
import React, { useState } from "react";
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import man2 from "../../../assets/extra/man2.jpg";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function ProfileModal() {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const profile = {
    id: `${user.uid}`,
    name: `${user.username}`,
    image: man2,
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleConfirm = () => {
    setShowConfirm(!showConfirm);
  };
  const handleClicked = () => {
    setShowConfirm(!showConfirm);
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        size="lg"
      >
        <DropdownToggle
          className="btn header-item noti-icon position-relative  p-sm-2 p-0"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <CircleUserIcon className="text-white" />
        </DropdownToggle>
        <DropdownMenu
          className="dropdown-menu dropdown-menu-lg dropdown-menu-end mt-2 px-3 overflow-hidden w-3/12"
          onMouseLeave={() => setMenu(!menu)}
          container={"body"}
        >
          <div className="">
            <Row>
              <Col>
                <h6 className="text-sm text-center">Profile Details</h6>
              </Col>
            </Row>
            <Row className="w-32 mx-auto">
              <img
                src={profile.image}
                alt={profile.name}
                className="rounded-xl"
              />
            </Row>
            <div className="mt-2 flex justify-center items-center space-x-4">
              {profile.id.includes("Arid") ? (
                <>
                  <span className="text-sm font-normal">{profile.id}</span>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="mt-2 flex justify-center items-center space-x-4">
              <span className="text-sm font-normal">{profile.name}</span>
            </div>
            <div
              className="bg-blue-600 flex mt-3 justify-around items-center w-2/6 h-10 rounded-lg cursor-pointer hover:bg-blue-700"
              onClick={handleClicked}
            >
              <CiLogout className="text-[#fff]" />
              <span className="text-[#fff]">Logout</span>
            </div>
          </div>
        </DropdownMenu>
      </Dropdown>
      <Modal show={showConfirm} onHide={toggleConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to logout?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleConfirm}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default ProfileModal;
