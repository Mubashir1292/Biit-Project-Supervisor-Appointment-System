import { CircleUserIcon, Settings } from "lucide-react";
import React, { useState } from "react";
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import man2 from "../../../assets/extra/man2.jpg";

function ProfileModal() {
  const [menu, setMenu] = useState(false);
  const profile = {
    id: "2020-Arid-3675",
    name: "Mubashir Liaqat",
    image: man2,
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
                  <span>ID:</span>
                  <span className="text-sm font-normal">{profile.id}</span>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="mt-2 flex justify-center items-center space-x-4">
              <span>Name:</span>
              <span className="text-sm font-normal">{profile.name}</span>
            </div>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
}

export default ProfileModal;
