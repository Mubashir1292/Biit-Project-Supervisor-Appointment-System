import { BellDot, BellDotIcon, BellIcon } from "lucide-react";
import React, { useState } from "react";
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";

function NotificationModel() {
  const [menu, setMenu] = useState(false);
  const allRequests = [
    {
      request_type: "Group Request",
      sender_Id: "2020-Arid-3675",
      sender_Name: "Mubashir Liaqat",
      message: "Brother Please Join my group",
    },
    {
      request_type: "Supervisor Message",
      sender_Name: "Sir Zahid",
      message: "Meeting Scheduled",
    },
  ];
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
          {!menu ? (
            <BellDotIcon className="text-white" />
          ) : (
            <BellIcon className="text-white" />
          )}
        </DropdownToggle>
        <DropdownMenu
          className="dropdown-menu dropdown-menu-lg dropdown-menu-end mt-2 px-3 overflow-hidden w-3/12"
          onMouseLeave={() => setMenu(!menu)}
          container={"body"}
        >
          <div>
            <Row>
              <Col>
                <h6 className="text-sm text-center">Notifications</h6>
              </Col>
            </Row>
            {allRequests.map((item, index) => (
              <Row
                key={index}
                className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all mt-2"
              >
                <h6 className="text-lg">{item.request_type}</h6>
                <Col>
                  <h5 className="text-sm">{item.sender_Id}</h5>
                </Col>
                <Col>
                  <h5 className="text-sm">{item.sender_Name}</h5>
                </Col>
                <p className="text-sm text-center">{item.message}</p>
              </Row>
            ))}
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
}

export default NotificationModel;
