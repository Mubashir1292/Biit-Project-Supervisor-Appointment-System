import { BellDot, BellDotIcon, BellIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import "./style.css";
function NotificationModel() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [hoveredType, setHoveredType] = useState(null);

  const [menu, setMenu] = useState(false);
  //const [allNotifications, setAllNotifications] = useState([]);

  //  Fetch all notifications
  // const handleNotifications = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://192.168.1.10/OfficialPSAS/api/PSAS/getAllNotificationsForStudent?regNo=${user.uid}`
  //     );
  //     const result = await response.json();
  //     if (result) {
  //       setAllNotifications(result);
  //     } else {
  //       console.log("No Notifications Founded");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (user) {
      if (user.role === "student") {
        // handleNotifications();
      } else if (user.role === "teacher") {
      } else if (user.role === "Technical Expert") {
      } else if (user.role === "Project Commetiee") {
      }
    } else {
    }
  }, []);
  const renderNotificationItem = (type, item) => {
    switch (type) {
      case "ReceivedgroupsRequests":
        return (
          <div className="notification-item group-request">
            <h6 className="notification-title text-sm">Group Request</h6>
            <span className="notification-meta">
              <strong>From:</strong> {item.sender.username} ({item.sender.uid})
              <br />
              <strong>Technology:</strong> {item.name}
              <br />
            </span>
          </div>
        );
      case "projectApproved":
        return (
          <div className="notification-item bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <h6 className="notification-title text-center text-sm font-normal">
              Project Approved
            </h6>
            <p className="notification-message text-center text-xs">
              {item.title}
              <span className="font-bold">({item.teacher.username})</span>
            </p>
          </div>
        );
      case "NewlyAssignedTasks":
        return (
          <div
            className="flex flex-col justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer mb-1"
            onMouseEnter={() => setHoveredType(type)}
            onMouseLeave={() => setHoveredType(null)}
          >
            <span className="text-sm text-center font-medium">
              New Task Assigned
            </span>
            <span className="text-xs text-center">
              {item.TaskDetails.Title}
            </span>
            <span className="flex justify-between items-center">
              <span className="text-xs font-medium">Due Date:</span>
              <span className="text-xs">
                {new Date(item.TaskDetails.DueDate).toLocaleString()}
              </span>
            </span>
          </div>
        );
      case "UpdatedProgress":
        return (
          <div
            className="flex flex-col justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer mb-1"
            onMouseEnter={() => setHoveredType(type)}
            onMouseLeave={() => setHoveredType(null)}
          >
            <span className="text-sm text-center font-medium">
              Progress Updated
            </span>
            <span className="text-xs text-center">{item.Title}</span>
          </div>
        );
      case "HelpAppointments":
        return (
          <div className="notification-item help-appointment">
            <h6 className="notification-title">Help Appointment</h6>
            <span className="notification-meta">
              <strong>With:</strong> {item.teacher.username}
              <br />
              <strong>Date:</strong>{" "}
              {new Date(item.DateTime.date).toLocaleDateString()}
              <br />
              <strong>Time:</strong> {item.DateTime.start_time} -{" "}
              {item.DateTime.end_time}
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block overflow-auto"
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
          onMouseLeave={() => setMenu(menu)}
          container={"body"}
        >
          <div>
            <Row>
              <Col>
                <h6 className="text-sm text-center">Notifications</h6>
              </Col>
            </Row>
            {/* {allNotifications &&
              Object.keys(allNotifications).map((key) =>
                allNotifications[key].map((item, index) => (
                  <Row key={index}>{renderNotificationItem(key, item)}</Row>
                ))
              )} */}
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
}

export default NotificationModel;
