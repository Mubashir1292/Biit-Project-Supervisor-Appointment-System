import React from "react";
import GroupCreation from "./GroupCreation";
import RequestToStudent from "./RequestingGroupMember.jsx/RequestToStudent";

function MainScreen() {
  return (
    <div className="w-full h-full flex flex-col">
      <GroupCreation />
      {/* <RequestToStudent /> */}
    </div>
  );
}

export default MainScreen;
