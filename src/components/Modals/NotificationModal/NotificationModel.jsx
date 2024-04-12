import React, { useEffect, useState } from "react";

function NotificationModel({ open, handleOpen, ...rest }) {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const notification = {
      title: "Request For Group",
      desc: "Mubashir Liaqat is requesting to create group and suggesting React Native",
    };
    setNotifications([...notifications, notification]);
  }, [setNotifications]);

  return (
    <>
      {open && (
        <div
          {...rest}
          onClick={() => {
            console.log("onClick");
            handleOpen(false);
          }}
          className="w-full drop-shadow-2xl h-96 top-0 flex items-start justify-end bg-gray-500 bg-opacity-0 absolute z-40    "
        >
          <div
            className="bg-white w-2/12 h-3/5 rounded-lg absolute z-50 top-16 right-100 shadow-lg border border-gray-300 overflow-auto "
            onClick={() => {
              handleOpen(true);
            }}
            style={{ zIndex: 100 }} // Adjust the z-index here
          >
            <h2 className="text-md mx-2 text-green-600 sticky">
              Notifications
            </h2>
            {notifications.map((item, index) => {
              return (
                <div
                  key={index}
                  className="p-2 border m-1 rounded border-gray-400 overflow-hidden hover:shadow-2xl shadow-md cursor-pointer"
                >
                  <h3 className="text-gray-800 text-md font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm notification-description">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default NotificationModel;

// import React, { useEffect, useState } from "react";

// function NotificationModel({ open, handleOpen, ...rest }) {
//   const [notifications, setNotifications] = useState([]);
//   useEffect(() => {
//     const notification = {
//       title: "Request For Group",
//       desc: "Mubashir Liaqat is requesting to create group and suggesting React Native",
//     };
//     setNotifications([...notifications, notification]);
//   }, [setNotifications]);

//   return (
//     <>
//       {open && (
//         <div
//           {...rest}
//           onClick={() => {
//             console.log("onClick");
//             handleOpen(false);
//           }}
//           className="fixed w-full drop-shadow-2xl h-full top-0flex items-start justify-end bg-gray-500 bg-opacity-10 inset-14"
//         >
//           <div
//             className="bg-white w-2/12 h-3/5 rounded-lg fixed  z-50  top-16 right-100 shadow-lg border border-gray-300 overflow-auto"
//             onClick={() => {
//               handleOpen(true);
//             }}
//           >
//             <h2 className="text-md mx-2 text-green-600 sticky ">
//               Notifications
//             </h2>
//             {notifications.map((item, index) => {
//               return (
//                 <div
//                   key={index}
//                   className="p-2 border m-1 rounded border-gray-400 overflow-hidden hover:shadow-2xl shadow-md cursor-pointer z-40 "
//                 >
//                   <h3 className="text-gray-800 text-md font-semibold mb-1">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm notification-description">
//                     {item.desc}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default NotificationModel;
