import React, { useEffect, useState } from "react";
import {
  CircleDotDashed,
  Group,
  HelpCircle,
  LayoutDashboard,
  UsersRound,
} from "lucide-react";
import sas from "../../assets/extra/sas.png";
import { NavLink } from "react-router-dom";
import { GoProject, GoTasklist } from "react-icons/go";

function OtherSidebar({ expanded, setExpanded }) {
  const [user, setUser] = useState("student");
  const [allLinks, setAllLinks] = useState([
    {
      label: "Dashboard",
      path: "/student/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "group",
      path: "/student/creatingGroup",
      icon: <Group size={20} />,
    },
    {
      label: "Progress",
      path: "/student/progress",
      icon: <CircleDotDashed size={20} />,
    },
    {
      label: "Project Request",
      path: "/student/ProjectRequesting",
      icon: <GoProject size={20} />,
    },
    {
      label: "Help Request",
      path: "/student/HelpRequest",
      icon: <HelpCircle size={20} />,
    },
    {
      label: "Join Group",
      path: "/student/JoiningAGroup",
      icon: <UsersRound size={20} />,
    },
    {
      label: "Task",
      path: "/student/TaskList",
      icon: <GoTasklist size={20} />,
    },
  ]);
  useEffect(() => {
    const isUser = localStorage.getItem("isUser");
    if (isUser !== null) {
      setUser(isUser);
    }
  }, []);
  const links = [
    {
      label: "Dashboard",
      path: "/student/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "My Group",
      path: "/student/creatingGroup",
      icon: <Group size={20} />,
    },
    {
      label: "Project Request",
      path: "/student/ProjectRequesting",
      icon: <GoProject size={20} />,
    },
    {
      label: "Help Request",
      path: "/student/HelpRequest",
      icon: <HelpCircle size={20} />,
    },
    {
      label: "Join Group",
      path: "/student/JoiningAGroup",
      icon: <UsersRound size={20} />,
    },
    {
      label: "Task",
      path: "/student/TaskList",
      icon: <GoTasklist size={20} />,
    },
    // {
    //   label: "Progress",
    //   path: "/student/progress",
    //   icon: <CircleDotDashed size={20} />,
    // },
  ];

  const RenderedLinks = links.map((link, index) => {
    return (
      <NavLink
        key={index}
        to={link.path}
        className={({ isActive }) =>
          `bg-[#37373d] hover:bg-gray-300 w-full p-2 mt-2 rounded-md border text-white hover:text-green-600 hover:shadow-md ${
            !expanded ? "w-full transition-all" : "transition-all"
          } ${
            isActive
              ? "font-bold border-l-4 bg-green-800 border-green-500 pl-2 shadow-lg text-md"
              : ""
          }`
        }
      >
        <div className="flex flex-row space-x-4">
          {expanded ? (
            <span className="mt-1">{link.icon}</span>
          ) : (
            <span className=" mt-1">{link.icon}</span>
          )}
          {expanded ? <span>{link.label}</span> : ""}
        </div>
      </NavLink>
    );
  });
  return (
    <div
      className={`sticky h-screen overflow-y-none items-center bg-[#37373d]  border border-[#37373d] shadow-sm ${
        expanded ? "w-52" : "w-20"
      }`}
    >
      <div className="p-1 pb-2 flex justify-between items-center">
        <img
          src={sas}
          alt="logo"
          className={`overflow-hidden transition-all cursor-pointer bg-green-700 m-3 rounded-xl ${
            expanded ? "w-32" : "w-0"
          }`}
        />
      </div>
      <div
        className={`w-full flex flex-col p-4 ${expanded ? "w-full" : "w-10"}`}
      >
        {RenderedLinks}
      </div>
    </div>
  );
}

export default OtherSidebar;
