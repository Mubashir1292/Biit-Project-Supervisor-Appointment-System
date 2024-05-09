import React from "react";

function NotificationModel({ open, handleOpen }) {
  return (
    <>
      {open && (
        <>
          <div
            className="bg-gray-400 w-full h-96 z-10 top-0  absolute"
            onClick={(curr) => handleOpen(!curr)}
          >
            <div
              className="bg-[#fff] absolute"
              onClick={(curr) => handleOpen(!curr)}
            >
              Notifications
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NotificationModel;
