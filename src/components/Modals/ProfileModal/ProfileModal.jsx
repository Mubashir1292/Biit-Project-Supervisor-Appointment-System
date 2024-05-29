import { CircleUserIcon, FilePenLine, LogOut, Settings } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function ProfileModal() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [menu, setMenu] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

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

  const getFirstLetter = (n) => {
    if (n) {
      return n.charAt(0).toUpperCase();
    } else {
      return "";
    }
  };

  const handleToggleModal = () => {
    setProfileModal(!profileModal);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        size="md"
      >
        <DropdownToggle
          className="btn header-item noti-icon position-relative p-sm-2 p-0"
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
          <div>
            <Row>
              <Col>
                <h6 className="text-sm text-center">Profile Details</h6>
              </Col>
            </Row>
            <Row className="w-32 mx-auto">
              {user && user.image !== null ? (
                <img
                  src={`http://192.168.1.5/OfficialPSAS/Content/Images/${user.image}`}
                  alt={user.name}
                  className="rounded-xl"
                />
              ) : (
                <div className="flex justify-center items-center w-20 h-20 rounded-full bg-green-500">
                  <span className="text-4xl text-[#fff]">
                    {getFirstLetter(user ? user.name : "G")}
                  </span>
                </div>
              )}
            </Row>
            <div className="mt-2 flex flex-col justify-center items-center space-x-4">
              <span className="text-sm font-normal">{user.name}</span>
            </div>
            <div className="flex flex-col justify-between items-center">
              <div
                className="bg-green-500 flex mt-3 justify-around items-center w-full h-10 rounded-lg cursor-pointer hover:bg-green-600 space-x-3"
                onClick={handleClicked}
              >
                <CiLogout className="text-[#fff]" />
                <span className="text-[#fff]">Logout</span>
              </div>
              <div
                className="bg-green-500 flex mt-3 justify-around items-center space-x-2 w-full h-10 rounded-lg cursor-pointer hover:bg-green-600"
                onClick={handleToggleModal}
              >
                <FilePenLine className="text-[#fff]" />
                <span className="text-[#fff] text-sm">Edit Profile</span>
              </div>
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
      <Modal show={profileModal} onHide={handleToggleModal}>
        <Modal.Header closeButton>
          <span className="text-lg text-center">Edit Your Profile</span>
        </Modal.Header>
        <Modal.Body className="flex justify-center items-center flex-col">
          <div
            className="w-32 h-32 bg-gray-200 rounded-full flex justify-center items-center cursor-pointer mb-4"
            onClick={handleImageClick}
          >
            {newImage ? (
              <img
                src={newImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : user && user.image !== null ? (
              <img
                src={`http://192.168.1.5/OfficialPSAS/Content/Images/${user.image}`}
                alt="kamran"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-4xl text-gray-500">
                {getFirstLetter(user ? user.name : "G")}
              </span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            ref={fileInputRef}
          />
          <Button variant="secondary" onClick={handleToggleModal}>
            Cancel
          </Button>
          <Button variant="primary">Update</Button>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default ProfileModal;
