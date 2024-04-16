import React from "react";
import { FaClock } from "react-icons/fa";

function MeetingDetailCard({ title, desc, startTime, EndTime }) {
  return (
    <>
      <div className="border border-gray-900 flex flex-col rounded-md p-1 mt-2 cursor-pointer">
        <h1 className="text-2xl font-bold">{title || "title"}</h1>
        <p>{desc || "description"}</p>
        <div className="flex flex-row justify-center items-center space-x-0">
          <FaClock className="text-xl mt-1" />
          <span className="text-xl">{startTime || "startTime"}--</span>
          <span className="text-xl">{EndTime || "EndTime"}</span>
        </div>
      </div>
    </>
  );
}

export default MeetingDetailCard;
