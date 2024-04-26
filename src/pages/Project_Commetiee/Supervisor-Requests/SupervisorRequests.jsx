import React from "react";
import biitSAS from "../../../assets/extra/biitSAS.png";
function SupervisorRequests() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex  justify-center">
          <img src={biitSAS} alt="Biit Sas Logo" />
        </div>
        <h1 className="text-2xl text-center font-bold text-green-600">
          Supervising Request
        </h1>
      </div>
    </>
  );
}

export default SupervisorRequests;
