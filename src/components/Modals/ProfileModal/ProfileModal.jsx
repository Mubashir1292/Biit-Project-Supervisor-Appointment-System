import React, { useEffect, useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
function ProfileModel({ open, handleOpen }) {
  const [profileDetails, setProfileDetails] = useState();
  const [isTeacher, setIsTeacher] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const profileDetail = {
      id: 1,
      name: "Mubashir Liaqat",
      image: "../../../assets/extra/man.png",
    };
    setProfileDetails(profileDetail);
    const userFinding = localStorage.getItem("isUser");
    if (userFinding === "teacher" || userFinding === "TechnicalExpert") {
      setIsTeacher((curr) => !curr);
    }
  }, []);

  return (
    <>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon position-relative p-1 p-sm-2 p-md-3"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className={`bx bx-bell ${1 !== 1 ? "bx-tada" : ""} `} />
          <span className="badge bg-danger rounded-pill">3</span>
        </DropdownToggle>

        <DropdownMenu
          onMouseLeave={() => {
            setMenu(!menu);
          }}
          className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 w-32 h-96"
        >
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0">All Notifications</h6>
              </Col>
            </Row>
          </div>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
export default ProfileModel;
