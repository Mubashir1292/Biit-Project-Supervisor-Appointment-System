import React, { useEffect, useState } from "react";
function ProfileModel({ open, handleOpen }) {
  const [profileDetails, setProfileDetails] = useState();
  const [isTeacher, setIsTeacher] = useState(false);
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
      {open && (
        <div
          onClick={() => {
            console.log("onClick");
            handleOpen(false);
          }}
          className="fixed top-0 left-0 w-full h-full flex items-start justify-end bg-gray-50 bg-opacity-0"
        >
          <div
            className="bg-white w-2/12 min-h-fit rounded-lg absolute top-[70px] right-10 shadow-lg border border-gray-300 overflow-auto"
            onClick={() => {
              handleOpen(true);
            }}
          >
            <div className="flex flex-col items-center justify-center p-4 border-b border-gray-400">
              <img
                src={`${profileDetails.image}`}
                alt={profileDetails.name}
                className="w-16 h-16 rounded-full mb-2"
              />
              <p className="text-gray-800 font-semibold mb-1">
                {profileDetails.name}
              </p>
              <p className="text-gray-600 text-sm">{profileDetails.id}</p>
            </div>
            {isTeacher && (
              <button className="bg-green-700 text-white p-2 rounded-md text-md font-serif flex self-start m-3">
                Add Account
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileModel;
